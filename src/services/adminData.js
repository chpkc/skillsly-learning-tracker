
import { supabase } from '../lib/supabase';

export const fetchAdminData = async () => {
  if (!supabase) {
    throw new Error("Supabase client is not configured. Check your environment variables.");
  }

  try {
    // 1. Fetch raw data (Person + Address)
    // Performing a LEFT JOIN using Supabase syntax:
    // We select columns from 'profiles' and nested columns from 'addresses'.
    // This assumes a foreign key relationship exists in Supabase between 'profiles' and 'addresses'.
    // Typically: addresses.user_id references profiles.id
    
    const { data: rawData, error } = await supabase
      .from('profiles')
      .select(`
        id,
        full_name,
        email,
        created_at,
        resource_type, 
        addresses (
          city,
          state
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Flatten data for easier consumption by the UI
    const flattenedData = rawData.map(user => ({
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      created_at: user.created_at,
      // If 'resource_type' is not in DB, it will be undefined, which is fine (better than fake data)
      resource_type: user.resource_type || 'N/A', 
      // Handle the array returned by the join (one-to-many or one-to-one)
      // Assuming one address per user for simplicity in this view
      city: user.addresses?.[0]?.city || null,
      state: user.addresses?.[0]?.state || null,
    }));

    return processData(flattenedData);

  } catch (error) {
    console.error("Error fetching admin data:", error);
    throw error; // Propagate error to the component to show a real error message
  }
};

function processData(data) {
  // 1. KPIs
  const totalUsers = data.length;
  const withAddress = data.filter(d => d.city && d.state).length;
  const completionRate = totalUsers ? Math.round((withAddress / totalUsers) * 100) : 0;
  
  // Active Region
  const stateCounts = data.reduce((acc, curr) => {
    if (curr.state) {
      acc[curr.state] = (acc[curr.state] || 0) + 1;
    }
    return acc;
  }, {});
  const activeRegion = Object.entries(stateCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  // New Records (Last 7 Days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const newRecords = data.filter(d => new Date(d.created_at) > sevenDaysAgo).length;

  // 2. Charts
  // Distribution by City
  const cityDistribution = Object.entries(
    data.reduce((acc, curr) => {
      if (curr.city) acc[curr.city] = (acc[curr.city] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  // Resource Types
  const resourceTypes = Object.entries(
    data.reduce((acc, curr) => {
      const type = curr.resource_type || 'Other';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return {
    kpis: {
      totalUsers,
      completionRate,
      activeRegion,
      newRecords
    },
    charts: {
      cityDistribution,
      resourceTypes
    },
    tableData: data
  };
}

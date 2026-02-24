import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const { user } = useAuth();
  const [resources, setResources] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSkills = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase.from('skills').select('*').eq('user_id', user.id).order('name');
    if (error) console.error("Error fetching skills:", error);
    if (data) setSkills(data);
  }, [user]);

  const fetchResources = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase.from('resources').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
    if (error) console.error("Error fetching resources:", error);
    if (data) setResources(data);
  }, [user]);

  useEffect(() => {
    if (user && supabase) {
      setLoading(true);
      Promise.all([fetchSkills(), fetchResources()]).finally(() => setLoading(false));
    } else {
      setSkills([]);
      setResources([]);
      setLoading(false);
    }
  }, [user, fetchSkills, fetchResources]);

  const addResource = async (resource) => {
    if (!user) return;
    const newResource = { ...resource, user_id: user.id };
    const { data, error } = await supabase.from('resources').insert(newResource).select();
    if (error) {
      console.error("Error adding resource:", error);
      return;
    }
    if (data && data.length > 0) {
        setResources((prev) => [data[0], ...prev]);
    } else {
        // Fallback if data not returned (e.g. RLS policy)
        await fetchResources();
    }
  };

  const updateResource = async (id, updates) => {
    const { data, error } = await supabase.from('resources').update(updates).eq('id', id).select();
    if (error) {
      console.error("Error updating resource:", error);
      return;
    }
    if (data && data.length > 0) {
        setResources(prev => prev.map(r => r.id === id ? data[0] : r));
    } else {
        await fetchResources();
    }
  };

  const deleteResource = async (id) => {
    const { error } = await supabase.from('resources').delete().eq('id', id);
    if (error) {
      console.error("Error deleting resource:", error);
      return;
    }
    setResources(prev => prev.filter(r => r.id !== id));
  };

  const addSkill = async (skill) => {
    if (!user) return;
    const newSkill = { ...skill, user_id: user.id };
    const { data, error } = await supabase.from('skills').insert(newSkill).select();
    if (error) {
      console.error("Error adding skill:", error);
      return;
    }
    if (data && data.length > 0) {
        setSkills((prev) => [...prev, data[0]].sort((a, b) => a.name.localeCompare(b.name)));
    } else {
        await fetchSkills();
    }
  };

  const updateSkill = async (id, updates) => {
    const { data, error } = await supabase.from('skills').update(updates).eq('id', id).select();
    if (error) {
      console.error("Error updating skill:", error);
      return;
    }
    if (data && data.length > 0) {
        setSkills(prev => prev.map(s => s.id === id ? data[0] : s));
    } else {
        await fetchSkills();
    }
  };

  const value = {
    resources,
    skills,
    loading,
    addResource,
    updateResource,
    deleteResource,
    addSkill,
    updateSkill,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);

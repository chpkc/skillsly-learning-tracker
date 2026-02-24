
import React, { useState, useMemo } from 'react';
import { Search, MapPin, Download, ChevronLeft, ChevronRight } from 'lucide-react';

const AdminTable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Extract unique states for filter dropdown
  const states = useMemo(() => {
    const uniqueStates = new Set(data.map(item => item.state).filter(Boolean));
    return Array.from(uniqueStates).sort();
  }, [data]);

  // Filter Logic
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = item.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesState = selectedState ? item.state === selectedState : true;
      return matchesSearch && matchesState;
    });
  }, [data, searchTerm, selectedState]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExportCSV = () => {
    const headers = ["ID", "Full Name", "Email", "City", "State", "Resource Type", "Created At"];
    const csvContent = [
      headers.join(","),
      ...filteredData.map(item => [
        item.id,
        `"${item.full_name}"`,
        item.email,
        item.city || "",
        item.state || "",
        item.resource_type || "",
        item.created_at
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `skillsly_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl overflow-hidden">
      {/* Header Controls */}
      <div className="p-4 border-b border-neutral-800 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex gap-4 w-full sm:w-auto">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-blue-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50 w-full sm:w-64 placeholder-neutral-600"
            />
          </div>
          
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
            <select 
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="pl-10 pr-8 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50 appearance-none cursor-pointer hover:bg-neutral-900"
            >
              <option value="">All States</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>

        <button 
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg text-sm font-medium transition-colors"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-neutral-400">
          <thead className="bg-neutral-950 text-xs uppercase font-semibold text-neutral-500">
            <tr>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Resource Interest</th>
              <th className="px-6 py-3">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-white font-medium group-hover:text-blue-400 transition-colors">{item.full_name}</span>
                      <span className="text-xs text-neutral-500">{item.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {item.city && item.state ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-800 text-xs font-medium text-neutral-300">
                        {item.city}, {item.state}
                      </span>
                    ) : (
                      <span className="text-neutral-600 italic">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${
                      item.resource_type === 'Video' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                      item.resource_type === 'Article' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      item.resource_type === 'Course' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      'bg-neutral-800 text-neutral-400 border-neutral-700'
                    }`}>
                      {item.resource_type || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-neutral-500">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center text-neutral-500">
                  No records found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-neutral-800 flex items-center justify-between">
        <div className="text-xs text-neutral-500">
          Showing <span className="font-medium text-white">{filteredData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to <span className="font-medium text-white">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of <span className="font-medium text-white">{filteredData.length}</span> results
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1 rounded hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-1 rounded hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminTable;

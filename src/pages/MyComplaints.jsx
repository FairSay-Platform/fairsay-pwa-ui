import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import api from "../services/api";
import { COMPLAINT_STATUS, COMPLAINT_STATUS_STYLES, COMPLAINT_STAT_CARDS, PRIORITY_LIST } from "../utils/constants";
import Navbar from "../components/Navbar";


export default function MyComplaints() {

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  //To sync backend status to the colours
  const getStatusStyles = (status) => {
  return COMPLAINT_STATUS_STYLES[status] || COMPLAINT_STATUS_STYLES['pending'];
  };

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await api.get('/complaints/my-complaints');

        if (res.data.success) {
          const formattedComplaints = res.data.complaints.map(c => {
            const styles = getStatusStyles(c.status);
            return {
              id: c.tracking_id, 
              title: c.title,
              description: c.description.substring(0, 100) + "...", 
              status: styles.label,
              statusColor: styles.color,
              borderColor: styles.border,
              category: c.complaint_type || "General",
              categoryColor: "bg-gray-100 text-gray-700",
              
              //For fields the backend doesn't have yet:
              priority: "Standard Priority",
              priorityColor: "border border-gray-300 text-gray-600",
              assignedTo: "Review Team",
              filed: c.created_at ? new Date(c.created_at).toLocaleDateString() : "Just now",
              updated: c.updated_at ? new Date(c.updated_at).toLocaleDateString() : "Just now",
            };
          });
          setComplaints(formattedComplaints);
        }
      } catch (err) {
        console.error("Failed to fetch complaints", err);
        setError("Failed to load your complaints. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  //For the filter logic 
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      //To check search query against title, description, and id
      const matchesSearch = 
        searchQuery === "" || 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase());

      //To check dropdowns
      const matchesStatus = statusFilter === "" || c.status === statusFilter;
      const matchesPriority = priorityFilter === "" || c.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [complaints, searchQuery, statusFilter, priorityFilter]);

  //To calculate dynamic stats for the top cards
 const statValues = {
  total: complaints.length,
  review: complaints.filter(c => c.status === "Under Review").length,
  resolved: complaints.filter(c => c.status === "Resolved").length,
  avgTime: "24h"
 };

 if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F766E]"></div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9]">
      <Navbar />

      <main className="max-w-[98%] mx-auto px-6 py-7">
        {/* Page header */}
        <div className="flex items-start justify-between mb-5 flex-wrap gap-3.5">
          <div>
            <h1 className="text-[27px] font-bold text-gray-900 font-poppins">
              My Complaints
            </h1>
            <p className="text-gray-500 mt-1 text-xs">Track and manage your workplace violation reports</p>
          </div>
          <Link
            to="/file-complaint"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white font-semibold text-xs transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(180deg, #1E3A8A 0%, #0F766E 100%)' }}
          >
            <span className="text-base">+</span> File New Complaint
          </Link>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-5">
          {COMPLAINT_STAT_CARDS.map((stat) => (
            <div key={stat.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className={`w-9 h-9 rounded-lg ${stat.iconBg} flex items-center justify-center mb-2.5`}>
                {stat.icon}
              </div>
              <div className="text-[22px] font-bold text-gray-900 mb-1">{statValues[stat.id]}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-5 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
            {error}
          </div>
        )}

        {/* Search & filters */}
        <div className="flex items-center gap-2.5 mb-5 flex-wrap">
          <div className="relative flex-1 min-w-[180px]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search complaints..."
              className="w-full pl-9 pr-3.5 py-2 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A]"
            />
          </div>

          {/*Status filters*/}
          <select value ={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}  
          className="px-3.5 py-2 border border-gray-200 rounded-lg text-xs bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] min-w-[108px]">
            <option value="">All Status</option>
           {Object.values(COMPLAINT_STATUS).map((status) => ( <option key ={status.id} value={status.label}>
            {status.label}
            </option>
          ))}
          </select>

          {/*Priority filter*/}
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} 
          className="px-3.5 py-2 border border-gray-200 rounded-lg text-xs bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] min-w-[108px]">
            <option value="">All Priority</option>
          {PRIORITY_LIST.map((prior) => (
          <option key={prior.id} value={prior.label}>
            {prior.label}
          </option>  
          ))}
          </select>
          <button className="flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-lg text-xs bg-white text-gray-600 hover:bg-gray-50 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            More Filters
          </button>
        </div>

        {/* Complaints list */}
        <div className="flex flex-col gap-3.5">
          {filteredComplaints.length === 0 && !loading && !error ? (
             <div className="text-center py-10 bg-white rounded-xl border border-gray-100 shadow-sm text-gray-500 text-sm">
               {complaints.length === 0 
                  ? "You haven't filed any complaints yet." 
                  : "No complaints found matching your current filters."}
             </div>
          ) : (
            filteredComplaints.map((complaint) => (
            <div
              key={complaint.id}
              className={`bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 ${complaint.borderColor} p-4`}
            >
              <div className="flex items-start justify-between gap-3.5 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap mb-1">
                    <h3 className="text-sm font-bold text-gray-900">{complaint.title}</h3>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${complaint.statusColor}`}>
                      {complaint.status}
                    </span>
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${complaint.priorityColor}`}>
                      {complaint.priority}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2.5">{complaint.description}</p>
                  <div className="flex items-center gap-3.5 text-[11px] text-gray-400 flex-wrap">
                    <span className="flex items-center gap-1">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {complaint.id}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Filed {complaint.filed}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Updated {complaint.updated}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${complaint.categoryColor}`}>
                    {complaint.category}
                  </span>
                  <span className="text-[11px] text-gray-400">Assigned: {complaint.assignedTo}</span>
                  <button className="text-gray-400 hover:text-[#1E3A8A] transition-colors mt-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )))}
        </div>
      </main>
    </div>
  );
}

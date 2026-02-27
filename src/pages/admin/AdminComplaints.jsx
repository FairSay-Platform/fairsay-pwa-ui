import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { fetchAllComplaintsAdmin, updateComplaintStatusAdmin, getInitials } from "../../utils/logic-helpers";
import { useAppContext } from "../../context/AppContext";

const severityStyles = {
  Critical: "text-red-600 font-semibold",
  High: "text-orange-500 font-semibold",
  Medium: "text-blue-500 font-semibold",
  Low: "text-gray-500 font-semibold",
};

const statusStyles = {
  Open: "bg-blue-100 text-blue-700",
  "Pending Review": "bg-yellow-100 text-yellow-700",
  Resolved: "bg-green-100 text-green-700",
  "In Progress": "text-gray-600 bg-gray-100",
  Closed: "text-gray-500 bg-gray-100",
};

function avatarColor(name) {
  const initial = getInitials(name || "Anonymous").charAt(0);
  const colors = {
    J: "bg-blue-600",
    A: "bg-gray-400",
    S: "bg-green-600",
    M: "bg-purple-600",
    E: "bg-pink-600",
    D: "bg-indigo-600",
    L: "bg-teal-600",
  };
  return colors[initial] ?? "bg-gray-500";
}

export default function AdminComplaints() {
  const { showAlert } = useAppContext();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  useEffect(() => {
    const loadComplaints = async () => {
      setLoading(true);
      const res = await fetchAllComplaintsAdmin();
      if (res.success) setComplaints(res.data);
      setLoading(false);
    };
    loadComplaints();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const res = await updateComplaintStatusAdmin(id, newStatus);
    if (res.success) {
      setComplaints((prev) =>
        prev.map((c) => (c.id === id || c.tracking_id === id ? { ...c, status: newStatus } : c))
      );
      showAlert("Complaint status updated!", "success");
    } else {
      showAlert("Failed to update status", "error");
    }
  };

  const filtered = complaints.filter((c) => {
    const compId = c.id || c.tracking_id || "";
    const name = c.complainant || (c.is_anonymous ? "Anonymous" : "Unknown");
    const type = c.type || c.complaint_type || "";
    const status = c.status || "Open";

    const matchSearch = compId.toLowerCase().includes(search.toLowerCase()) ||
      name.toLowerCase().includes(search.toLowerCase()) ||
      type.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All Statuses" || status === statusFilter;
    
    return matchSearch && matchStatus;
  });

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="font-poppins text-2xl font-bold text-gray-900">Complaint Management</h1>
            <p className="text-gray-500 text-sm mt-0.5">Review and manage submitted workplace violations</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 font-medium hover:border-gray-300 transition-colors">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              Export CSV
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-gray-100">
            <div className="relative flex-1 max-w-sm">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              <input
                type="text"
                placeholder="Search complaints..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#1E3A8A] transition-colors"
              />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-3 pr-9 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-[#1E3A8A] appearance-none cursor-pointer bg-white"
              >
                <option>All Statuses</option>
                <option>Open</option>
                <option>Pending Review</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>
              <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Complaint ID", "Complainant", "Type", "Severity", "Date Filed", "Status"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((c) => {
                  const compId = c.id || c.tracking_id;
                  const name = c.complainant || (c.is_anonymous ? "Anonymous" : "Unknown");
                  const type = c.type || c.complaint_type;
                  const status = c.status || "Open";
                  const dateStr = c.created_at ? new Date(c.created_at).toLocaleDateString() : c.date || "Just now";

                  return (
                    <tr key={compId} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3.5 text-[#1E3A8A] font-medium text-xs whitespace-nowrap">{compId}</td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-full ${avatarColor(name)} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                            {getInitials(name)}
                          </div>
                          <span className="text-gray-800 text-sm">{name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-gray-600 text-sm whitespace-nowrap">{type}</td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className={`text-sm ${severityStyles[c.severity] ?? "text-gray-600"}`}>
                          {c.severity || "Medium"}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-gray-500 text-sm whitespace-nowrap">{dateStr}</td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <select
                          value={status}
                          onChange={(e) => handleStatusChange(compId, e.target.value)}
                          className={`text-xs font-semibold px-2.5 py-1.5 rounded-full border-0 outline-none cursor-pointer focus:ring-2 focus:ring-[#1E3A8A] ${statusStyles[status] || statusStyles['Open']}`}
                        >
                          <option value="Open">Open</option>
                          <option value="Pending Review">Pending Review</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {loading && <p className="p-4 text-center text-gray-500 text-sm">Loading complaints...</p>}
            {!loading && filtered.length === 0 && <p className="p-4 text-center text-gray-500 text-sm">No complaints found.</p>}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
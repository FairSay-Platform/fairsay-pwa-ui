import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";

const complaints = [
  { id: "C-2024-001", complainant: "John Doe", type: "Harassment", severity: "High", date: "2024-02-15", status: "Open" },
  { id: "C-2024-002", complainant: "Anonymous", type: "Safety Violation", severity: "Critical", date: "2024-02-14", status: "Pending Review" },
  { id: "C-2024-003", complainant: "Sarah Smith", type: "Wage Theft", severity: "Medium", date: "2024-02-12", status: "Resolved" },
  { id: "C-2024-004", complainant: "Mike Johnson", type: "Discrimination", severity: "High", date: "2024-02-10", status: "In Progress" },
  { id: "C-2024-005", complainant: "Emily Davis", type: "Unfair Dismissal", severity: "Medium", date: "2024-02-09", status: "Open" },
  { id: "C-2024-006", complainant: "Anonymous", type: "Harassment", severity: "Low", date: "2024-02-08", status: "Closed" },
  { id: "C-2024-007", complainant: "David Wilson", type: "Safety Violation", severity: "High", date: "2024-02-07", status: "Open" },
  { id: "C-2024-008", complainant: "Lisa Brown", type: "Wage Theft", severity: "Medium", date: "2024-02-05", status: "In Progress" },
];

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
  "In Progress": "text-gray-600",
  Closed: "text-gray-500",
};

const statusIsTag = (s) => ["Open", "Pending Review", "Resolved"].includes(s);

function getInitial(name) {
  return name === "Anonymous" ? "A" : name.charAt(0).toUpperCase();
}

function avatarColor(name) {
  const colors = {
    J: "bg-blue-600",
    A: "bg-gray-400",
    S: "bg-green-600",
    M: "bg-purple-600",
    E: "bg-pink-600",
    D: "bg-indigo-600",
    L: "bg-teal-600",
  };
  return colors[getInitial(name)] ?? "bg-gray-500";
}

export default function AdminComplaints() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  const filtered = complaints.filter((c) => {
    const matchSearch = c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.complainant.toLowerCase().includes(search.toLowerCase()) ||
      c.type.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All Statuses" || c.status === statusFilter;
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
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1E3A8A] text-sm text-white font-medium hover:opacity-90 transition-opacity">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Advanced Filters
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
                  {["Complaint ID", "Complainant", "Type", "Severity", "Date Filed", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3.5 text-[#1E3A8A] font-medium text-xs whitespace-nowrap">{c.id}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-full ${avatarColor(c.complainant)} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                          {getInitial(c.complainant)}
                        </div>
                        <span className="text-gray-800 text-sm">{c.complainant}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-gray-600 text-sm whitespace-nowrap">{c.type}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className={`text-sm ${severityStyles[c.severity] ?? "text-gray-600"}`}>
                        {c.severity === "Critical" && (
                          <span className="inline-flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18C1.55 18.43 1.55 18.99 1.82 19.42C2.09 19.85 2.57 20.12 3.09 20.12H20.91C21.43 20.12 21.91 19.85 22.18 19.42C22.45 18.99 22.45 18.43 22.18 18L13.71 3.86C13.43 3.43 12.96 3.16 12.44 3.16C11.92 3.16 11.45 3.43 11.17 3.86H10.29Z" stroke="currentColor" strokeWidth="2"/></svg>
                            Critical
                          </span>
                        )}
                        {c.severity !== "Critical" && c.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-gray-500 text-sm whitespace-nowrap">{c.date}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {statusIsTag(c.status) ? (
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[c.status]}`}>{c.status}</span>
                      ) : (
                        <span className={`text-sm ${statusStyles[c.status]}`}>{c.status}</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="19" r="1" fill="currentColor"/></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-4 py-3.5 border-t border-gray-100">
            <p className="text-xs text-gray-500">Showing {filtered.length} of {complaints.length} complaints</p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Previous</button>
              <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Next</button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

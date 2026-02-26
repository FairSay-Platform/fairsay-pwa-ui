import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";

const users = [
  { name: "John Doe", email: "john@example.com", role: "User", status: "Active", joined: "Jan 15, 2024" },
  { name: "Admin User", email: "admin@fairsay.com", role: "Admin", status: "Active", joined: "Jan 01, 2024" },
  { name: "Sarah Jenkins", email: "sarah.j@company.com", role: "Moderator", status: "Active", joined: "Feb 03, 2024" },
  { name: "Mike Ross", email: "mike.ross@legal.com", role: "User", status: "Suspended", joined: "Feb 10, 2024" },
  { name: "Emily Clark", email: "emily.c@tech.com", role: "User", status: "Active", joined: "Feb 12, 2024" },
];

const roleStyles = {
  Admin: "text-purple-700",
  Moderator: "text-blue-600",
  User: "text-gray-600",
};

function getInitial(name) {
  return name.charAt(0).toUpperCase();
}

const avatarColors = {
  J: "bg-blue-500",
  A: "bg-[#1E3A8A]",
  S: "bg-green-500",
  M: "bg-red-400",
  E: "bg-teal-500",
};

export default function AdminUsers() {
  const [search, setSearch] = useState("");

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="font-poppins text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-500 text-sm mt-0.5">Manage user accounts and access roles</p>
          </div>
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#0F766E] text-white font-medium text-sm hover:opacity-90 transition-opacity shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="8.5" cy="7" r="4" stroke="white" strokeWidth="2"/>
              <line x1="20" y1="8" x2="20" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <line x1="23" y1="11" x2="17" y2="11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add New User
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="relative max-w-sm">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#1E3A8A] transition-colors"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {["User", "Role", "Status", "Joined Date", "Actions"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((u) => {
                  const initial = getInitial(u.name);
                  const avatarBg = avatarColors[initial] ?? "bg-gray-400";
                  return (
                    <tr key={u.email} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full ${avatarBg} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                            {initial}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{u.name}</p>
                            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              {u.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${roleStyles[u.role]}`}>{u.role}</span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        {u.status === "Suspended" ? (
                          <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-semibold">{u.status}</span>
                        ) : (
                          <span className="text-green-600 text-sm font-medium">{u.status}</span>
                        )}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="flex items-center gap-1.5 text-sm text-gray-500">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/><line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5"/></svg>
                          {u.joined}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="19" r="1" fill="currentColor"/></svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

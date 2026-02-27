import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { fetchAllUsersAdmin, updateUserRoleAdmin, verifyUserAdmin, getInitials } from "../../utils/logic-helpers";
import { useAppContext } from "../../context/AppContext";

const roleStyles = {
  admin: "text-purple-700",
  moderator: "text-blue-600",
  user: "text-gray-600",
};

const avatarColors = {
  J: "bg-blue-500",
  A: "bg-[#1E3A8A]",
  S: "bg-green-500",
  M: "bg-red-400",
  E: "bg-teal-500",
};

export default function AdminUsers() {
  const { showAlert } = useAppContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const res = await fetchAllUsersAdmin();
      if (res.success) setUsers(res.data);
      setLoading(false);
    };
    loadUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    const res = await updateUserRoleAdmin(userId, newRole);
    if (res.success) {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
      showAlert("Role updated!", "info");
    }
  };

  const handleVerifyUser = async (userId) => {
    const res = await verifyUserAdmin(userId);
    if (res.success) {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, isVerified: true } : u));
      showAlert("User verified successfully!", "success");
    } else {
      showAlert("Failed to verify user.", "error");
    }
  };

  const filtered = users.filter((u) => {
    const fullName = `${u.first_name || u.firstName || ""} ${u.last_name || u.lastName || ""}`.trim();
    return fullName.toLowerCase().includes(search.toLowerCase()) ||
           (u.email && u.email.toLowerCase().includes(search.toLowerCase()));
  });

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="font-poppins text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-500 text-sm mt-0.5">Manage user accounts and access roles</p>
          </div>
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
                  {["User", "Role", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((u) => {
                  const fullName = `${u.first_name || u.firstName || ""} ${u.last_name || u.lastName || ""}`.trim() || "Unknown User";
                  const initial = getInitials({ firstName: u.first_name || u.firstName, lastName: u.last_name || u.lastName }).charAt(0) || "U";
                  const avatarBg = avatarColors[initial] ?? "bg-gray-400";
                  const currentRole = (u.role || "user").toLowerCase();

                  return (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full ${avatarBg} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                            {initial}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-gray-900 text-sm">{fullName}</p>
                              {u.isVerified && (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" title="Verified Employee">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              )}
                            </div>
                            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                              {u.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <select 
                          value={currentRole} 
                          onChange={(e) => handleRoleChange(u.id, e.target.value)}
                          className={`text-sm font-medium border-0 bg-transparent cursor-pointer focus:ring-0 ${roleStyles[currentRole] || roleStyles['user']} capitalize`}
                        >
                          <option className="text-gray-900" value="user">User</option>
                          <option className="text-gray-900" value="moderator">Moderator</option>
                          <option className="text-gray-900" value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        {u.isVerified ? (
                          <span className="text-green-600 text-sm font-medium">Active (Verified)</span>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-semibold">Pending Verification</span>
                        )}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        {!u.isVerified && (
                          <button 
                            onClick={() => handleVerifyUser(u.id)}
                            className="text-xs font-semibold px-3 py-1.5 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors border border-green-200"
                          >
                            Verify
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {loading && <p className="p-4 text-center text-gray-500 text-sm">Loading users...</p>}
            {!loading && filtered.length === 0 && <p className="p-4 text-center text-gray-500 text-sm">No users found.</p>}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
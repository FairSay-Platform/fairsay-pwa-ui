import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { fetchAllUsersAdmin, updateUserRoleAdmin, verifyUserAdmin, getInitials, rejectUserAdmin } from "../../utils/logic-helpers";
import { useAppContext } from "../../context/AppContext";

const roleStyles = {
  super_admin: "text-red-700 font-bold",
  admin: "text-purple-700 font-semibold",
  investigator: "text-blue-600 font-medium",
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
  const [actionModal, setActionModal] = useState({ isOpen: false, type: "", userId: null });
  const [actionNotes, setActionNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileModal, setProfileModal] = useState({ isOpen: false, selectedUser: null });

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

  const handleVerifyUser = async (userId, notes) => {
    const res = await verifyUserAdmin(userId, notes);
    if (res.success) {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, verification_status: 'approved' } : u));
      showAlert("User verified successfully!", "success");
    } else {
      showAlert("Failed to verify user.", "error");
    }
  };

  const handleRejectUser = async (userId, notes) => {
    const res = await rejectUserAdmin(userId, notes);
    if (res.success) {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, verification_status: 'rejected', proof_url: null } : u));
      showAlert("User verification rejected!", "info");
    } else {
      showAlert(res.message || "Failed to reject user verification.", "error");
    }
  };

  //Action Modal 
  const openActionModal = (type, userId) => {
    setActionModal({ isOpen: true, type, userId });
    setActionNotes("");
  };

  const closeActionModal = () => {
    setActionModal({ isOpen: false, type: "", userId: null });
    setActionNotes("");
  };

  const handleConfirmAction = async () => {
    const { type, userId } = actionModal;
    if (type === "reject" && actionNotes.trim() === "") {
      showAlert("Rejection notes are required.", "error");
      return;
    }

    setIsSubmitting(true);
    if (type === "approve") {
      await handleVerifyUser(userId, actionNotes);
    } else if (type === "reject") {
      await handleRejectUser(userId, actionNotes);
    }
    
    setIsSubmitting(false);
    closeActionModal();
  };

  //Profile Modal 
  const openProfileModal = (user) => {
    setProfileModal({ isOpen: true, selectedUser: user });
  };

  const closeProfileModal = () => {
    setProfileModal({ isOpen: false, selectedUser: null });
  };

  const filtered = users.filter((u) => {
    const fullName = `${u.first_name || u.firstName || ""} ${u.last_name || u.lastName || ""}`.trim();
    return fullName.toLowerCase().includes(search.toLowerCase()) ||
           (u.email && u.email.toLowerCase().includes(search.toLowerCase()));
  });

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 space-y-5 relative">
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
                  const status = u.verification_status || "unverified";

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
                              {status === 'approved' && (
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
                          <option className="text-gray-900" value="investigator">Investigator</option>
                          <option className="text-gray-900" value="admin">Admin</option>
                          <option className="text-gray-900" value="super_admin">Super Admin</option>
                        </select>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        {status === 'approved' ? (
                          <span className="text-green-600 text-sm font-medium">Active (Verified)</span>
                        ) : status === 'pending' ? (
                          <span className="bg-yellow-100 text-yellow-700 px-2 py-2.5 rounded-full text-xs font-semibold">Pending Verification</span>
                        ) : status === 'rejected' ? (
                          <span className="bg-red-100 text-red-700 px-2 py-2.5 rounded-full text-xs font-semibold">Rejected</span>
                        ) : (
                          <span className="text-gray-500 text-sm font-medium">Unverified</span>
                        )}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          
                          {/*  View Profile Details Button */}
                          <button 
                            onClick={() => openProfileModal(u)}
                            className="text-xs font-semibold px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors border border-gray-200 flex items-center gap-1"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            Profile
                          </button>

                          {/* Action Buttons (Only Visible if Pending) */}
                          {status === 'pending' && (
                            <>
                              <button 
                                onClick={() => openActionModal("approve", u.id)}
                                className="text-xs font-semibold px-3 py-1.5 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors border border-green-200"
                              >
                                Approve
                              </button>
                              <button 
                                onClick={() => openActionModal("reject", u.id)}
                                className="text-xs font-semibold px-3 py-1.5 bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors border border-red-200"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </div>
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

      
        {/* PROFILE DETAILS MODAL OVERLAY */}
       
        {profileModal.isOpen && profileModal.selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden transform transition-all">
              
              {/* Header */}
              <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-poppins font-bold text-lg text-[#1E3A8A]">User Profile Details</h3>
                <button onClick={closeProfileModal} className="text-gray-400 hover:text-gray-600">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* Body Content */}
              <div className="p-6 space-y-6">
                
                {/* Basic Info Row */}
                <div className="flex items-center gap-4 border-b border-gray-100 pb-5">
                  <div className={`w-16 h-16 rounded-full ${avatarColors[getInitials({ firstName: profileModal.selectedUser.first_name, lastName: profileModal.selectedUser.last_name }).charAt(0) || 'U'] ?? "bg-gray-400"} flex items-center justify-center text-white text-2xl font-bold shrink-0`}>
                    {getInitials({ firstName: profileModal.selectedUser.first_name, lastName: profileModal.selectedUser.last_name }).charAt(0) || "U"}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 font-poppins">
                      {profileModal.selectedUser.first_name} {profileModal.selectedUser.last_name}
                    </h2>
                    <p className="text-sm text-gray-500">{profileModal.selectedUser.email}</p>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold capitalize">
                      {profileModal.selectedUser.role}
                    </span>
                  </div>
                </div>

                {/* Employment Details Grid */}
                <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Company</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {profileModal.selectedUser.company_name || <span className="text-gray-400 italic">Not provided</span>}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Department</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {profileModal.selectedUser.department || <span className="text-gray-400 italic">Not provided</span>}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Job Title</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {profileModal.selectedUser.job_title || <span className="text-gray-400 italic">Not provided</span>}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {profileModal.selectedUser.phone || <span className="text-gray-400 italic">Not provided</span>}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Location</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {profileModal.selectedUser.location || <span className="text-gray-400 italic">Not provided</span>}
                    </p>
                  </div>
                </div>

                {/* Proof of ID Link */}
                {profileModal.selectedUser.proof_url && (
                  <div className="pt-4 border-t border-gray-100">
                    <a 
                      href={profileModal.selectedUser.proof_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#1E3A8A] hover:underline"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      View Uploaded ID Document
                    </a>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                <button
                  onClick={closeProfileModal}
                  className="px-5 py-2 text-sm font-bold text-white bg-gray-800 rounded-lg hover:bg-gray-900 transition-colors"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

        {/* APPROVE / REJECT ACTION MODAL OVERLAY */}
       
        {actionModal.isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
              
              <div className={`p-4 border-b ${actionModal.type === 'approve' ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                <h3 className={`font-poppins font-bold text-lg ${actionModal.type === 'approve' ? 'text-green-800' : 'text-red-800'}`}>
                  {actionModal.type === 'approve' ? 'Approve Verification' : 'Reject Verification'}
                </h3>
                <p className={`text-xs mt-1 font-inter ${actionModal.type === 'approve' ? 'text-green-600' : 'text-red-600'}`}>
                  {actionModal.type === 'approve' 
                    ? 'Confirm this user has submitted a valid employee ID.' 
                    : 'Please provide a reason so the user knows what to fix.'}
                </p>
              </div>

              <div className="p-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-inter">
                  {actionModal.type === 'approve' ? 'Approval Notes (Optional)' : 'Rejection Reason (Required)'}
                </label>
                <textarea
                  value={actionNotes}
                  onChange={(e) => setActionNotes(e.target.value)}
                  placeholder={actionModal.type === 'approve' ? "Looks good..." : "ID is blurry, please retake..."}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent resize-none h-28"
                />
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                <button
                  onClick={closeActionModal}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAction}
                  disabled={isSubmitting}
                  className={`px-4 py-2 text-sm font-bold text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 ${
                    actionModal.type === 'approve' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {isSubmitting ? "Processing..." : (actionModal.type === 'approve' ? 'Confirm Approval' : 'Confirm Rejection')}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
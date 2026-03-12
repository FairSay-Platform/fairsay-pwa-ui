import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { fetchAllComplaintsAdmin, updateComplaintStatusAdmin, getInitials, submitInvestigationReport } from "../../utils/logic-helpers";
import { useAppContext } from "../../context/AppContext";
import { COMPLAINT_CATEGORIES, PRIORITY_LIST } from "../../utils/constants";


const getCategoryLabel = (backendType) => {
  if (!backendType) return "Unspecified";
  const category = COMPLAINT_CATEGORIES.find(c => c.id === backendType || c.value === backendType);
  return category ? category.label : backendType;
};


const getSeverityInfo = (backendSeverity) => {
  const severityStr = String(backendSeverity || "medium").toLowerCase();
  const priorityObj = PRIORITY_LIST.find(p => p.id === severityStr);
  
  const colors = {
    critical: "text-red-600 font-bold",
    high: "text-orange-500 font-semibold",
    medium: "text-blue-500 font-semibold",
    low: "text-gray-500 font-medium",
  };

  return {
    label: priorityObj ? priorityObj.label : "Medium Priority",
    color: colors[severityStr] || colors.medium
  };
};

const statusStyles = {
  submitted: "bg-blue-100 text-blue-700",
  under_review: "bg-yellow-100 text-yellow-700",
  investigation: "bg-purple-100 text-purple-700",
  resolved: "bg-green-100 text-green-700",
  rejected: "bg-gray-100 text-gray-700",
};

const formatStatus = (status) => {
  if (!status) return "Unknown";
  return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

function avatarColor(name) {
  const initial = getInitials(name || "Anonymous").charAt(0);
  const colors = {
    J: "bg-blue-600", A: "bg-gray-400", S: "bg-green-600",
    M: "bg-purple-600", E: "bg-pink-600", D: "bg-indigo-600", L: "bg-teal-600",
  };
  return colors[initial] ?? "bg-gray-500";
}

export default function AdminComplaints() {
  const { showAlert, user } = useAppContext();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [viewingComplaint, setViewingComplaint] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);

  const allowedTransitions = {
    submitted: ["under_review"],
    under_review: ["investigation"],
    investigation: ["resolved", "rejected"],
    resolved: [],
    rejected: []
  };

  const loadComplaints = async () => {
    setLoading(true);
    const res = await fetchAllComplaintsAdmin();
    if (res.success) setComplaints(res.data);
    setLoading(false);
  };

  useEffect(() => {
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
      showAlert(res.message || "Failed to update status", "error");
    }
  };

  const filtered = complaints.filter((c) => {
    const compId = c.tracking_id || c.id || "";
    const name = c.complainant || (c.is_anonymous ? "Anonymous" : "Unknown");
    const typeLabel = getCategoryLabel(c.violation_type || c.type || c.complaint_type);
    const status = c.status || "Open";

    const matchSearch = compId.toString().toLowerCase().includes(search.toLowerCase()) ||
      name.toLowerCase().includes(search.toLowerCase()) ||
      typeLabel.toLowerCase().includes(search.toLowerCase());
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
                <option value="submitted">Submitted</option>
                <option value="under_review">Under Review</option>
                <option value="investigation">Investigation</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
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
                  
                  const compId = c.tracking_id || c.id;
                  const name = c.complainant || (c.is_anonymous ? "Anonymous" : "Unknown");
                  const typeLabel = getCategoryLabel(c.violation_type || c.type);
                  const severityInfo = getSeverityInfo(c.severity);
                  const status = c.status || "submitted";
                  const dateStr = c.created_at ? new Date(c.created_at).toLocaleDateString() : (c.date || "Just now");
                  const validNextSteps = allowedTransitions[status] || [];

                  return (
                    <tr key={compId} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3.5 text-[#1E3A8A] font-bold text-xs whitespace-nowrap">{compId}</td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-full ${avatarColor(name)} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                            {getInitials(name)}
                          </div>
                          <span className="text-gray-800 text-sm font-medium">{name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-gray-700 text-sm whitespace-nowrap">{typeLabel}</td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className={`text-xs px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100 ${severityInfo.color}`}>
                          {severityInfo.label}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-gray-500 text-sm whitespace-nowrap">{dateStr}</td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button 
                              onClick={() => setViewingComplaint(c)}
                              className="text-xs font-semibold px-3 py-1.5 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors border border-gray-200"
                            >
                              View Details
                            </button>
                          <select
                            value={status}
                            onChange={(e) => handleStatusChange(compId, e.target.value)}
                            disabled={validNextSteps.length === 0 || user?.role !== 'super_admin'} 
                            className={`text-xs font-semibold px-2.5 py-1.5 rounded-full border-0 outline-none cursor-pointer focus:ring-2 focus:ring-[#1E3A8A] ${statusStyles[status] || statusStyles['submitted']} ${validNextSteps.length === 0 ? 'opacity-70 cursor-not-allowed' : ''}`}
                          >
                            <option value={status}>{formatStatus(status)}</option>
                            {validNextSteps.map(nextStatus => (
                              <option key={nextStatus} value={nextStatus}>
                                Move to: {formatStatus(nextStatus)}
                              </option>
                            ))}
                          </select>
                          
                          {status === 'investigation' && (
                            <button 
                              onClick={() => setSelectedCase(c)}
                              className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-100 transition-colors border border-indigo-200"
                            >
                              📝 Add Report
                            </button>
                          )}
                            
                        </div>
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

      <ReportModal 
        complaint={selectedCase} 
        isOpen={!!selectedCase} 
        onClose={() => setSelectedCase(null)} 
        onSuccess={() => {
          setSelectedCase(null);
          loadComplaints(); 
        }}
        showAlert={showAlert}
      />

      <ViewComplaintModal 
        complaint={viewingComplaint}
        isOpen={!!viewingComplaint}
        onClose={() => setViewingComplaint(null)}
      />

    </AdminLayout>
  );
}


// MODALS

//Investigation Report Modal
function ReportModal({ complaint, isOpen, onClose, onSuccess, showAlert }) {
  const [reportText, setReportText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !complaint) return null;

  const handleReportSubmit = async () => {
    if (!reportText.trim()) {
      showAlert("Report cannot be empty", "error");
      return;
    }

    setIsSubmitting(true);
    const res = await submitInvestigationReport(complaint.tracking_id || complaint.id, reportText);
    setIsSubmitting(false);

    if (res.success) {
      showAlert("Report submitted successfully!", "success");
      onSuccess(); 
      setReportText("");
    } else {
      showAlert(res.message || "Failed to submit report", "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900 font-poppins text-lg">Submit Investigation Report</h3>
            <p className="text-xs text-gray-500 mt-0.5">Case #{complaint.tracking_id || complaint.id}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        <div className="p-6">
          <label className="block text-sm font-semibold text-gray-800 mb-2 font-inter">
            Findings & Resolution Notes
          </label>
          <textarea
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
            placeholder="Detail your investigation steps, evidence reviewed, and final conclusions here..."
            className="w-full h-40 border border-gray-200 rounded-xl p-4 text-sm text-gray-700 outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-all resize-none"
          />
        </div>

        <div className="bg-gray-50 border-t border-gray-100 px-6 py-4 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors">Cancel</button>
          <button 
            type="button"
            onClick={handleReportSubmit}
            disabled={isSubmitting}
            className="px-5 py-2 bg-[#1E3A8A] hover:bg-blue-900 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-70"
          >
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ViewComplaintModal({ complaint, isOpen, onClose }) {
  if (!isOpen || !complaint) return null;

  const isAnonymous = complaint.is_anonymous || complaint.keep_confidential === 1;

  // Helper to safely format arrays 
  const safeParse = (data) => {
    if (!data) return [];
    if (typeof data === 'string') {
      try { return JSON.parse(data); } catch (e) { return []; }
    }
    return Array.isArray(data) ? data : [];
  };

  const impactArray = safeParse(complaint.impact_types);
  const accused = complaint.parties && complaint.parties[0] ? complaint.parties[0] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className={`px-6 py-4 flex items-center justify-between border-b ${isAnonymous ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}`}>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className={`font-bold font-poppins text-lg ${isAnonymous ? 'text-red-900' : 'text-gray-900'}`}>
                {isAnonymous ? "Anonymous Whistleblower Report" : "Standard Employee Complaint"}
              </h3>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${isAnonymous ? 'bg-red-200 text-red-800' : 'bg-blue-200 text-blue-800'}`}>
                {complaint.tracking_id || complaint.id}
              </span>
            </div>
            <p className={`text-xs ${isAnonymous ? 'text-red-600' : 'text-gray-500'}`}>
              Submitted on {new Date(complaint.created_at || complaint.date).toLocaleString()}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-colors p-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-8 bg-white">
          
          {/* Main Title & Description */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 font-poppins mb-2">
              {complaint.title || "Untitled Report"}
            </h2>
            <div className="flex gap-2 mb-4">
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-semibold">
                Category: {getCategoryLabel(complaint.violation_type || complaint.type)}
              </span>
              {complaint.is_ongoing && (
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-md text-sm font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span> Ongoing Issue
                </span>
              )}
            </div>
            
            <h4 className="text-sm font-bold text-gray-900 font-inter mb-2 uppercase tracking-wider">Detailed Description</h4>
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-700 whitespace-pre-wrap font-inter leading-relaxed">
                {complaint.description || "No detailed description provided."}
              </p>
            </div>
          </div>

          {/* Incident Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-gray-100 pt-6">
            <div>
              <p className="text-xs text-gray-500 font-inter uppercase tracking-wider mb-1">Location of Incident</p>
              <p className="text-sm font-semibold text-gray-900">{complaint.location || "Not specified"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-inter uppercase tracking-wider mb-1">Date/Time of Incident</p>
              <p className="text-sm font-semibold text-gray-900">
                {complaint.date_of_incident ? new Date(complaint.date_of_incident).toLocaleDateString() : "Not specified"}
                {complaint.time_of_incident ? ` at ${complaint.time_of_incident}` : ""}
              </p>
            </div>
          </div>

          {/* EXTRA DETAILS: Standard Complaints Only */}
          {!isAnonymous && (
            <div className="space-y-8">
              
              {/* COMPLAINANT & IMPACT */}
              <div className="border-t border-gray-100 pt-6">
                <h4 className="text-sm font-bold font-inter uppercase tracking-wider mb-4 text-[#1E3A8A]">1. Complainant Details & Impact</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-blue-50/50 p-5 rounded-xl border border-blue-100">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Complainant Name</p>
                    <p className="text-sm font-semibold text-gray-900">{complaint.complainant || "Unknown"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Reported Impacts</p>
                    {impactArray.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {impactArray.map(impact => (
                          <span key={impact} className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded capitalize">
                            {impact}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm font-medium text-gray-600">None specified</p>
                    )}
                  </div>
                </div>
              </div>

              {/* THE ACCUSED & WITNESSES */}
              <div className="border-t border-gray-100 pt-6">
                <h4 className="text-sm font-bold font-inter uppercase tracking-wider mb-4 text-[#1E3A8A]">2. Parties Involved</h4>
                
                {accused ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Accused Party</p>
                      <p className="text-sm font-semibold text-gray-900">{accused.name || "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Job Title</p>
                      <p className="text-sm font-semibold text-gray-900">{accused.job_title || "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Department</p>
                      <p className="text-sm font-semibold text-gray-900">{accused.department || "Not provided"}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic mb-4">No accused party details provided.</p>
                )}

                {accused?.has_witnesses && accused?.witness_info && (
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                    <p className="text-xs text-amber-800 font-bold uppercase tracking-wider mb-1">Witness Information</p>
                    <p className="text-sm text-amber-900 whitespace-pre-wrap">{accused.witness_info}</p>
                  </div>
                )}
              </div>

              {/* PRIOR REPORTING & OUTCOMES */}
              <div className="border-t border-gray-100 pt-6">
                <h4 className="text-sm font-bold font-inter uppercase tracking-wider mb-4 text-[#1E3A8A]">3. Internal History & Desired Outcome</h4>
                
                {complaint.has_previously_reported ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Previously Reported To</p>
                      <p className="text-sm font-semibold text-gray-900">{complaint.reported_to || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Date Reported</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {complaint.date_reported ? new Date(complaint.date_reported).toLocaleDateString() : "Not specified"}
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-xs text-gray-500 mb-1">Action Taken Internally</p>
                      <p className="text-sm font-medium text-gray-800">{complaint.action_taken || "None reported."}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic mb-4 bg-gray-50 p-4 rounded-xl border border-gray-200">This issue has not been reported internally prior to this complaint.</p>
                )}

                {complaint.desired_outcome && (
                  <div>
                    <p className="text-xs text-gray-500 font-inter uppercase tracking-wider mb-2">Desired Outcome</p>
                    <p className="text-sm text-gray-800 bg-gray-50 p-4 rounded-xl border border-gray-200">
                      {complaint.desired_outcome}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* EVIDENCE SECTION */}
          <div className="border-t border-gray-100 pt-6">
            <h4 className="text-sm font-bold text-gray-900 font-inter uppercase tracking-wider mb-4 flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
              Attached Evidence
            </h4>

            {complaint.evidence && complaint.evidence.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {complaint.evidence.map((file, idx) => (
                  <a 
                    key={idx}
                    href={file.file_url || file.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-[#0F766E] hover:shadow-sm transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-100 transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="12" y1="18" x2="12" y2="12"></line>
                        <line x1="9" y1="15" x2="15" y2="15"></line>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {file.description || `Evidence File ${idx + 1}`}
                      </p>
                      <p className="text-xs text-gray-500 truncate">Click to view document</p>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl p-6 text-center">
                <p className="text-sm text-gray-500">No evidence files were attached to this report.</p>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-100 px-6 py-4 flex justify-end shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 text-sm font-bold rounded-xl transition-colors shadow-sm"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
}
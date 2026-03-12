import api from '../services/api';
import book from '../images/Book.svg';
import report from '../images/Report.svg';
import chatbubble from '../images/Chatbubble.svg';
import danger from '../images/Danger.svg';
import { COMPLAINT_STATUS_STYLES, FILE_UPLOAD_RULES } from './constants';



export const evaluateQuiz = (userAnswers, correctAnswers) => {
  const score = userAnswers.filter((ans, i) => ans === correctAnswers[i]).length;
  const percentage = (score / correctAnswers.length) * 100;
  
  return {
    passed: percentage >= 80,
    score: percentage,
    message: percentage >= 80 ? "Passed" : "Failed"
  };
};

export const validateEscalation = (dateString, hasProof) => {
  if (!dateString) return { isValid: false, daysRemaining: 14 };
    
  const diffInDays = Math.floor((new Date() - new Date(dateString)) / (1000 * 3600 * 24));
  const remaining = 14 - diffInDays;

  return {
    isValid: diffInDays >= 14 && hasProof,
    daysRemaining: remaining > 0 ? remaining : 0
  };
};

export const getStatusProgress = (status) => {
  const style = COMPLAINT_STATUS_STYLES[status];
  
  const progressMap = {
    'pending': 20,
    'in_progress': 60,
    'resolved': 100
  };

  return {
    color: style?.hex || '#CBD5E1', 
    percent: progressMap[status] || 0,
    label: style?.label || status
  };
};


//Added - Initials generator
export const getInitials = (user) => {
  if (!user) return "";
  if (typeof user === 'string') {
    const names = user.trim().split(' ');
    const first = names[0]?.[0] || "";
    const last = names.length > 1 ? names[names.length - 1][0] : "";
    return (first + last).toUpperCase();
  }
  const first = (user.firstName)?.[0] || "";
  const last = (user.lastName)?.[0] || "";
  return (first + last).toUpperCase();
};

//Added - File upload validation
export const validateFileUpload = (file) => {
  if (!file) return { isValid: false, error: 'No file selected' };

  if (!FILE_UPLOAD_RULES.allowedTypes.includes(file.type)) {
    return { 
      isValid: false, 
      error: 'Unsupported format. Please upload a PDF, PNG, or JPEG.' 
    };
  }

  if (file.size > FILE_UPLOAD_RULES.maxSize) {
    const sizeInMB = FILE_UPLOAD_RULES.maxSize / (1024 * 1024);
    return { 
      isValid: false, 
      error: `File size exceeds ${sizeInMB}MB limit. Please compress your document.` 
    };
  }

  return { isValid: true, error: null };
};

export const getActivityIcon = (action = "") => {
  if (action.includes("Complaint") || action.includes("Report")) return <img src={report} alt="Report" className="w-5 h-5" />;
  if (action.includes("Module") || action.includes('Lesson')) return <img src={book} alt="Education" className="w-5 h-5" />;
  if (action.includes('Verification')) return <img src={danger} alt="Warning" className="w-5 h-5" />;
  if (action.includes('AI Consultation')) return <img src={chatbubble} alt="Chat" className="w-5 h-5" />;
  
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" />
    </svg>
  );
};

export const calculateProgress = (user, totalModulesCount) => {
  if (!user?.completedModules) return 0; 
  const completedCount = user.completedModules.length;
  return Math.round((completedCount / totalModulesCount) * 100);
};

export const isModuleCompleted = (user, moduleId) => {
  return user?.completedModules?.includes(moduleId) ? 100 : 0;
};

export const updateLessonProgress = (userId, moduleId, lessonId) => {
  const users = JSON.parse(localStorage.getItem('fs_users') || '[]');
  const index = users.findIndex(u => u.id === userId);

  if (index !== -1) {
    if (!users[index].progress) users[index].progress = {};
    if (!users[index].progress[moduleId]) users[index].progress[moduleId] = [];

    if (!users[index].progress[moduleId].includes(lessonId)) {
      users[index].progress[moduleId].push(lessonId);
    }
    
    localStorage.setItem('fs_users', JSON.stringify(users));
    return users[index];
  }
};

export const completeModuleQuiz = (userId, moduleId, score) => {
  const users = JSON.parse(localStorage.getItem('fs_users') || '[]');
  const index = users.findIndex(u => u.id === userId);

  if (index !== -1 && score >= 80) {
    if (!users[index].completedModules) users[index].completedModules = [];
    if (!users[index].completedModules.includes(moduleId)) {
      users[index].completedModules.push(moduleId);
    }
    
    const required = ['harassment', 'discrimination', 'wage-hour', 'retaliation', 'procedures'];
    users[index].hasCompletedEducation = required.every(m => 
      users[index].completedModules.includes(m)
    );
    
    localStorage.setItem('fs_users', JSON.stringify(users));
    return users[index];
  }
};

export const submitComplaint = async (data) => {
  try {
    const payload = {
      complaint_type: data.type,
      title: data.title, 
      description: data.description,
      is_anonymous: data.isAnonymous || false
    };
    const res = await api.post('/complaints', payload);
    return { success: true, trackingId: res.data.tracking_id };
  } catch (err) {
    console.error("Failed to submit complaint", err);
    return { success: false, message: err.response?.data?.message || "Submission failed" };
  }
};

export const logActivity = (userId, action, details) => {
  const logs = JSON.parse(localStorage.getItem('fs_logs') || '[]');
  const newLog = { userId, action, details, timestamp: new Date().toISOString() };
  localStorage.setItem('fs_logs', JSON.stringify([newLog, ...logs].slice(0, 10)));
};


//Added - Course Progress Tracker

const PROGRESS_KEY = 'fairsay_course_progress';

export const courseOrder = [
  'workplace-harassment',
  'discrimination-laws',
  'complaint-procedures',
  'wage-hour',
  'retaliation-protection',
];

//Added - Get course progress from localStorage

export const getProgress = () => {
  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    
    return {
      'workplace-harassment': { unlocked: true, completed: false, score: 0 }
    };
  } catch (error) {
    console.error('Error reading progress:', error);
    return {
      'workplace-harassment': { unlocked: true, completed: false, score: 0 }
    };
  }
};

//Added - Save course progress to localStorage
export const saveProgress = (progress) => {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

//Added - Check if a course is unlocked
export const isCourseUnlocked = (courseId) => {
  const progress = getProgress();
  return progress[courseId]?.unlocked === true;
};

//Added - Check if a course is completed
export const isCourseCompleted = (courseId) => {
  const progress = getProgress();
  return progress[courseId]?.completed === true;
};

//Added - Reset all progress (for testing/admin purposes)
export const resetProgress = () => {
  const initialProgress = {
    'workplace-harassment': { unlocked: true, completed: false, score: 0 }
  };
  saveProgress(initialProgress);
  return initialProgress;
};

//Added - whistleblower services
export const fetchMyComplaints = async () => {
  try {
    const res = await api.get('/complaints/my-complaints');
    return { success: true, data: res.data.complaints || [] };
  } catch (err) {
    console.error("Failed to fetch user complaints", err);
    return { success: false, data: [] };
  }
};

export const fetchComplaintDetails = async (trackingId) => {
  try {
    const res = await api.get(`/complaints/${trackingId}`);
    return { success: true, data: res.data.complaint };
  } catch (err) {
    console.error("Failed to fetch complaint details", err);
    return { success: false, message: "Could not load complaint details." };
  }
};

export const submitAnonymousWhistleblower = async (formDataPayload) => {
  try {
    const res = await api.post('/complaints/whistleblower-submit', formDataPayload);
    return { success: true, trackingId: res.data.tracking_id };
  } catch (err) {
    console.error("Anonymous submission failed", err);
    return { success: false, message: err.response?.data?.message || "Submission failed" };
  }
};


//Admin Services
export const fetchAdminDashboardStats = async () => {
  try {
    const res = await api.get('/admin/dashboard');
    return { success: true, data: res.data };
  } catch (err) {
    console.error("Failed to fetch admin stats", err);
    return { success: false, data: null };
  }
};

export const fetchAllComplaintsAdmin = async () => {
  try {
    const res = await api.get('/admin/complaints');
    return { success: true, data: res.data.complaints || res.data || [] };
  } catch (err) {
    console.error("Failed to fetch admin complaints", err);
    return { success: true, data: [] };
  }
};

export const getAssignedComplaints = async () => {
  try {
    const res = await api.get('/admin/complaints/assigned');
    return { success: true, data: res.data.complaints || res.data || [] };
  } catch (err) {
    console.error("Failed to fetch assigned complaints", err);
    return { success: false, data: [] };
  }
};

export const updateComplaintStatusAdmin = async (complaintId, newStatus) => {
  try {
    const res = await api.patch(`/admin/complaints/${complaintId}/status`, { newStatus });
    return { success: true, message: res.data.message || "Status updated successfully." };
  } catch (err) {
    console.error("Failed to update complaint status", err);
    return { success: false, message: err.response?.data?.message || "Failed to update status." };
  }
};

export const assignComplaintAdmin = async (complaintId, assignedToId) => {
  try {
    const res = await api.patch(`/admin/complaints/${complaintId}/assign`, { assignedTo: assignedToId });
    return { success: true, message: res.data.message };
  } catch (err) {
    console.error("Failed to assign complaint", err);
    return { success: false, message: err.response?.data?.message || "Failed to assign complaint." };
  }
};

export const submitInvestigationReport = async (complaintId, reportText) => {
  try {
    const res = await api.post(`/admin/complaints/${complaintId}/report`, { report: reportText });
    return { success: true, message: res.data.message };
  } catch (err) {
    console.error("Failed to submit report", err);
    return { success: false, message: err.response?.data?.message || "Failed to submit report." };
  }
};

export const fetchAllUsersAdmin = async () => {
  try {
    const res = await api.get('/admin/users');
    return { success: true, data: res.data.data || [] };
  } catch (err) {
    console.error("Failed to fetch users", err);
    return { success: false,message: err.response?.data?.message || "Failed to fetch users.", data: [] }; 
  }
};

export const updateUserRoleAdmin = async (userId, newRole) => {
  try {
    const res = await api.patch(`/admin/users/${userId}/role`, { role: newRole });
    return { success: true, message: res.data?.message || "User role updated" };
  } catch (err) {
    console.error("Failed to update user role", err);
    return { success: false, message: err.response?.data?.message || "Failed to update role." };
  }
};

export const verifyUserAdmin = async (userId, notes = "") => {
  try {
    const res = await api.put(`verification/admin/verify-user/${userId}/approve`, { notes });
    return { success: true, message: res.data?.message || "User verified successfully." };
  } catch (err) {
    console.error("Failed to verify user", err);
    return { success: false, message: err.response?.data?.message || "Failed to verify user." };
  }
};

export const rejectUserAdmin = async (userId, notes = "") => {
    try {
      await api.put(`/verification/admin/verify-user/${userId}/reject`, { notes });
      
      return { success: true, message: "User verification rejected." };
    } catch (err) {
      console.error("Failed to reject user verification", err);
      return { success: false, message: err.response?.data?.message || "Failed to reject verification." };
    }
  };
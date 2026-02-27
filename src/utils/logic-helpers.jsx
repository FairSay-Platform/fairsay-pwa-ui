import api from '../services/api';
import book from '../images/Book.svg';
import report from '../images/Report.svg';
import chatbubble from '../images/Chatbubble.svg';
import danger from '../images/Danger.svg';
import { COMPLAINT_STATUS_STYLES } from './constants';



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
    color: style?.hex || '#CBD5E1', // Add a hex property to your constants!
    percent: progressMap[status] || 0,
    label: style?.label || status
  };
};

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

//Added - Mark a course as completed and unlock the next one
 
export const completeCourse = (courseId, score, userId) => {
  const progress = getProgress();
  
  // Mark current course as completed
  progress[courseId] = {
    unlocked: true,
    completed: true,
    score: score,
    completedAt: new Date().toISOString()
  };
  
  // Unlock next course if it exists
  const currentIndex = courseOrder.indexOf(courseId);
  if (currentIndex !== -1 && currentIndex < courseOrder.length - 1) {
    const nextCourseId = courseOrder[currentIndex + 1];
    if (!progress[nextCourseId]) {
      progress[nextCourseId] = { unlocked: true, completed: false, score: 0 };
    } else {
      progress[nextCourseId].unlocked = true;
    }
  }
  
  saveProgress(progress);

  if (userId) {
    logActivity(
      userId,
      "Module Completed",
      `You completed ${courseId.replace(/-/g, '')} with a score of ${score}%`
    );
  }
  return progress;
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

// Added -Get the next course in sequence, returns null if last course
export const getNextCourse = (currentCourseId) => {
  const currentIndex = courseOrder.indexOf(currentCourseId);
  if (currentIndex !== -1 && currentIndex < courseOrder.length - 1) {
    return courseOrder[currentIndex + 1];
  }
  return null;
};

//Added - Get progress statistics
export const getProgressStats = () => {
  const progress = getProgress();
  const completed = courseOrder.filter(id => progress[id]?.completed === true).length;
  const unlocked = courseOrder.filter(id => progress[id]?.unlocked === true).length;
  
  return {
    completed,
    unlocked,
    total: courseOrder.length,
    completionPercentage: Math.round((completed / courseOrder.length) * 100)
  };
};

//Added - Reset all progress (for testing/admin purposes)
export const resetProgress = () => {
  const initialProgress = {
    'workplace-harassment': { unlocked: true, completed: false, score: 0 }
  };
  saveProgress(initialProgress);
  return initialProgress;
};

export const getCourseProgress = (courseId) => {
  const progress = getProgress();
  
  //Added - check that the course is fully marked complete in your system, and return 100%
  if (progress[courseId]?.completed) return 100;
  
  // Otherwise, check if they are currently inside a lesson (partial progress)
  try {
    const storedLessons = JSON.parse(localStorage.getItem(`fs_course_${courseId}`) || '[]');
    if (storedLessons.length > 0) {
       // Assuming average of 4 lessons per course, calculate rough percentage
       return Math.min(99, Math.round((storedLessons.length / 4) * 100));
    }
  } catch(e) {}

  return 0;
};


//Admin Services
export const fetchAdminDashboardStats = async () => {
  return { 
    success: true, 
    data: {
      total_complaints: 142,
      complaints_change: 12,
      active_whistleblows: 28,
      new_this_week: 5,
      pending_count: 14,
      high_priority_count: 3
    } 
  };
};

export const fetchAllComplaintsAdmin = async () => {
  try {
    const res = await api.get('/admin/complaints');
    return { success: true, data: res.data.complaints || [] };
  } catch (err) {
    console.error("Failed to fetch admin complaints", err);
    return { success: true, data: [] };
  }
};

export const updateComplaintStatusAdmin = async (complaintId, status) => {
  try {
    const res = await api.put(`/admin/complaints/${complaintId}/status`, { status });
    return { success: true, message: "Status updated successfully." };
  } catch (err) {
    console.error("Failed to update complaint status", err);
    return { success: false, message: "Failed to update status." };
  }
};

export const fetchAllUsersAdmin = async () => {
  try {
    const res = await api.get('/admin/users');
    return { success: true, data: res.data.users || [] };
  } catch (err) {
    console.error("Failed to fetch users", err);
    return { success: true, data: [] }; 
  }
};

export const updateUserRoleAdmin = async (userId, newRole) => {
  return { success: true, message: "User role updated" };
};

export const verifyUserAdmin = async (userId) => {
  try {
    const res = await api.put(`/admin/users/${userId}/verify`);
    return { success: true, message: "User verified successfully." };
  } catch (err) {
    console.error("Failed to verify user", err);
    return { success: false, message: "Failed to verify user." };
  }
};
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCourseProgress } from '../utils/logic-helpers';
import { courses } from '../data/courses';
import Navbar from '../components/Navbar';
import { useAppContext } from '../context/AppContext'; // Imported Context!

function InfoField({ icon, value, editing, name, onChange }) {
  return (
    <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 bg-white dark:bg-dark-bg-tertiary gap-3">
      <div className="text-gray-400 dark:text-gray-500 flex-shrink-0">
        {icon}
      </div>
      {editing ? (
        <input
          name={name}
          defaultValue={value}
          onChange={onChange}
          className="flex-1 text-sm text-gray-800 dark:text-dark-text-primary font-inter outline-none bg-transparent"
        />
      ) : (
        <span className="flex-1 text-sm text-gray-600 dark:text-dark-text-secondary font-inter">
          {value || "Not provided"}
        </span>
      )}
    </div>
  );
}

function ProgressBar({ percent, completed }) {
  return (
    <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ${
          completed ? 'bg-teal-600' : 'bg-[#1E3A8A]'
        }`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

export default function Profile() {
  const { user, updateUser } = useAppContext(); // Grab real user data
  
  // Map real user data, with fallbacks for missing fields
  const [profile, setProfile] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    company: user?.company || "",
    jobTitle: user?.jobTitle || "",
    department: user?.department || "",
    employeeId: user?.employeeId || "",
    joinDate: user?.joinDate || "January 2024",
    bio: user?.bio || ""
  });

  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState(profile);
  const [isSaving, setIsSaving] = useState(false);

  // Sync state if user context loads slightly after component mount
  useEffect(() => {
    if (user) {
      const userData = {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        company: user.company || "",
        jobTitle: user.jobTitle || "",
        department: user.department || "",
        employeeId: user.employeeId || "",
        joinDate: user.joinDate || "January 2024",
        bio: user.bio || ""
      };
      setProfile(userData);
      setEditData(userData);
    }
  }, [user]);

  // Get learning progress from courseProgress utility
  const courseProgress = getCourseProgress();
  const learningProgress = courses.map((course) => {
    const progress = courseProgress[course.id] || {};
    return {
      name: course.title,
      percent: progress?.completed ? 100 : (progress?.unlocked ? 60 : 0),
      completed: progress?.completed || false,
      inProgress: progress?.unlocked && !progress?.completed,
      locked: !progress?.unlocked
    };
  });

  const completedCount = learningProgress.filter(item => item.completed).length;

  function handleEdit() {
    setEditing(true);
    setEditData(profile);
  }

  function handleCancel() {
    setEditing(false);
    setEditData(profile);
  }

  async function handleSave() {
    setIsSaving(true);
    // Call the backend update function from AppContext
    const success = await updateUser(editData);
    if (success) {
      setProfile(editData);
      setEditing(false);
    }
    setIsSaving(false);
  }

  function handleChange(e) {
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg-primary">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-5">
            {/* Avatar card */}
            <div className="bg-white dark:bg-dark-bg-secondary rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white text-2xl font-bold font-poppins">
                  {profile.firstName?.[0]}{profile.lastName?.[0]}
                </div>
              </div>
              <h2 className="font-poppins font-bold text-xl text-gray-900 dark:text-dark-text-primary mb-1">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-gray-500 dark:text-dark-text-tertiary text-sm mb-3">{profile.jobTitle || 'Employee'}</p>
              <div className="flex gap-1 mb-5">
                <div className="h-1 w-8 rounded-full bg-teal-600" />
                <div className="h-1 w-8 rounded-full bg-blue-300" />
              </div>

              <div className="w-full space-y-3 text-sm text-gray-600 dark:text-dark-text-secondary border-t border-gray-100 dark:border-gray-700 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 dark:text-gray-500">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    <span>Complaints Filed</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-dark-text-primary">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 dark:text-gray-500">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span>Modules Completed</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-dark-text-primary">{completedCount}/{courses.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 dark:text-gray-500">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <span>Member Since</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-dark-text-primary">{profile.joinDate}</span>
                </div>
              </div>

              <div className="w-full mt-5 space-y-3">
                <Link
                  to="/profile/settings"
                  className="flex items-center justify-center gap-2 w-full border border-[#1E3A8A] dark:border-blue-500 text-[#1E3A8A] dark:text-blue-400 font-semibold text-sm py-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  Profile settings
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
                </Link>
                <Link
                  to="/my-complaints"
                  className="flex items-center justify-center gap-2 w-full border border-[#1E3A8A] dark:border-blue-500 text-[#1E3A8A] dark:text-blue-400 font-semibold text-sm py-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  View my complaints
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Recent Activity card */}
            <div className="bg-white dark:bg-dark-bg-secondary rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="font-poppins font-bold text-base text-gray-900 dark:text-dark-text-primary mb-4">Recent Activity</h3>
              <ul className="space-y-4">
                {completedCount > 0 && (
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-dark-text-primary">Completed module</p>
                      <p className="text-xs text-gray-400 dark:text-dark-text-tertiary">Recently</p>
                    </div>
                  </li>
                )}
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-dark-text-primary">Viewed resources</p>
                    <p className="text-xs text-gray-400 dark:text-dark-text-tertiary">Today</p>
                  </div>
                </li>
              </ul>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 space-y-5">
            {/* Personal Information */}
            <section className="bg-white dark:bg-dark-bg-secondary rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-poppins font-bold text-xl text-gray-900 dark:text-dark-text-primary">Personal Information</h2>
                {!editing ? (
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-dark-text-secondary text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Edit
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleCancel}
                      disabled={isSaving}
                      className="flex items-center gap-1.5 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-dark-text-secondary text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                    >
                      Cancel
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex items-center gap-2 bg-[#1E3A8A] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors disabled:opacity-70"
                    >
                      {isSaving ? "Saving..." : "Save changes"}
                      {!isSaving && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                          <polyline points="17 21 17 13 7 13 7 21"/>
                          <polyline points="7 3 7 8 15 8"/>
                        </svg>
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 dark:text-dark-text-tertiary mb-2 font-inter">First Name</label>
                  <InfoField
                    icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
                    value={editing ? editData.firstName : profile.firstName}
                    editing={editing}
                    name="firstName"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-dark-text-tertiary mb-2 font-inter">Last Name</label>
                  <InfoField
                    icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
                    value={editing ? editData.lastName : profile.lastName}
                    editing={editing}
                    name="lastName"
                    onChange={handleChange}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-gray-500 dark:text-dark-text-tertiary mb-2 font-inter">Email</label>
                  <InfoField
                    icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
                    value={editing ? editData.email : profile.email}
                    editing={editing}
                    name="email"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-dark-text-tertiary mb-2 font-inter">Phone</label>
                  <InfoField
                    icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>}
                    value={editing ? editData.phone : profile.phone}
                    editing={editing}
                    name="phone"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-dark-text-tertiary mb-2 font-inter">Location</label>
                  <InfoField
                    icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}
                    value={editing ? editData.location : profile.location}
                    editing={editing}
                    name="location"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>

            {/* Employment Information */}
            <section className="bg-white dark:bg-dark-bg-secondary rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="font-poppins font-bold text-xl text-gray-900 dark:text-dark-text-primary mb-6">Employment Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 dark:text-dark-text-tertiary mb-2 font-inter">Company</label>
                  <InfoField
                    icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>}
                    value={editing ? editData.company : profile.company}
                    editing={editing}
                    name="company"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-dark-text-tertiary mb-2 font-inter">Job Title</label>
                  <InfoField
                    icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>}
                    value={editing ? editData.jobTitle : profile.jobTitle}
                    editing={editing}
                    name="jobTitle"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-dark-text-tertiary mb-2 font-inter">Department</label>
                  <InfoField
                    icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>}
                    value={editing ? editData.department : profile.department}
                    editing={editing}
                    name="department"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-dark-text-tertiary mb-2 font-inter">Employee ID</label>
                  <InfoField
                    icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>}
                    value={editing ? editData.employeeId : profile.employeeId}
                    editing={editing}
                    name="employeeId"
                    onChange={handleChange}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-gray-500 dark:text-dark-text-tertiary mb-2 font-inter">Join Date</label>
                  <InfoField
                    icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}
                    value={editing ? editData.joinDate : profile.joinDate}
                    editing={editing}
                    name="joinDate"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>

            {/* Bio */}
            <section className="bg-white dark:bg-dark-bg-secondary rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="font-poppins font-bold text-xl text-gray-900 dark:text-dark-text-primary mb-4">Bio</h2>
              {editing ? (
                <textarea
                  name="bio"
                  defaultValue={editData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-600 dark:text-dark-text-secondary dark:bg-dark-bg-tertiary font-inter outline-none resize-none focus:border-blue-400 transition-colors"
                />
              ) : (
                <p className="text-gray-600 dark:text-dark-text-secondary text-sm font-inter leading-relaxed">
                  {profile.bio || "No bio provided yet."}
                </p>
              )}
            </section>

            {/* Learning Progress */}
            <section className="bg-white dark:bg-dark-bg-secondary rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="font-poppins font-bold text-xl text-gray-900 dark:text-dark-text-primary mb-6">Learning Progress</h2>
              <div className="space-y-4">
                {learningProgress.map((item) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {item.completed ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                          </svg>
                        ) : item.inProgress ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                          </svg>
                        )}
                        <span className={`text-sm font-inter ${item.locked ? "text-gray-400 dark:text-gray-500" : "text-gray-700 dark:text-dark-text-secondary"}`}>{item.name}</span>
                      </div>
                      <span className={`text-sm font-semibold font-inter ${item.completed ? "text-teal-600" : item.inProgress ? "text-[#1E3A8A]" : "text-gray-400 dark:text-gray-500"}`}>{item.percent}%</span>
                    </div>
                    <ProgressBar percent={item.percent} completed={item.completed} />
                  </div>
                ))}
              </div>
              <Link
                to="/learning"
                className="mt-6 flex items-center justify-center w-full bg-[#1E3A8A] text-white font-semibold py-3.5 rounded-xl hover:bg-blue-900 transition-colors"
              >
                Continue Learning
              </Link>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
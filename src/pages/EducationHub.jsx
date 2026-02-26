import { Link } from "react-router-dom";
import { courses } from "../data/courses";
import { useAppContext } from "../context/AppContext";
import { isCourseUnlocked, getCourseProgress } from "../utils/logic-helpers";
import Navbar from "../components/Navbar";

export default function EducationHub() {
  const { user, logout } = useAppContext();

  // Dynamically calculate progress based on our local storage tracker!
  const enrichedCourses = courses.map((course) => {
    const progress = getCourseProgress(course.id);
    return {
      ...course,
      actualProgress: progress,
      isUnlocked: isCourseUnlocked(course.id),
    };
  });

  const completedCourses = enrichedCourses.filter((c) => c.actualProgress === 100).length;
  const inProgressCourses = enrichedCourses.filter((c) => c.actualProgress > 0 && c.actualProgress < 100).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />

      <main className="max-w-[95%] mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] rounded-2xl shadow-sm p-6 lg:p-8 mb-6 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome to the Rights Education Hub
              </h1>
              <p className="text-blue-100 text-base">
                Learn about your workplace rights and empower yourself with knowledge
              </p>
            </div>
            
            {/* Stats */}
            <div className="flex gap-3">
              <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-xl text-center min-w-[90px]">
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-xs text-blue-100 font-medium">Courses</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-xl text-center min-w-[90px]">
                <div className="text-2xl font-bold">{stats.completed}</div>
                <div className="text-xs text-blue-100 font-medium">Completed</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-xl text-center min-w-[90px]">
                <div className="text-2xl font-bold">{stats.unlocked}</div>
                <div className="text-xs text-blue-100 font-medium">Unlocked</div>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">Available Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {enrichedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-5">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* AI Assistant */}
            <Link
              to="/ai-assistant"
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1E3A8A] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    <circle cx="12" cy="16" r="1" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-[#1E3A8A] transition-colors">
                    AI Rights Assistant
                  </h3>
                  <p className="text-sm text-gray-600">
                    Get instant answers to your workplace rights questions
                  </p>
                </div>
                <svg 
                  className="w-5 h-5 text-gray-400 group-hover:text-[#1E3A8A] group-hover:translate-x-1 transition-all flex-shrink-0" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </Link>

            {/* Whistleblowing */}
            <Link
              to="/whistleblowing"
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#DC2626] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-[#DC2626] transition-colors">
                    Anonymous Reporting
                  </h3>
                  <p className="text-sm text-gray-600">
                    Report workplace violations anonymously with encryption
                  </p>
                </div>
                <svg 
                  className="w-5 h-5 text-gray-400 group-hover:text-[#DC2626] group-hover:translate-x-1 transition-all flex-shrink-0" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function CourseCard({ course }) {
  // Use the actual progress dynamically!
  const progressPercent = course.actualProgress;
  const lessonsCompleted = Math.round((progressPercent / 100) * course.lessons.length);
  
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all ${!course.isUnlocked ? 'opacity-70 grayscale-[0.3]' : ''}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: course.isUnlocked ? course.color : '#9CA3AF' }}
          >
            <CourseIcon icon={course.icon} />
            {!isUnlocked && (
              <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
              {isCompleted && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-gray-500 font-medium">Progress</span>
            <span className="font-bold" style={{ color: course.isUnlocked ? course.color : '#9CA3AF' }}>{progressPercent}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-[#0F766E]"
              style={{ width: `${module.progress}%` }}
            />
          </div>
        </div>

        {/* Meta info and button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            {course.lessons.length} lessons
            <span>•</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {course.lessons.reduce((acc, l) => acc + parseInt(l.duration), 0)} min total
          </div>

          {/* DYNAMIC LOCK / UNLOCK LOGIC */}
          {course.isUnlocked ? (
            <Link
              to={`/learning/lesson/${course.id}/1`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: course.color }}
            >
              {progressPercent > 0 ? (progressPercent === 100 ? "Review" : "Continue") : "Start"}
              {progressPercent === 100 ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              )}
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-gray-100 text-gray-500 cursor-not-allowed">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Locked
            </span>
          )}
        </div>
      </div>

      {/* Lesson list preview */}
      <div className="border-t border-gray-50 px-6 py-3">
        <div className="flex flex-wrap gap-1.5">
          {course.lessons.map((lesson, idx) => {
            const isCompleted = idx < lessonsCompleted;
            return (
              <div
                key={lesson.id}
                className="flex items-center gap-1 text-xs font-medium"
                style={{ color: isCompleted ? course.color : "#9CA3AF" }}
              >
                {isCompleted ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                )}
                <span>L{idx + 1}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CourseIcon({ icon }) {
  switch (icon) {
    case "dollar":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );
    case "shield":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "balance":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="3" x2="12" y2="21" />
          <path d="m8 9-4 6h8l-4-6z" />
          <path d="M16 15h8l-4-6z" />
        </svg>
      );
    case "document":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
    case "heart":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
    default:
      return null;
  }
}

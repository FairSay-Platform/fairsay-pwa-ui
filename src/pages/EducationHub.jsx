import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import { courses } from "../data/courses";

export default function EducationHub() {
  const completedCourses = courses.filter((c) => c.progress === 100).length;
   const inProgressCourses = courses.filter(
     (c) => c.progress > 0 && c.progress < 100
   ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-[95%] mx-auto flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            {/* Home */}
            <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Go to Dashboard">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4A5565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </Link>

            {/* Notification */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="#4A5565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="#4A5565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center font-semibold">
                JD
              </div>
              <div className="hidden md:block">
                <div className="font-semibold text-sm text-[#333]">John Divine</div>
                <div className="text-xs text-[#9CA3AF]">Software Engineer</div>
              </div>
            </div>

            {/* Logout */}
            <Link to="/sign-in" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5" stroke="#4A5565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.3333 14.1667L17.5 10L13.3333 5.83334" stroke="#4A5565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17.5 10H7.5" stroke="#4A5565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

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
                <div className="text-2xl font-bold">{courses.length}</div>
                <div className="text-xs text-blue-100 font-medium">Courses</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-xl text-center min-w-[90px]">
                <div className="text-2xl font-bold">{completedCourses}</div>
                <div className="text-xs text-blue-100 font-medium">Completed</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-xl text-center min-w-[90px]">
                <div className="text-2xl font-bold">{inProgressCourses}</div>
                <div className="text-xs text-blue-100 font-medium">In Progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">Available Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {courses.map((course) => (
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
  const lessonsCompleted = Math.round((course.progress / 100) * course.lessons.length);
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: course.color }}
          >
            <CourseIcon icon={course.icon} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{course.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{course.description}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-gray-500 font-medium">Progress</span>
            <span className="font-bold" style={{ color: course.color }}>{course.progress}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{ 
                width: `${course.progress}%`,
                backgroundColor: course.color 
              }}
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
            {course.lessons.reduce((acc, l) => {
              const mins = parseInt(l.duration);
              return acc + mins;
            }, 0)} min total
          </div>

          {course.id === "wage-hour" ? (
            <Link
              to={`/learning/lesson/${course.id}/1`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: course.color }}
            >
              {course.progress > 0 ? "Continue" : "Start"}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-gray-100 text-gray-400 cursor-not-allowed">
              Coming Soon
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
                className="flex items-center gap-1 text-xs"
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
                <span>L{lesson.id}</span>
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

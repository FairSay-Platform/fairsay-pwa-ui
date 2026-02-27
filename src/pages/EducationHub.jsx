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
        <div className="bg-gradient-to-b from-blue-900 to-[#0D5F5A] via-[#28637ff5] rounded-2xl shadow-sm p-6 lg:p-8 mb-6 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1 p-5">
              <div className="items-center gap-3 mb-2">
                <div className="flex items-center gap-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              <h1 className="text-3xl font-bold mb-2 font-poppins">
                Rights Education Hub
              </h1>
              </div>
              <p className="text-blue-100 text-base mb-6 font-inter leading-relaxed">
                Learn about your workplace rights through interactive modules
              </p>
              <div className="flex items-center gap-10">
                <div>
                  <p className="text-white text-2xl sm:text-3xl font-bold font-poppins leading-none">
                    {completedCourses}/{totalRequired}
                  </p>
                  <p className="text-blue-200 text-xs mt-1 font-inter">Required Modules Completed</p>
                </div>
                <div>
                  <p className="text-white text-2xl sm:text-3xl font-bold font-poppins leading-none">
                    {overallProgress}%
                  </p>
                  <p className="text-blue-200 text-xs mt-1 font-inter">Overall Progress</p>
                </div>
              </div>
            </div>
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
              <p className="text-blue-200 text-xs font-inter">{remaining} modules remaining</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Why Education is Required */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-[#1E3A8A] flex gap-4">
            <div className="shrink-0 mt-0.5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 2V8H20" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 13H8" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 17H8" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm mb-1 font-poppins">Why Education is Required</p>
              <p className="text-gray-500 text-sm leading-relaxed font-inter">
                Understanding your workplace rights is essential for effective complaint filing. These modules ensure you can identify violations, document incidents properly, and navigate the complaint process successfully. This education also strengthens your legal position should disputes arise.
              </p>
            </div>
          </div>

          {/* Additional Learning */}
          <section>
            <div className="mb-4">
              <h2 className="font-poppins text-xl font-bold text-gray-800">Additional Learning</h2>
              <p className="text-gray-500 text-sm mt-0.5 font-inter">Expand your knowledge with optional modules</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {optionalModules.map((mod) => (
                <div key={mod.id} className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm font-poppins">{mod.title}</p>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span className="font-inter">{mod.duration}</span>
                        <span>·</span>
                        <span className="font-inter">{mod.lessons} lessons</span>
                        <span>·</span>
                        <span className="text-[#0F766E] font-semibold font-inter">Available</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed font-inter">{mod.description}</p>
                  <Link
                    to={`/learning/lesson/${mod.id}/1`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#1E3A8A] text-white text-sm font-semibold hover:opacity-90 transition-opacity mt-auto font-inter"
                  >
                    Start Module
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Courses Grid */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-5 font-poppins">Required Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {enrichedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-5 font-poppins">Quick Actions</h2>
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
                    <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-[#1E3A8A] transition-colors font-poppins">
                      AI Rights Assistant
                    </h3>
                    <p className="text-sm text-gray-600 font-inter">
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
                    <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-[#DC2626] transition-colors font-poppins">
                      Anonymous Reporting
                    </h3>
                    <p className="text-sm text-gray-600 font-inter">
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
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="h-full rounded-full bg-[#0F766E]"
              style={{ width: `${module.progress}%` }}
            />
          </div>
        </div>

        {/* Meta info and button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-inter">
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
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-gray-100 text-gray-500 cursor-not-allowed font-inter">
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
                className="flex items-center gap-1 text-xs font-medium font-inter"
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
    default:
      return null;
  }
}
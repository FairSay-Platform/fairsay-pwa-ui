import { useParams, useNavigate, Link } from "react-router-dom";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";
import { 
  courses,
  workplaceHarassmentLessons,
  discriminationLawsLessons,
  complaintProceduresLessons,
  wageHourLessons,
  retaliationProtectionLessons
} from "../data/courses";
import { useAppContext } from "../context/AppContext";
import { logActivity, isCourseUnlocked } from "../utils/logic-helpers";
import { useState, useEffect } from "react";

// Helper to grab the correct detailed lesson content based on the URL parameter
const getDetailedLessons = (id) => {
  switch (id) {
    case "workplace-harassment": return workplaceHarassmentLessons;
    case "discrimination-laws": return discriminationLawsLessons;
    case "complaint-procedures": return complaintProceduresLessons;
    case "wage-hour": return wageHourLessons;
    case "retaliation-protection": return retaliationProtectionLessons;
    default: return workplaceHarassmentLessons;
  }
};

export default function Lesson() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAppContext();
  
  const currentId = parseInt(lessonId || "1");
  const courseId_ = courseId || "workplace-harassment";
  
  // Check if course is unlocked
  useEffect(() => {
    if (!isCourseUnlocked(courseId_)) {
      // Redirect to education hub if trying to access locked course
      navigate("/learning");
    }
  }, [courseId_, navigate]);
  
  // Dynamically load the course summary and the detailed lessons
  const course = courses.find(c => c.id === courseId_);
  const lessons = getDetailedLessons(courseId_);
  const courseTitle = course?.title || "Course";
  const lesson = lessons.find((l) => l.id === currentId);

  // Track completed lessons dynamically for this specific course
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(`fs_course_${courseId_}`) || '[]');
    setCompletedLessons(stored);
  }, [courseId_, currentId]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <header className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50">
          <div className="max-w-[95%] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Logo />
              <Link
                to="/learning"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Back to Education Hub
              </Link>
            </div>
          </div>
        </header>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Lesson not found.</p>
        </div>
      </div>
    );
  }

  // Calculate real progress dynamically based on current module's length!
  const progress = Math.round((completedLessons.length / lessons.length) * 100);
  const isCurrentLessonCompleted = completedLessons.includes(lesson.id);

  const handlePrev = () => {
    if (currentId > 1)
      navigate(`/learning/lesson/${courseId}/${currentId - 1}`);
    if (currentId > 1)
      navigate(`/learning/lesson/${courseId}/${currentId - 1}`);
  };

  const handleNext = () => {
    // 1. Mark this lesson as complete in local storage
    const stored = JSON.parse(localStorage.getItem(`fs_course_${courseId_}`) || '[]');
    if (!stored.includes(currentId)) {
      const updatedLessons = [...stored, currentId];
      localStorage.setItem(`fs_course_${courseId_}`, JSON.stringify(updatedLessons));
      setCompletedLessons(updatedLessons);
      
      // 2. Log this action so it appears on the Dashboard timeline!
      if (typeof logActivity === 'function' && user?.id) {
        logActivity(user.id, 'Lesson Completed', `Finished: ${lesson.title}`);
      }
    }

    // 3. Navigate forward based on dynamic length
    if (currentId < lessons.length) {
      navigate(`/learning/lesson/${courseId_}/${currentId + 1}`);
    } else {
      navigate(`/learning/quiz/${courseId_}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-[95%] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo />
            <Link
              to="/learning"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Education Hub
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {/* Home */}
            <Link
              to="/dashboard"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Go to Dashboard"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4A5565"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </Link>

            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                  stroke="#4A5565"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                  stroke="#4A5565"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center font-semibold uppercase">
                {user?.firstName?.charAt(0) || "J"}{user?.lastName?.charAt(0) || "D"}
              </div>
              <div className="hidden md:block">
                <div className="font-semibold text-sm text-[#333]">{user?.firstName || "John"} {user?.lastName || "Doe"}</div>
                <div className="text-xs text-[#9CA3AF]">Employee</div>
              </div>
            </div>
            <button onClick={logout} className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5"
                  stroke="#4A5565"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.3333 14.1667L17.5 10L13.3333 5.83334"
                  stroke="#4A5565"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.5 10H7.5"
                  stroke="#4A5565"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[95%] mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full lg:w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-24">
              <h2 className="font-bold text-gray-900 text-base mb-4">
                Wage & Hour Rights
              </h2>
              <nav className="space-y-2">
                {lessons.map((l) => {
                  const isCompleted = completedLessons.includes(l.id);
                  return (
                    <Link
                      key={l.id}
                      to={`/learning/lesson/${courseId_}/${l.id}`}
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl transition-all text-sm ${
                        l.id === currentId
                          ? "bg-[#1E3A8A] text-white"
                          : isCompleted
                          ? "hover:bg-green-50 text-gray-700"
                          : "hover:bg-gray-50 text-gray-500"
                      }`}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {isCompleted ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={l.id === currentId ? "white" : "#0F766E"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={l.id === currentId ? "white" : "#9CA3AF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium leading-snug">{l.title}</div>
                        <div className={`flex items-center gap-1 mt-0.5 text-xs ${l.id === currentId ? "text-white/70" : "text-gray-400"}`}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          {l.duration}
                        </div>
                      </div>
                    </Link>
                  );
                })}

                {/* Final Quiz item */}
                <Link
                  to={`/learning/quiz/${courseId_}`}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-gray-50 text-gray-400 transition-all text-sm"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9CA3AF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium leading-snug">Final Quiz</div>
                    <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-400">
                      Take to pass module
                    </div>
                  </div>
                </Link>
              </nav>

              {/* Progress */}
              <div className="mt-5 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-500 font-medium">Progress</span>
                  <span className="font-bold text-[#1E3A8A]">{progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-[#1E3A8A] transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Lesson Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
              {/* Meta */}
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                <span>Lesson {lesson.id} of {lessons.length}</span>
                <span>•</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{lesson.duration}</span>
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                {lesson.title}
              </h1>

              {isCurrentLessonCompleted && (
                <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-sm font-semibold px-3 py-1.5 rounded-full mb-6">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Completed
                </div>
              )}

              <h2 className="text-2xl font-bold text-gray-900 mb-3">{lesson.heading}</h2>
              <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">{lesson.body}</p>

              {lesson.learnItems && lesson.learnItems.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-[#1E3A8A] font-bold text-base mb-3">
                    What You'll Learn:
                  </h3>
                  <ul className="space-y-2">
                    {lesson.learnItems.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {lesson.sections && lesson.sections.map((section, sIdx) => (
                <div key={sIdx} className="mb-6">
                  <h3 className="text-[#1E3A8A] font-bold text-base mb-3">
                    {section.heading}
                  </h3>
                  {section.intro && (
                    <p className="text-gray-600 mb-3">{section.intro}</p>
                  )}
                  {section.items && section.items.length > 0 && (
                    <ul className="space-y-2">
                      {section.items.map((item, iIdx) => (
                        <li
                          key={iIdx}
                          className="flex items-start gap-2 text-gray-600"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                          {item.label ? (
                            <span>
                              <strong className="text-gray-800">
                                {item.label}
                              </strong>{" "}
                              {item.text}
                            </span>
                          ) : (
                            item.text
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.callout && (
                    <SectionCallout
                      type={section.callout.type}
                      text={section.callout.text}
                    />
                  )}
                </div>
              ))}

              {lesson.callout && (
                <SectionCallout
                  type={lesson.callout.type}
                  text={lesson.callout.text}
                />
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-9 pt-6 border-t border-gray-100">
                <button
                  onClick={handlePrev}
                  disabled={currentId === 1}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1E3A8A] text-white font-semibold text-sm hover:bg-[#1a3278] transition-all shadow-md hover:shadow-lg"
                >
                  {currentId < lessons.length ? "Next Lesson" : "Take Final Quiz"}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SectionCallout({ type, text }) {
  const styles = {
    info: "border-[#1E3A8A] bg-blue-50 text-gray-700",
    warning: "border-red-400 bg-red-50 text-gray-700",
    success: "border-[#0F766E] bg-green-50 text-gray-700",
  };

  return (
    <div className={`border-l-4 rounded-r-xl p-4 mt-4 ${styles[type]}`}>
      <p className="text-sm leading-relaxed whitespace-pre-line">{text}</p>
    </div>
  );
}
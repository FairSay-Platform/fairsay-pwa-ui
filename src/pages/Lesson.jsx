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
    if (currentId > 1) navigate(`/learning/lesson/${courseId_}/${currentId - 1}`);
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
      <Navbar />

      <main className="max-w-[95%] mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full lg:w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-24">
              <h2 className="font-bold text-gray-900 text-base mb-4">{courseTitle}</h2>
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
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { 
  courses,
  workplaceHarassmentLessons, workplaceHarassmentQuiz,
  discriminationLawsLessons, discriminationLawsQuiz,
  complaintProceduresLessons, complaintProceduresQuiz,
  wageHourLessons, wageHourQuiz,
  retaliationProtectionLessons, retaliationProtectionQuiz
} from "../data/courses";
import { useAppContext } from "../context/AppContext";
import { completeCourse, getCourseProgress, getNextCourse } from "../utils/logic-helpers";

// Helpers to grab the correct content based on the URL parameter
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

const getDetailedQuiz = (id) => {
  switch (id) {
    case "workplace-harassment": return workplaceHarassmentQuiz;
    case "discrimination-laws": return discriminationLawsQuiz;
    case "complaint-procedures": return complaintProceduresQuiz;
    case "wage-hour": return wageHourQuiz;
    case "retaliation-protection": return retaliationProtectionQuiz;
    default: return workplaceHarassmentQuiz;
  }
};

export default function Quiz() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAppContext();
  
  const [answers, setAnswers] = useState({});
  const [quizState, setQuizState] = useState("taking");
  const [hasPassedBefore, setHasPassedBefore] = useState(false);

  const courseId_ = courseId || "workplace-harassment";
  
  // Dynamically load course info
  const course = courses.find(c => c.id === courseId_);
  const courseTitle = course?.title || "Course Quiz";
  const lessons = getDetailedLessons(courseId_);
  const quiz = getDetailedQuiz(courseId_);
  const nextCourseId = getNextCourse(courseId_);
  
  // Calculate progress based on the current course
  const progress = getCourseProgress(courseId_);

  useEffect(() => {
    // Check if the user has already passed this quiz
    const storedProgress = JSON.parse(localStorage.getItem('fairsay_course_progress') || '{}');
    if (storedProgress[courseId_]?.completed) {
      setHasPassedBefore(true);
    }
  }, [courseId_]);

  const handleSelect = (questionId, optionIdx) => {
    if (quizState === "submitted") return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < quiz.length) return;
    setQuizState("submitted");
    
    // Calculate Score dynamically
    const finalScore = quiz.filter((q) => answers[q.id] === q.correctIndex).length;
    const finalScorePct = Math.round((finalScore / quiz.length) * 100);
    
    // If they pass, officially complete the course!
    if (finalScorePct >= 80) {
      completeCourse(courseId_, finalScorePct, user?.id);
      setHasPassedBefore(true);
    }
  };

  const handleTryAgain = () => {
    setAnswers({});
    setQuizState("taking");
  };

  const score = quizState === "submitted"
    ? quiz.filter((q) => answers[q.id] === q.correctIndex).length
    : 0;
  const scorePct = quizState === "submitted"
    ? Math.round((score / quiz.length) * 100)
    : 0;
  const passed = scorePct >= 80;

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
                {lessons.map((l) => (
                  <Link
                    key={l.id}
                    to={`/learning/lesson/${courseId_}/${l.id}`}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-green-50 text-gray-700 transition-all text-sm"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium leading-snug">{l.title}</div>
                      <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-400">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {l.duration}
                      </div>
                    </div>
                  </Link>
                ))}

                {/* Final Quiz - active */}
                <div className={`flex items-start gap-2.5 p-2.5 rounded-xl ${hasPassedBefore ? 'bg-green-600' : 'bg-red-600'} text-white text-sm`}>
                  <div className="flex-shrink-0 mt-0.5">
                    {hasPassedBefore ? (
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="6" />
                        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium leading-snug">Final Quiz</div>
                    <div className={`flex items-center gap-1 mt-0.5 text-xs ${hasPassedBefore ? 'text-green-100' : 'text-red-200'}`}>
                      {quiz.length} questions
                    </div>
                  </div>
                </div>
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

          {/* Quiz Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
              {/* Quiz Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl ${hasPassedBefore ? 'bg-green-600' : 'bg-red-600'} flex items-center justify-center flex-shrink-0`}>
                   {hasPassedBefore ? (
                       <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    ) : (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="6" />
                        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                      </svg>
                    )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Final Quiz</h1>
                  <p className="text-gray-500 text-sm">Test your knowledge - 80% required to pass</p>
                </div>
              </div>

              {/* Result Banner (after submit) */}
              {quizState === "submitted" && (
                <div className={`rounded-xl p-4 mb-6 ${passed ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {passed ? (
                      <>
                        <span className="text-green-600 text-lg">✓</span>
                        <span className="font-bold text-green-700 text-base">Congratulations! You Passed!</span>
                      </>
                    ) : (
                      <>
                        <span className="text-red-600 text-lg">✗</span>
                        <span className="font-bold text-red-700 text-base">Not Quite There</span>
                      </>
                    )}
                  </div>
                  <p className={`text-sm ${passed ? "text-green-600" : "text-red-600"}`}>
                    You scored {score} out of {quiz.length} ({scorePct}%)
                  </p>
                  {!passed && (
                    <p className="text-sm text-red-500 mt-0.5">Review the material and try again.</p>
                  )}
                </div>
              )}

              {/* Already Passed Banner */}
              {hasPassedBefore && quizState !== "submitted" && (
                 <div className="rounded-xl p-4 mb-6 bg-green-50 border border-green-200">
                  <div className="flex items-center gap-2 mb-1">
                      <span className="text-green-600 text-lg">✓</span>
                      <span className="font-bold text-green-700 text-base">Course Completed</span>
                  </div>
                  <p className="text-sm text-green-600">
                    You have already passed this quiz and unlocked the next module! You can retake it below if you'd like to test your knowledge again.
                  </p>
                </div>
              )}

              {/* Questions */}
              <div className="space-y-6">
                {quiz.map((q) => {
                  const selected = answers[q.id];
                  const isSubmitted = quizState === "submitted";

                  return (
                    <div key={q.id} className="border border-gray-100 rounded-xl p-5">
                      <p className="font-semibold text-gray-900 mb-4">{q.question}</p>
                      <div className="space-y-2.5">
                        {q.options.map((option, idx) => {
                          let optionStyle = "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50";
                          let rightIcon = null;

                          if (isSubmitted) {
                            if (idx === q.correctIndex) {
                              optionStyle = "border-green-400 bg-green-50 text-gray-800";
                              rightIcon = (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                  <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                              );
                            } else if (idx === selected && selected !== q.correctIndex) {
                              optionStyle = "border-red-400 bg-red-50 text-gray-800";
                            }
                          } else if (selected === idx) {
                            optionStyle = "border-[#1E3A8A] bg-blue-50 text-gray-800";
                          }

                          return (
                            <button
                              key={idx}
                              onClick={() => handleSelect(q.id, idx)}
                              className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm font-medium flex items-center justify-between gap-3 ${optionStyle} ${quizState === "submitted" ? "cursor-default" : "cursor-pointer"}`}
                            >
                              <span>{option}</span>
                              {rightIcon}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                {quizState === "taking" ? (
                  <>
                    <Link
                      to={`/learning/lesson/${courseId_}/${lessons.length}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-all"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                      </svg>
                      Previous
                    </Link>
                    <button
                      onClick={handleSubmit}
                      disabled={Object.keys(answers).length < quiz.length}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1E3A8A] text-white font-semibold text-sm hover:bg-[#1a3278] transition-all shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Submit Quiz
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to={`/learning/lesson/${courseId_}/1`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-all"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                      </svg>
                      Back to Lessons
                    </Link>
                    {!passed ? (
                      <button
                        onClick={handleTryAgain}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
                      >
                        Try Again
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="23 4 23 10 17 10" />
                          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                        </svg>
                      </button>
                    ) : nextCourseId ? (
                      <Link
                        to={`/learning/lesson/${nextCourseId}/1`}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0F766E] text-white font-semibold text-sm hover:bg-[#0d6460] transition-all"
                      >
                        Next Course
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </Link>
                    ) : (
                      <Link
                        to="/learning"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0F766E] text-white font-semibold text-sm hover:bg-[#0d6460] transition-all shadow-md hover:shadow-lg"
                      >
                        Back to Education Hub
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
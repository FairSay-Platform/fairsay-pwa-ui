import { Link, useLocation } from "react-router-dom";
import Logo from "../components/Logo";
import { useAppContext } from "../context/AppContext";
import { BackButtonLink } from "../components/BackButton";

const NEXT_STEPS = [
  {
    num: 1,
    color: "bg-[#1E3A8A]",
    title: "Initial Review (24-48 hours)",
    desc: "Our team will review your complaint and verify the details",
  },
  {
    num: 2,
    color: "bg-[#0F766E]",
    title: "Assignment & Investigation",
    desc: "Your complaint will be assigned to the appropriate department",
  },
  {
    num: 3,
    color: "bg-red-600",
    title: "Updates & Resolution",
    desc: "You'll receive regular updates as your case progresses",
  },
];

const REMINDERS = [
  "Check your email for confirmation and updates",
  "You can track your complaint status on your dashboard",
  "Keep any additional evidence that may emerge",
  "You are protected from retaliation under law",
];

export default function ComplaintSuccess() {
  const location = useLocation();
  const complaintId = location.state?.trackingId || "ID not found"; 
  const { addNotification } = useAppContext();

  //Added - Click to copy feature
  const handleCopyId = () => {
    if (complaintId !== "ID not found") {
      navigator.clipboard.writeText(complaintId);
      addNotification(
        "ID Copied!", 
        `Tracking ID ${complaintId} copied to your clipboard.`, 
        "success"
      );
    }
  };

  //Added - Demo interaction for the AI button
  const handleAIAssistant = () => {
    addNotification(
      "AI Assistant Booting...", 
      "The FairSay AI legal assistant is preparing your case context.", 
      "info"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9]">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E7EB] px-6 py-4">
        <div className="max-w-[95%] mx-auto flex items-center justify-between">
          <Logo />
          <BackButtonLink to="/my-complaints" label="Back to Complaints" className="mr-4 lg:mr-8" />
        </div>
      </header>

      <main className="max-w-[95%] mx-auto px-4 sm:px-6 py-9">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 sm:p-9">
          {/* Success icon */}
          <div className="flex justify-center mb-5">
            <div className="w-[72px] h-[72px] rounded-full bg-[#0F766E] flex items-center justify-center">
              <svg width="43" height="43" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M43.6022 20.001C44.5156 24.4836 43.8646 29.1438 41.7579 33.2045C39.6512 37.2653 36.216 40.4811 32.0252 42.3156C27.8345 44.1501 23.1415 44.4925 18.7288 43.2857C14.3161 42.0789 10.4506 39.3958 7.77675 35.6838C5.10292 31.9718 3.78244 27.4554 4.03553 22.8877C4.28861 18.32 6.09996 13.9771 9.1675 10.5833C12.235 7.18946 16.3734 4.94982 20.8923 4.23786C25.4113 3.52591 30.0378 4.38468 34.0002 6.67096"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 22L24 28L44 8"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h1
            className="text-[22px] sm:text-[27px] font-bold text-gray-900 text-center mb-2.5 font-poppins"
          >
            Complaint Submitted Successfully
          </h1>
          <p className="text-gray-500 text-center text-xs sm:text-sm mb-7">
            Your workplace violation complaint has been received and is now under review by our team.
          </p>

          {/* Complaint ID card */}
          <div 
            onClick={handleCopyId}
            className="border-2 border-[#1E3A8A] bg-blue-50 rounded-2xl p-4 mb-5 cursor-pointer hover:bg-blue-100 transition-colors group"
            title="Click to copy ID"
          >
            <div className="flex items-center justify-center gap-2 mb-2.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2V8H20" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 13H8" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 17H8" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 9H9H8" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-bold text-gray-900 text-xs">Your Complaint ID</span>
            </div>
            <div className="bg-white rounded-xl px-3.5 py-2.5 text-center mb-2.5 group-hover:shadow-sm transition-shadow">
              <span
                className="text-[22px] sm:text-[27px] font-bold text-[#1E3A8A] tracking-widest"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {complaintId}
              </span>
            </div>
            <p className="text-center text-[11px] text-[#1E3A8A] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Click to copy to clipboard
            </p>
          </div>

          {/* What Happens Next */}
          <div
            className="rounded-2xl p-4 mb-5"
            style={{ background: 'linear-gradient(90deg, #EFF6FF 0%, #F0FDFA 100%)' }}
          >
            <h2 className="text-xs font-bold text-gray-900 text-center mb-3.5">What Happens Next?</h2>
            <div className="space-y-3.5">
              {NEXT_STEPS.map((step) => (
                <div key={step.num} className="flex items-start gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 ${step.color}`}
                  >
                    {step.num}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">{step.title}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important reminders */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-3.5 mb-7">
            <p className="text-xs font-bold text-gray-800 mb-1.5">Important Reminders:</p>
            <ul className="space-y-1">
              {REMINDERS.map((r) => (
                <li key={r} className="text-xs text-gray-700">
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2.5">
            <Link
              to="/my-complaints"
              className="w-full flex items-center justify-center py-3 rounded-xl text-white font-semibold text-xs transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(180deg, #1E3A8A 0%, #0F766E 100%)' }}
            >
              View My Complaints
            </Link>
            <Link
              to="/dashboard"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#1E3A8A] text-[#1E3A8A] font-semibold text-xs hover:bg-blue-50 transition-colors"
            >
              Return to Dashboard
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.16699 10H15.8337" stroke="#1E3A8A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 4.16602L15.8333 9.99935L10 15.8327" stroke="#1E3A8A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
           
            <button 
              onClick={handleAIAssistant}
              className="text-gray-500 text-xs font-semibold py-2 hover:text-[#1E3A8A] transition-colors"
            >
              Need Help? Talk to AI Assistant
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
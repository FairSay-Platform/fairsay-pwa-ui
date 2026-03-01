import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function StarRating({ label, sublabel }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="space-y-1.5">
      {label && (
        <div>
          <p className="text-sm font-semibold text-gray-800">{label}</p>
          {sublabel && <p className="text-xs text-gray-500 mt-0.5">{sublabel}</p>}
        </div>
      )}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="text-gray-300 hover:text-amber-400 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill={(hover || rating) >= star ? "#F59E0B" : "none"}>
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke={(hover || rating) >= star ? "#F59E0B" : "#D1D5DB"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}

function YesNoQuestion({ question }) {
  const [selected, setSelected] = useState(null);
  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-700">{question}</p>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setSelected("yes")}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-all ${selected === "yes" ? "border-[#1E3A8A] bg-blue-50 text-[#1E3A8A]" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Yes
        </button>
        <button
          onClick={() => setSelected("no")}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-all ${selected === "no" ? "border-red-400 bg-red-50 text-red-600" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          No
        </button>
      </div>
    </div>
  );
}

function RadioGroup({ question, options }) {
  const [selected, setSelected] = useState(null);
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-gray-800">{question}</p>
      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-3 cursor-pointer group">
            <div
              onClick={() => setSelected(opt)}
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer ${selected === opt ? "border-[#0F766E] bg-[#0F766E]" : "border-gray-300 group-hover:border-[#0F766E]"}`}
            >
              {selected === opt && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
            <span className="text-sm text-gray-700">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

const inputClass = "w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#1E3A8A] transition-colors bg-white resize-none";

export default function ComplaintFeedback() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 max-w-sm w-full text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-[#0F766E] flex items-center justify-center mx-auto">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="font-poppins text-xl font-bold text-gray-900">Thank You for Your Feedback!</h2>
          <p className="text-gray-500 text-sm">Your honest feedback helps us create a better experience for everyone.</p>
          <Link to="/my-complaints" className="block w-full py-3 rounded-xl bg-[#1E3A8A] text-white font-semibold text-sm hover:opacity-90 transition-opacity">
            Back to My Complaints
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F4F8]">
      <Navbar />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        {/* Title */}
        <div>
          <h1 className="font-poppins text-2xl sm:text-3xl font-bold text-gray-900">Post-Resolution Feedback</h1>
          <p className="text-gray-500 text-sm mt-1">Help us improve by sharing your experience with the complaint resolution process</p>
        </div>

        {/* Complaint context card */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#0F766E] flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Discriminatory Hiring Practice</p>
                <p className="text-xs text-gray-400 mt-0.5">Case ID: CPL-2024-001156</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700 shrink-0">Resolved</span>
          </div>
          <div className="flex flex-wrap gap-6 text-xs text-gray-500 border-t border-gray-100 pt-3">
            <div className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M14 2H6C5.47 2 4.96 2.21 4.59 2.59C4.21 2.96 4 3.47 4 4V20C4 20.53 4.21 21.04 4.59 21.41C4.96 21.79 5.47 22 6 22H18C18.53 22 19.04 21.79 19.41 21.41C19.79 21.04 20 20.53 20 20V8L14 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2V8H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Category: <strong className="text-gray-700">Discrimination</strong>
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              Resolution Time: <strong className="text-gray-700">23 days</strong>
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Resolution: <strong className="text-gray-700">Policy Updated & Training Mandated</strong>
            </div>
          </div>
        </div>

        {/* Overall rating */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 space-y-4">
          <h2 className="font-poppins text-lg font-bold text-gray-900">Overall Experience Rating</h2>
          <p className="text-gray-500 text-sm -mt-2">How would you rate your overall experience with the complaint resolution process?</p>
          <StarRating label="" />
        </div>

        {/* Rate specific aspects */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 space-y-6">
          <h2 className="font-poppins text-lg font-bold text-gray-900">Rate Specific Aspects</h2>
          <StarRating
            label="Communication Quality"
            sublabel="How clear and timely was the communication throughout the process?"
          />
          <StarRating
            label="Response Timeliness"
            sublabel="How satisfied are you with the time taken to resolve your complaint?"
          />
          <StarRating
            label="Fairness of Process"
            sublabel="Do you feel the investigation and resolution were fair and unbiased?"
          />
          <StarRating
            label="Support Received"
            sublabel="How would you rate the support and guidance you received?"
          />
        </div>

        {/* Quick questions */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 space-y-5">
          <h2 className="font-poppins text-lg font-bold text-gray-900">Quick Questions</h2>
          {[
            "Was the outcome acceptable to you?",
            "Did you feel heard and respected throughout the process?",
            "Would you recommend this system to colleagues facing similar issues?",
            "Do you have confidence in the fairness of this complaint system?",
            "Would you feel comfortable reporting future violations through this system?",
          ].map((q) => (
            <YesNoQuestion key={q} question={q} />
          ))}
        </div>

        {/* Process evaluation */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 space-y-6">
          <h2 className="font-poppins text-lg font-bold text-gray-900">Process Evaluation</h2>
          <RadioGroup
            question="How clear was the complaint resolution process?"
            options={["Very clear", "Somewhat clear", "Neutral", "Somewhat unclear", "Very unclear"]}
          />
          <RadioGroup
            question="How would you rate the quality of documentation and updates?"
            options={["Excellent", "Good", "Fair", "Poor", "Very poor"]}
          />
          <RadioGroup
            question="How satisfied were you with the follow-up after resolution?"
            options={["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"]}
          />
        </div>

        {/* Detailed feedback */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 space-y-5">
          <h2 className="font-poppins text-lg font-bold text-gray-900">Detailed Feedback</h2>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">What went well during the resolution process?</label>
            <p className="text-xs text-gray-400 mb-2">Share any positive aspects or highlights of your experience</p>
            <textarea
              rows={3}
              placeholder="For example: Clear communication, prompt responses, professional handling..."
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">What could be improved?</label>
            <p className="text-xs text-gray-400 mb-2">Help us identify areas where we can enhance our process</p>
            <textarea
              rows={3}
              placeholder="For example: Faster response times, more frequent updates, better documentation..."
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Additional Comments</label>
            <p className="text-xs text-gray-400 mb-2">Any other thoughts or feedback you'd like to share?</p>
            <textarea
              rows={3}
              placeholder="Share any additional thoughts, concerns, or suggestions..."
              className={inputClass}
            />
          </div>
        </div>

        {/* Privacy notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5 text-blue-600">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <p className="text-xs text-blue-800 leading-relaxed">
            <strong>Privacy & Confidentiality:</strong> Your feedback is confidential and will be used solely to improve our complaint resolution process. Feedback is anonymized before analysis and will not impact your complaint resolution or employment status.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setSubmitted(true)}
            className="flex-1 py-3.5 rounded-xl bg-[#1E3A8A] text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Submit Feedback
          </button>
          <Link
            to="/my-complaints"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-[#1E3A8A] hover:text-[#1E3A8A] transition-colors"
          >
            Skip for now
          </Link>
        </div>

        <p className="text-center text-xs text-gray-400 pb-4">
          Your honest feedback helps us create a better experience for everyone
        </p>
      </main>
    </div>
  );
}

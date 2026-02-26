import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const violationCategories = [
  "Wage & Hour Violations",
  "Workplace Harassment",
  "Discrimination",
  "Retaliation",
  "Workplace Safety",
  "Wrongful Termination",
  "Fraud / Financial Crime",
  "Other",
];

const inputClass = "w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-red-400 transition-colors bg-white";
const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

function FileUpload() {
  const [fileName, setFileName] = useState(null);
  const inputRef = useRef(null);

  return (
    <div
      className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center gap-2 cursor-pointer hover:border-red-400 transition-colors bg-white"
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) setFileName(file.name);
      }}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="17,8 12,3 7,8" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" y1="3" x2="12" y2="15" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      {fileName ? (
        <p className="text-sm text-red-600 font-medium">{fileName}</p>
      ) : (
        <>
          <p className="text-sm text-gray-600">Drag and drop files here, or</p>
          <p className="text-sm text-red-600 font-semibold underline underline-offset-2">browse files</p>
          <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG, DOC (Max 10MB each)</p>
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) setFileName(e.target.files[0].name);
        }}
      />
    </div>
  );
}

export default function AnonymousReport() {
  const navigate = useNavigate();
  const [descCount, setDescCount] = useState(0);
  const [hasWitnesses, setHasWitnesses] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [anonId] = useState(() => "ANON-" + Math.random().toString(36).substring(2, 10).toUpperCase());

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center px-4 py-10">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mx-auto">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h2 className="font-poppins text-xl font-bold text-gray-900 mb-2">Report Submitted Anonymously</h2>
            <p className="text-gray-500 text-sm">Your report has been received. Save your Anonymous ID to track your report.</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-xs text-red-600 font-medium mb-1">Your Anonymous ID</p>
            <p className="font-poppins text-xl font-bold text-red-700 tracking-wider">{anonId}</p>
            <p className="text-xs text-gray-500 mt-2">Save this ID. We cannot recover it if lost.</p>
          </div>
          <Link
            to="/dashboard"
            className="block w-full py-3 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F4F8]">
      <Navbar />

      <main className="max-w-[95%] mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Hero */}
        <div className="bg-red-700 rounded-xl p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M1.7181 10.2908C1.64865 10.1037 1.64865 9.89788 1.7181 9.71079C2.39452 8.07067 3.5427 6.66832 5.01708 5.68154C6.49146 4.69475 8.22564 4.16797 9.99977 4.16797C11.7739 4.16797 13.5081 4.69475 14.9825 5.68154C16.4568 6.66832 17.605 8.07067 18.2814 9.71079C18.3509 9.89788 18.3509 10.1037 18.2814 10.2908C17.605 11.9309 16.4568 13.3333 14.9825 14.32C13.5081 15.3068 11.7739 15.8336 9.99977 15.8336C8.22564 15.8336 6.49146 15.3068 5.01708 14.32C3.5427 13.3333 2.39452 11.9309 1.7181 10.2908Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1 className="font-poppins text-2xl sm:text-3xl font-bold text-white">Anonymous Whistleblowing</h1>
              <p className="text-red-100 text-sm mt-0.5">Report workplace violations without revealing your identity</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="white" strokeWidth="2"/><path d="M7 11V7C7 4.79 8.79 3 11 3H13C15.21 3 17 4.79 17 7V11" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>, label: "100% Anonymous" },
              { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: "End-to-End Encrypted" },
              { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M14 2H6C5.47 2 4.96 2.21 4.59 2.59C4.21 2.96 4 3.47 4 4V20C4 20.53 4.21 21.04 4.59 21.41C4.96 21.79 5.47 22 6 22H18C18.53 22 19.04 21.79 19.41 21.41C19.79 21.04 20 20.53 20 20V8L14 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2V8H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: "No Account Required" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-full">
                {b.icon}
                <span className="text-white text-xs font-medium">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy section */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 11L12 14L22 4" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2 className="font-semibold text-gray-800 text-sm">Your Privacy is Protected</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-green-700 text-xs font-bold mb-1">No Tracking</p>
              <p className="text-green-700 text-xs leading-relaxed">We don't collect IP addresses, device info, or any identifying metadata</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-blue-700 text-xs font-bold mb-1">Encrypted Storage</p>
              <p className="text-blue-700 text-xs leading-relaxed">All reports are encrypted before storage using military-grade encryption</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-700 text-xs font-bold mb-1">Anonymous ID</p>
              <p className="text-red-700 text-xs leading-relaxed">Track your report status using only your unique Anonymous ID</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 sm:p-8 space-y-5">
          <h2 className="font-poppins text-xl font-bold text-gray-900">Submit Anonymous Report</h2>

          <div>
            <label className={labelClass}>Violation Category <span className="text-red-500">*</span></label>
            <div className="relative">
              <select className={`${inputClass} appearance-none pr-10 focus:border-red-400`} defaultValue="">
                <option value="" disabled>Select violation category</option>
                {violationCategories.map((c) => <option key={c}>{c}</option>)}
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>

          <div>
            <label className={labelClass}>Report Title <span className="text-red-500">*</span></label>
            <input type="text" placeholder="Brief summary of the violation" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Detailed Description <span className="text-red-500">*</span></label>
            <textarea
              rows={5}
              placeholder="Provide as much detail as possible: What happened? When? Who was involved? Any supporting details?"
              className={`${inputClass} resize-none`}
              onChange={(e) => setDescCount(e.target.value.length)}
            />
            <div className="flex items-center justify-between mt-1.5">
              <p className="text-xs text-gray-400">Tip: Be specific but avoid including information that could identify you</p>
              <p className="text-xs text-gray-400">{descCount}/50 minimum</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Date of Incident <span className="text-gray-400 font-normal text-xs">(Optional)</span></label>
              <div className="relative">
                <input type="date" className={`${inputClass} pl-10`} />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="#9CA3AF" strokeWidth="2"/><line x1="16" y1="2" x2="16" y2="6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/><line x1="8" y1="2" x2="8" y2="6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="10" x2="21" y2="10" stroke="#9CA3AF" strokeWidth="2"/></svg>
              </div>
            </div>
            <div>
              <label className={labelClass}>Location <span className="text-gray-400 font-normal text-xs">(Optional)</span></label>
              <input type="text" placeholder="e.g., 3rd floor" className={inputClass} />
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={hasWitnesses}
              onChange={(e) => setHasWitnesses(e.target.checked)}
              className="mt-0.5 accent-red-600"
            />
            <span className="text-sm text-gray-700">Were there witnesses to this incident?</span>
          </label>

          <div>
            <label className={labelClass}>Upload Supporting Documents <span className="text-gray-400 font-normal text-xs">(Optional)</span></label>
            <FileUpload />
            <p className="text-xs text-gray-400 mt-1.5">Remove any metadata from files that could identify you</p>
          </div>

          {/* Important notice */}
          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>Important:</strong> After submission, you'll receive a unique Anonymous ID. Save this ID to check the status of your report. We cannot recover lost IDs or link reports to individuals.
            </p>
          </div>

          <button
            onClick={() => setSubmitted(true)}
            className="w-full py-3.5 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors"
          >
            Submit Anonymous Report
          </button>
        </div>
      </main>
    </div>
  );
}

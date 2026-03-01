import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { submitComplaint } from "../utils/logic-helpers";
import { COMPLAINT_CATEGORIES } from "../utils/constants";

export default function Whistleblowing() {
  const navigate = useNavigate();
  const [showEducation, setShowEducation] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasWitnesses, setHasWitnesses] = useState(false);
  const [formData, setFormData] = useState({
    violationType: "",
    description: "",
    location: "",
    dateOccurred: "",
    evidenceFiles: [],
  });

  
  const descCount = formData.description.trim().length;
  const minDescCount = descCount >= 50;

  const labelClass = "block text-base font-bold text-gray-900 mb-3";
  const inputClass = "w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent text-sm";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!minDescCount) {
      alert("Please provide a more detailed description (at least 50 characters).");
      return;
    }
    
    const combinedDescription = `Location: ${formData.location || 'Not specified'}\nDate: ${formData.dateOccurred || 'Not specified'}\nWitnesses: ${hasWitnesses ? 'Yes' : 'No'}\n\nDetails:\n${formData.description}`;

    const result = await submitComplaint({
      type: formData.violationType || 'OTHER',
      title: formData.title,
      description: combinedDescription,
      isAnonymous: true
    });

    setIsSubmitting(false);

    if (result.success) {
      //To pass the tracking ID to the success page so they can save it
      navigate("/complaint-success", { state: { trackingId: result.trackingId } });
    } else {
      alert("Submission failed. Please try again or contact support.");
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, evidenceFiles: [...prev.evidenceFiles, ...files] }));
  };

  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      evidenceFiles: prev.evidenceFiles.filter((_, i) => i !== index),
    }));
  };

  if (showEducation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Navbar />

        <main className="max-w-[95%] mx-auto px-4 py-6">
          {/* Warning Banner */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 mb-6">
              <div className="flex flex-col lg:flex-row items-start gap-5">
                <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center flex-shrink-0">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-3">Anonymous Reporting</h1>
                  <p className="text-gray-600 leading-relaxed mb-5">
                    Before submitting your report, it's important to understand your rights and the reporting process. 
                    This helps ensure your report is complete and increases the likelihood of a successful resolution.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5">
                    <div className="flex items-start gap-3">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                      </svg>
                      <p className="text-sm text-gray-700">
                        We recommend reviewing our educational materials to understand your rights before filing a report. 
                        This is optional but highly encouraged.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to="/learning"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1E3A8A] text-white rounded-xl font-semibold text-sm hover:bg-[#1a3278] transition-colors"
                    >
                      Review Education Materials
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                    <button
                      onClick={() => setShowEducation(false)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
                    >
                      Continue to Report
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">End-to-End Encryption</h3>
                <p className="text-xs text-gray-600">Your report is encrypted and secure</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">Fully Anonymous</h3>
                <p className="text-xs text-gray-600">No personal information required</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">Protected Identity</h3>
                <p className="text-xs text-gray-600">Your identity stays confidential</p>
              </div>
            </div>
          </main>
        </div>
      );
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />

      <main className="max-w-[95%] mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#DC2626] to-[#EF4444] rounded-2xl p-6 lg:p-8 mb-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">Anonymous Whistleblowing Report</h1>
                <p className="text-white/90 text-sm">Report workplace violations securely and anonymously</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
             
             <h2 className="font-poppins text-xl font-bold text-gray-900">Submit Anonymous Report</h2>

                  <div>
                    <label className={labelClass}>Violation Category <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select 
                        className={`${inputClass} appearance-none pr-10 focus:border-red-400`} 
                        value={formData.violationType}
                        onChange={(e) => setFormData(prev => ({ ...prev, violationType: e.target.value }))}
                        required
                      >
                        <option value="" disabled>Select violation category</option>
                        {COMPLAINT_CATEGORIES.map((c) => (
                          <option key={c.value} value={c.value}> {c.label}</option>
                        ))}
                      </select>
                      <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Report Title <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="Brief summary of the violation" 
                      className={inputClass}
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      required 
                    />
                  </div>
                   {/* Description */}
                <div className="p-6">
                  <label className="block text-base font-bold text-gray-900 mb-4">
                    Detailed Description <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-gray-600 mb-4">
                    Provide as much detail as possible about what happened. Include dates, times, locations, and any witnesses if applicable.
                  </p>
                  <textarea
                    value={formData.description}
                   onChange={(e) => {
                        setFormData((prev) => ({ ...prev, description: e.target.value }));
                    }}
                    rows={6}
                    placeholder="Describe the violation in detail..."
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent resize-none text-sm"
                    required
                  />

                   <div className="flex items-center justify-between mt-1.5">
              <p className="text-xs text-gray-400">Tip: Be specific but avoid including information that could identify you</p>
              <p className={`text-xs ${minDescCount ? 'text-gray-400' : 'text-red-500'}`}>{descCount}/50 minimum</p>
            </div>

                </div>

                {/* Location, Date, and Witnesses */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-6">
                    <label className="text-base font-bold text-gray-900 mb-3">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g 3rd floor"
                      className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent text-sm"
                    />
                  </div>

                  <div className=" p-6">
                    <label className=" text-base font-bold text-gray-600 mb-3">
                      Date Occurred
                    </label>
                    <input
                      type="date"
                      value={formData.dateOccurred}
                      onChange={(e) => setFormData((prev) => ({ ...prev, dateOccurred: e.target.value }))}
                      className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent text-sm"
                    />
                  </div>
                

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasWitnesses}
                      onChange={(e) => setHasWitnesses(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700 font-medium">Were there witnesses to this incident?</span>
                  </label>
                </div>
                </div>

                {/* Evidence Upload */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <label className="block text-base font-bold text-gray-900 mb-3">
                    Upload Supporting Evidence <span className="font-inter text-gray-400 text-xs ">(Optional)</span>
                  </label>
                  <p className="text-sm text-gray-600 mb-4">
                    Attach photos, documents, or other evidence. Files will be encrypted.
                  </p>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#DC2626] transition-colors">
                    <input
                      type="file"
                      id="evidence"
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="evidence" className="cursor-pointer">
                      <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <span className="text-sm font-semibold text-[#DC2626]">Click to upload</span>
                      <span className="text-sm text-gray-500"> or drag and drop</span>
                    </label>
                  </div>
                  {formData.evidenceFiles.length > 0 && (
                    <div className="mt-4 space-y-2.5">
                      {formData.evidenceFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-700 truncate flex-1">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="ml-3 text-red-600 hover:text-red-800"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-gray-400 mt-2">Remove any metadata from files that could identify you.</p>
                </div>

  {/* Important notice */}
                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
                  <p className="text-sm text-amber-800 leading-relaxed">
                    <strong>Important:</strong> After submission, you'll receive a unique Anonymous ID. Save this ID to check the status of your report. We cannot recover lost IDs or link reports to individuals.
                  </p>
                </div>

                </div>

              {/* Sidebar */}
            <div className="space-y-6">
                {/* Anonymity Notice */}
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6 top-24">
                  <div className="flex items-start gap-3 mb-4">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <div>
                      <h3 className="font-bold text-sm text-gray-900 mb-1">Your Privacy Protected</h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        This report is completely anonymous. We do not collect IP addresses, browser fingerprints, or any identifying information.
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex items-start gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      End-to-end encryption
                    </li>
                    <li className="flex items-start gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      No tracking cookies
                    </li>
                    <li className="flex items-start gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      No account required
                    </li>
                    <li className="flex items-start gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Secure file storage
                    </li>
                  </ul>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-[#DC2626] text-white rounded-xl font-bold text-base hover:bg-[#b91c1c] transition-colors flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Encrypting & Submitting..." : "Submit Anonymous Report"}
                  {!isSubmitting && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  )}
                </button>

                {/* Help Link */}
                <Link
                  to="/ai-assistant"
                  className="block text-center px-6 py-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
                >
                  Need Help? Ask AI Assistant
                </Link>
              </div>
            </div>
          </form>
      </main>
    </div>
  );
}

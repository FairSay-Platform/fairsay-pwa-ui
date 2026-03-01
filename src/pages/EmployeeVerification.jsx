import Logo from "../components/Logo";
import StepIndicator from "../components/StepIndicator";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { APP_NAME } from "../utils/constants";
import { useAppContext } from "../context/AppContext";

export default function EmployeeVerification() {
  const navigate = useNavigate();
  const { updateUser } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    declaration: "",
    file: null,
    consentData: false,
    consentPrivacy: false,
  });

  const steps = [
    { number: 1, label: "Account", status: "completed" },
    { number: 2, label: "Profile", status: "completed" },
    { number: 3, label: "Verification", status: "current" },
  ];

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

   
    const success = await updateUser({
      declaration: formData.declaration,
      verification_status: 'pending' // This triggers the Dashboard banner!
    });

    setIsSubmitting(false);

    if (success) {
      navigate("/account-success");
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center px-4 py-7"
      style={{
        background: "linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)",
      }}
    >
      <div className="w-full max-w-[1020px] flex flex-col items-start gap-7">
        {/* Logo */}
        <div className="flex items-center gap-2 w-full justify-center">
                   <div className="w-10 h-10"><Logo /></div>
                   <span className="text-[36px] font-bold font-poppins text-[#1e3a8a]">{APP_NAME}</span>
                 </div>

        {/* Step Indicator */}
        <StepIndicator steps={steps} />

        {/* Main Card */}
        <div className="w-full rounded-2xl bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] p-7">
          <div className="mb-7 text-center">
            <h1 className="font-poppins font-bold text-[27px] leading-[32px] text-[#333] mb-2">
              Employee Verification
            </h1>
            <p className="text-[#4A5565] text-base leading-7">
              Verify your employment status to access all features
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Self-Declaration and File Upload in Grid on Desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Self-Declaration */}
              <div>
                <label className="block text-[#333] text-sm font-medium mb-2">
                  Self-Declaration <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.declaration}
                  onChange={(e) =>
                    setFormData({ ...formData, declaration: e.target.value })
                  }
                  placeholder="I declare that I am currently employed by [Company Name] in the position of [Job Title]. I understand that providing false information may result in account termination."
                  rows={6}
                  className="w-full px-4 py-[11px] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent text-[#333] placeholder:text-[#9CA3AF] resize-none"
                  required
                />
                <p className="text-xs text-[#9CA3AF] mt-2">
                  Please confirm your employment status in your own words
                </p>
              </div>

              {/* Upload Proof of Employment */}
              <div>
                <label className="block text-[#333] text-sm font-medium mb-2">
                  Upload Proof of Employment <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-[#E5E7EB] rounded-lg p-4 text-center hover:border-[#1E3A8A] transition-colors flex flex-col justify-center min-h-[180px]">
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    required
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24 32V16"
                        stroke="#9CA3AF"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 24L24 16L32 24"
                        stroke="#9CA3AF"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 36H40"
                        stroke="#9CA3AF"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div>
                      <p className="text-[#333] font-medium mb-1 text-sm">
                        Drag and drop your file here, or{" "}
                        <span className="text-[#1E3A8A] underline">browse files</span>
                      </p>
                      <p className="text-xs text-[#9CA3AF]">
                        Supported formats: PDF, JPG, PNG, DOC
                      </p>
                      <p className="text-xs text-[#9CA3AF]">
                        (Max 10MB)
                      </p>
                      <p className="text-xs text-[#9CA3AF] mt-1">
                        ID, Badge, Offer letter, Pay stub
                      </p>
                    </div>
                  </label>
                  {formData.file && (
                    <div className="mt-3 p-2 bg-[#EFF6FF] rounded-lg flex items-center justify-between text-left">
                      <span className="text-xs text-[#333] truncate">{formData.file.name}</span>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, file: null })}
                        className="text-red-500 hover:text-red-700 text-xs ml-2 flex-shrink-0"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="rounded border-l-4 border-[#1E3A8A] bg-[#EFF6FF] p-3">
              <p className="text-xs leading-5 text-[#1E3A8A]">
                <span className="font-semibold">Your Privacy is Protected:</span> All
                uploaded documents are encrypted and securely stored. Only authorized
                personnel can access verification materials, and they are never shared
                with third parties.
              </p>
            </div>

            {/* Consent Checkboxes in Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Consent to Data Processing */}
              <div>
                <label className="block text-[#333] text-sm font-medium mb-3">
                  Consent to Data Processing <span className="text-red-500">*</span>
                </label>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent-data"
                    checked={formData.consentData}
                    onChange={(e) =>
                      setFormData({ ...formData, consentData: e.target.checked })
                    }
                    className="mt-1 w-4 h-4 text-[#1E3A8A] border-[#E5E7EB] rounded focus:ring-[#1E3A8A]"
                    required
                  />
                  <label
                    htmlFor="consent-data"
                    className="text-xs text-[#4A5565] leading-5"
                  >
                    I consent to the processing of my personal information for the purpose
                    of employment verification and complaint management in accordance with
                    applicable data protection laws.
                  </label>
                </div>
              </div>

              {/* Privacy Policy Agreement */}
              <div>
                <label className="block text-[#333] text-sm font-medium mb-3">
                  Privacy Policy Agreement <span className="text-red-500">*</span>
                </label>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent-privacy"
                    checked={formData.consentPrivacy}
                    onChange={(e) =>
                      setFormData({ ...formData, consentPrivacy: e.target.checked })
                    }
                    className="mt-1 w-4 h-4 text-[#1E3A8A] border-[#E5E7EB] rounded focus:ring-[#1E3A8A]"
                    required
                  />
                  <label
                    htmlFor="consent-privacy"
                    className="text-xs text-[#4A5565] leading-5"
                  >
                    I have read and agree to the{" "}
                    <a href="/privacy-policy" className="text-[#1E3A8A] underline">
                      Privacy Policy
                    </a>{" "}
                    and understand how my data will be used.
                  </label>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2.5 pt-3.5">
              <Link
                to="/complete-profile"
                className="flex-1 py-3.5 rounded-[10px] border border-[#E5E7EB] font-semibold text-base text-[#333] text-center hover:bg-gray-50 transition-colors"
              >
                Back
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[10px] font-semibold text-base text-white disabled:opacity-70 disabled:cursor-not-allowed transition-opacity"
                style={{
                  background: "linear-gradient(180deg, #1E3A8A 0%, #0F766E 100%)",
                }}
              >
                {isSubmitting ? "Submitting..." : "Complete Verification"}
                {!isSubmitting && (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.16699 10H15.8337"
                      stroke="white"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 4.16602L15.8333 9.99935L10 15.8327"
                      stroke="white"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Help Text */}
        <p className="text-sm text-[#4A5565] text-center w-full">
          Need help? Contact{" "}
          <a
            href="mailto:support@fairsay.com"
            className="text-[#1E3A8A] underline hover:text-[#0F766E]"
          >
            support@fairsay.com
          </a>
        </p>
      </div>
    </div>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import StepIndicator from "../components/StepIndicator";
import { useAppContext } from "../context/AppContext";

const BG_IMAGE =
  "https://cdn.builder.io/api/v1/image/assets%2F40ba842052b14f65b01728244d7b3248%2F81332e25d9d740ffbec61ecdc30601f5";

export default function EmployeeVerification() {
  const navigate = useNavigate();
  const { updateUser } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    selfDeclaration: "",
    consentData: false,
    privacyAgreement: false,
  });
  const [uploadedFile, setUploadedFile] = useState(null);

  const steps = [
    { number: 1, label: "Account", status: "completed" },
    { number: 2, label: "Profile", status: "completed" },
    { number: 3, label: "Verification", status: "current" },
  ];

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Verification data:", formData, uploadedFile);

    const success = await updateUser({
      declaration: formData.selfDeclaration,
      verification_status: 'pending'
    });

    setIsSubmitting(false);

    if (success) {
      navigate("/account-success");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-8">
      <img
        src={BG_IMAGE}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 w-full max-w-[640px] flex flex-col gap-8">
        {/* Logo */}
        <Logo variant="light" />

        {/* Progress Stepper */}
        <StepIndicator steps={steps} variant="dark" />

        {/* Verification Form Card */}
        <div className="bg-white rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="font-poppins font-bold text-[30px] leading-9 text-fairsay-gray-900 mb-2">
              Employee Verification
            </h1>
            <p className="font-inter text-base leading-6 text-fairsay-gray-500">
              Verify your employment status to access all features
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Self Declaration */}
            <div className="space-y-2">
              <label
                htmlFor="selfDeclaration"
                className="font-inter font-semibold text-sm leading-5 text-fairsay-gray-900"
              >
                Self-Declaration <span className="text-red-500">*</span>
              </label>
              <textarea
                id="selfDeclaration"
                value={formData.selfDeclaration}
                onChange={(e) =>
                  setFormData({ ...formData, selfDeclaration: e.target.value })
                }
                placeholder="I declare that I am currently employed by [Company Name] in the position of [Job Title]. I u"
                rows={4}
                className="w-full px-4 py-3 font-inter text-base border-[1.6px] border-fairsay-gray-200 rounded-[10px] placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:ring-2 focus:ring-fairsay-blue focus:border-transparent resize-none"
                required
              />
              <p className="font-inter text-xs text-fairsay-gray-400">
                Please confirm your employment status in your own words
              </p>
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <label className="font-inter font-semibold text-sm leading-5 text-fairsay-gray-900">
                Upload Proof of Employment <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-fairsay-gray-200 rounded-[10px] p-8 text-center hover:border-fairsay-blue transition-colors">
                <input
                  type="file"
                  id="fileUpload"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  required={!uploadedFile}
                />
                <label
                  htmlFor="fileUpload"
                  className="cursor-pointer flex flex-col items-center gap-3"
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24 32V16M24 16L18 22M24 16L30 22"
                      stroke="#99A1AF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M38 28V38C38 38.5304 37.7893 39.0391 37.4142 39.4142C37.0391 39.7893 36.5304 40 36 40H12C11.4696 40 10.9609 39.7893 10.5858 39.4142C10.2107 39.0391 10 38.5304 10 38V28"
                      stroke="#99A1AF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div>
                    <p className="font-inter text-base text-fairsay-gray-900">
                      <span className="text-fairsay-blue font-semibold">
                        Drag and drop your file here, or
                      </span>
                    </p>
                    <p className="font-inter text-base text-fairsay-blue font-semibold">
                      browse files
                    </p>
                  </div>
                  {uploadedFile && (
                    <p className="font-inter text-sm text-fairsay-teal font-semibold">
                      ✓ {uploadedFile.name}
                    </p>
                  )}
                  <p className="font-inter text-xs text-fairsay-gray-400 mt-2">
                    Supported formats: PDF, JPG, PNG, DOC (Max 10MB)
                  </p>
                  <p className="font-inter text-xs text-fairsay-gray-400">
                    Examples: Employee ID, Company badge, Offer letter, Pay stub
                  </p>
                </label>
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="bg-[#ECFDF5] border-l-4 border-fairsay-teal p-4 rounded">
              <p className="font-inter text-sm leading-5 text-fairsay-gray-900">
                <span className="font-semibold">Your Privacy is Protected:</span>{" "}
                All uploaded documents are encrypted and securely stored. Only
                authorized personnel can access verification materials, and they
                are never shared with third parties.
              </p>
            </div>

            {/* Consent Checkboxes */}
            <div className="space-y-4">
              {/* Data Processing Consent */}
              <div className="space-y-2">
                <label className="font-inter font-semibold text-sm leading-5 text-fairsay-gray-900">
                  Consent to Data Processing <span className="text-red-500">*</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentData}
                    onChange={(e) =>
                      setFormData({ ...formData, consentData: e.target.checked })
                    }
                    className="w-4 h-4 mt-0.5 rounded border-fairsay-gray-200 text-fairsay-blue focus:ring-fairsay-blue"
                    required
                  />
                  <span className="font-inter text-sm leading-5 text-fairsay-gray-500">
                    I consent to the processing of my personal information for the
                    purpose of employment verification and complaint management in
                    accordance with applicable data protection laws.
                  </span>
                </label>
              </div>

              {/* Privacy Policy Agreement */}
              <div className="space-y-2">
                <label className="font-inter font-semibold text-sm leading-5 text-fairsay-gray-900">
                  Privacy Policy Agreement <span className="text-red-500">*</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.privacyAgreement}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        privacyAgreement: e.target.checked,
                      })
                    }
                    className="w-4 h-4 mt-0.5 rounded border-fairsay-gray-200 text-fairsay-blue focus:ring-fairsay-blue"
                    required
                  />
                  <span className="font-inter text-sm leading-5 text-fairsay-gray-500">
                    I have read and agree to the{" "}
                    <a
                      href="#"
                      className="text-fairsay-blue font-semibold hover:underline"
                    >
                      Privacy Policy
                    </a>{" "}
                    regarding the collection, use, and storage of my data.
                  </span>
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-3">
              <button
                type="button"
                onClick={() => navigate("/complete-profile")}
                className="flex-1 h-[51px] flex items-center justify-center rounded-[10px] border-[1.6px] border-fairsay-gray-200 font-inter font-semibold text-base leading-6 text-fairsay-gray-900 hover:bg-fairsay-gray-100 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-[51px] flex items-center justify-center gap-2 rounded-[10px] bg-gradient-to-b from-fairsay-blue to-fairsay-teal font-inter font-semibold text-base leading-6 text-white hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit for Verification"}
                {!isSubmitting && (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.16602 10H15.8327"
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
      </div>
    </div>
  );
}

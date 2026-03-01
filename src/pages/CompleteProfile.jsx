import Logo from "../components/Logo";
import StepIndicator from "../components/StepIndicator";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { APP_NAME } from "../utils/constants";

export default function CompleteProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobTitle: "",
    department: "",
    companyName: "",
    phoneNumber: "",
    location: "",
  });

  const steps = [
    { number: 1, label: "Account Created", status: "completed" },
    { number: 2, label: "Profile", status: "current" },
    { number: 3, label: "Verification", status: "pending" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/employee-verification");
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center px-4 py-7"
      style={{
        background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
      }}
    >
      <div className="w-full max-w-[1020px] flex flex-col items-start gap-7">
        {/* Logo */}
        <div className="flex items-center justify-center w-full gap-2">
                   <div className="w-10 h-10"><Logo /></div>
                 </div>

        {/* Step Indicator */}
        <StepIndicator steps={steps} />

        {/* Main Card */}
        <div className="w-full rounded-2xl bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] p-7">
          <div className="mb-7 text-center">
            <h1 className="font-poppins font-bold text-[27px] leading-[32px] text-[#333] mb-2">
              Complete Your Profile
            </h1>
            <p className="text-[#4A5565] text-base leading-6">
              Tell us a bit about yourself and your workplace
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Job Title and Department */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Job Title */}
            <div>
              <label className="block text-[#333] text-sm font-medium mb-2">
                Job Title <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                >
                  <path
                    d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z"
                    fill="#9CA3AF"
                  />
                  <path
                    d="M10 12.5C5.16667 12.5 1.25 14.4167 1.25 16.6667V20H18.75V16.6667C18.75 14.4167 14.8333 12.5 10 12.5Z"
                    fill="#9CA3AF"
                  />
                </svg>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, jobTitle: e.target.value })
                  }
                  placeholder="e.g., Software Engineer, Sales Manager"
                  className="w-full pl-11 pr-4 py-[11px] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent text-[#333] placeholder:text-[#9CA3AF]"
                  required
                />
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="block text-[#333] text-sm font-medium mb-2">
                Department{" "}
                <span className="text-[#9CA3AF] font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                >
                  <path
                    d="M3 3H9V9H3V3Z"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11 3H17V9H11V3Z"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 11H9V17H3V11Z"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11 11H17V17H11V11Z"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  placeholder="e.g., Engineering, Human Resources"
                  className="w-full pl-11 pr-4 py-[11px] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent text-[#333] placeholder:text-[#9CA3AF]"
                />
              </div>
            </div>
            </div>

            {/* Company Name and Phone Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Company Name */}
            <div>
              <label className="block text-[#333] text-sm font-medium mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                >
                  <path
                    d="M3 18V7L10 2L17 7V18H12V13H8V18H3Z"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  placeholder="Your company name"
                  className="w-full pl-11 pr-4 py-[11px] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent text-[#333] placeholder:text-[#9CA3AF]"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-[#333] text-sm font-medium mb-2">
                Phone Number{" "}
                <span className="text-[#9CA3AF] font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                >
                  <path
                    d="M18 13.9201V16.4201C18.0011 16.6486 17.9441 16.8743 17.8325 17.0771C17.7209 17.2799 17.5573 17.4538 17.3561 17.5849C17.1549 17.7159 16.9224 17.8002 16.6802 17.8306C16.4381 17.861 16.1927 17.8367 15.962 17.7601C13.4006 16.9488 11.0914 15.5175 9.23297 13.5901C7.50385 11.8148 6.22509 9.63739 5.50297 7.24012C5.42554 7.00883 5.40116 6.76275 5.43177 6.52003C5.46239 6.27731 5.54706 6.04449 5.68016 5.84339C5.81326 5.64229 5.99129 5.47909 6.20162 5.36852C6.41195 5.25794 6.64769 5.20328 6.88697 5.20012H9.38697C9.7868 5.19636 10.1737 5.33503 10.472 5.58969C10.7703 5.84436 10.9583 6.19875 11.0008 6.58012C11.0793 7.34049 11.2505 8.08938 11.512 8.81012C11.6267 9.11423 11.6467 9.44644 11.5692 9.76256C11.4918 10.0787 11.3204 10.3648 11.077 10.5851L9.99697 11.6651C11.5635 13.4636 13.5705 15.4706 15.369 17.0371L16.449 15.9571C16.6692 15.7137 16.9553 15.5423 17.2715 15.4648C17.5876 15.3874 17.9198 15.4074 18.224 15.5221C18.9447 15.7836 19.6936 15.9548 20.454 16.0331C20.8396 16.0762 21.1974 16.2673 21.4517 16.5702C21.7059 16.8731 21.8409 17.2655 21.8319 17.6681L18 13.9201Z"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-11 pr-4 py-[11px] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent text-[#333] placeholder:text-[#9CA3AF]"
                />
              </div>
            </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-[#333] text-sm font-medium mb-2">
                Location{" "}
                <span className="text-[#9CA3AF] font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                >
                  <path
                    d="M17.5 8.33333C17.5 14.1667 10 19.1667 10 19.1667C10 19.1667 2.5 14.1667 2.5 8.33333C2.5 6.34421 3.29018 4.4366 4.6967 3.0301C6.10322 1.62357 8.01088 0.833336 10 0.833336C11.9891 0.833336 13.8968 1.62357 15.3033 3.0301C16.7098 4.4366 17.5 6.34421 17.5 8.33333Z"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 10.8333C11.3807 10.8333 12.5 9.71405 12.5 8.33333C12.5 6.95262 11.3807 5.83333 10 5.83333C8.61929 5.83333 7.5 6.95262 7.5 8.33333C7.5 9.71405 8.61929 10.8333 10 10.8333Z"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="City, State/Country"
                  className="w-full pl-11 pr-4 py-[11px] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent text-[#333] placeholder:text-[#9CA3AF]"
                />
              </div>
            </div>

            {/* Info Box */}
            <div className="rounded border-l-4 border-[#1E3A8A] bg-[#EFF6FF] p-4">
              <p className="text-sm leading-5 text-[#1E3A8A]">
                <span className="font-semibold">Why we need this:</span> Your
                profile information helps us provide relevant guidance and ensures
                complaints are properly documented.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2.5 pt-3.5">
              <Link
                to="/account-success"
                className="flex-1 py-3.5 rounded-[10px] border border-[#E5E7EB] font-semibold text-sm text-[#333] text-center hover:bg-gray-50 transition-colors"
              >
                Back
              </Link>
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[10px] font-semibold text-sm text-white"
                style={{
                  background: "linear-gradient(180deg, #1E3A8A 0%, #0F766E 100%)",
                }}
              >
                Continue
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
              </button>
            </div>
          </form>
        </div>

        {/* Skip Link */}
        <div className="w-full text-center">
          <Link
            to="/employee-verification"
            className="text-[#4A5565] text-sm hover:text-[#1E3A8A] transition-colors inline-flex items-center gap-1"
          >
            Skip for now
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.33301 8H12.6663"
                stroke="currentColor"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 3.33398L12.6667 8.00065L8 12.6673"
                stroke="currentColor"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

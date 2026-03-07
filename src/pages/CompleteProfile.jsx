import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import StepIndicator from "../components/StepIndicator";
import { useAppContext } from "../context/AppContext";
import { APP_STEPS } from "../utils/constants";

const BG_IMAGE =
  "https://cdn.builder.io/api/v1/image/assets%2F40ba842052b14f65b01728244d7b3248%2F81332e25d9d740ffbec61ecdc30601f5";

export default function CompleteProfile() {
  const navigate = useNavigate();
  const { updateUser } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false); 
  

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
    { number: 3, label: "Verification", status: "upcoming" },
  ];


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      job_title: formData.jobTitle,
      department: formData.department,
      company_name: formData.companyName,
      phone: formData.phoneNumber,
      location: formData.location,
      profile_completed: true 
    };

    const success = await updateUser(payload);

    setIsSubmitting(false);

    if (success) {
      navigate(APP_STEPS.EMPLOYEE_VERIFICATION);
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

        {/* Profile Form Card */}
        <div className="bg-white rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="font-poppins font-bold text-[30px] leading-9 text-fairsay-gray-900 mb-2">
              Complete Your Profile
            </h1>
            <p className="font-inter text-base leading-6 text-fairsay-gray-500">
              Tell us a bit about yourself and your workplace
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Job Title */}
            <div className="space-y-2">
              <label
                htmlFor="jobTitle"
                className="font-inter font-semibold text-sm leading-5 text-fairsay-gray-900"
              >
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                id="jobTitle"
                type="text"
                value={formData.jobTitle}
                onChange={(e) =>
                  setFormData({ ...formData, jobTitle: e.target.value })
                }
                placeholder="e.g., Software Engineer, Sales Manager"
                className="w-full h-[51px] px-4 py-3 font-inter text-base border-[1.6px] border-fairsay-gray-200 rounded-[10px] placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:ring-2 focus:ring-fairsay-blue focus:border-transparent"
                required
              />
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label
                htmlFor="department"
                className="font-inter font-semibold text-sm leading-5 text-fairsay-gray-900"
              >
                Department{" "}
                <span className="font-normal text-fairsay-gray-400">
                  (Optional)
                </span>
              </label>
              <input
                id="department"
                type="text"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                placeholder="e.g., Engineering, Human Resources"
                className="w-full h-[51px] px-4 py-3 font-inter text-base border-[1.6px] border-fairsay-gray-200 rounded-[10px] placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:ring-2 focus:ring-fairsay-blue focus:border-transparent"
              />
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <label
                htmlFor="companyName"
                className="font-inter font-semibold text-sm leading-5 text-fairsay-gray-900"
              >
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                id="companyName"
                type="text"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                placeholder="e.g., Acme Corporation"
                className="w-full h-[51px] px-4 py-3 font-inter text-base border-[1.6px] border-fairsay-gray-200 rounded-[10px] placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:ring-2 focus:ring-fairsay-blue focus:border-transparent"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label
                htmlFor="phoneNumber"
                className="font-inter font-semibold text-sm leading-5 text-fairsay-gray-900"
              >
                Phone Number{" "}
                <span className="font-normal text-fairsay-gray-400">
                  (Optional)
                </span>
              </label>
              <input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                placeholder="+1 (555) 123-4567"
                className="w-full h-[51px] px-4 py-3 font-inter text-base border-[1.6px] border-fairsay-gray-200 rounded-[10px] placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:ring-2 focus:ring-fairsay-blue focus:border-transparent"
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label
                htmlFor="location"
                className="font-inter font-semibold text-sm leading-5 text-fairsay-gray-900"
              >
                Location{" "}
                <span className="font-normal text-fairsay-gray-400">
                  (Optional)
                </span>
              </label>
              <input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="e.g., New York, NY"
                className="w-full h-[51px] px-4 py-3 font-inter text-base border-[1.6px] border-fairsay-gray-200 rounded-[10px] placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:ring-2 focus:ring-fairsay-blue focus:border-transparent"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-3">
              <button
                type="button"
                onClick={() => navigate("/sign-up")}
                className="flex-1 h-[51px] flex items-center justify-center rounded-[10px] border-[1.6px] border-fairsay-gray-200 font-inter font-semibold text-base leading-6 text-fairsay-gray-900 hover:bg-fairsay-gray-100 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-[51px] flex items-center justify-center gap-2 rounded-[10px] bg-gradient-to-b from-fairsay-blue to-fairsay-teal font-inter font-semibold text-base leading-6 text-white hover:opacity-90 transition-opacity disabled:opacity-70"
              >
                {isSubmitting ? "Saving..." : "Continue"}
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
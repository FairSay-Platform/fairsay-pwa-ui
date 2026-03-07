import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { APP_STEPS } from "../utils/constants";

const BG_IMAGE =
  "https://cdn.builder.io/api/v1/image/assets%2F40ba842052b14f65b01728244d7b3248%2F81332e25d9d740ffbec61ecdc30601f5";

export default function SignUp() {
  const navigate = useNavigate();
  const { showAlert, register } = useAppContext();
  const [alert, setAlert] = useState({ show: false, message: "", type: "error" });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);



const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    showAlert("Passwords do not match", "error");
    return;
  }

  if (!formData.agreeToTerms) {
    showAlert("You must agree to the terms to continue.", "error");
    return;
  }

  setAlert({ show: false, message: "", type: "error" });

  try {
    const result = await register(formData);
    
    if (result.success) {
      setAlert({ 
        show: true, 
        message: "Account created successfully! Please check your email.", 
        type: "success"
      });
      
      setTimeout(() => {
        navigate(APP_STEPS.VERIFY_NOTICE); 
      }, 3000);
    } else {
     
      setAlert({ 
        show: true, 
        message: result.message || "Registration failed. Please try again.", 
        type: "error"
      });
    }
  } catch (err) {
    setAlert({ 
      show: true, 
      message: "An unexpected error occurred. Please try again.", 
      type: "error"
    });
  }
};

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-10">
      {/* Background image */}
      <img
        src={BG_IMAGE}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[640px] flex flex-col items-stretch gap-8">
        {/* Logo */}
        <Logo variant="light" />

        {/* Sign Up Card */}
        <div className="bg-white rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="font-poppins font-bold text-[30px] leading-9 text-[#333] mb-2">
              Create Your Account
            </h1>
            <p className="font-inter text-base leading-6 text-[#4A5565]">
              Join FairSay to protect your workplace rights
            </p>
          </div>

          {/* Alert */}
          {alert.show && (
            <div className={`mb-6 p-4 rounded-lg text-sm font-medium border ${
              alert.type === 'error' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}>
              {alert.message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* First Name */}
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="font-inter font-semibold text-sm leading-5 text-[#333]"
                >
                  First Name
                </label>
                <div className="relative">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-3 top-[15px] pointer-events-none"
                  >
                    <path
                      d="M10.0003 10C12.3016 10 14.167 8.13452 14.167 5.83325C14.167 3.53198 12.3016 1.6665 10.0003 1.6665C7.69909 1.6665 5.83366 3.53198 5.83366 5.83325C5.83366 8.13452 7.69909 10 10.0003 10Z"
                      stroke="#99A1AF"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.1583 18.3335C17.1583 15.1085 13.95 12.5 10 12.5C6.04996 12.5 2.84163 15.1085 2.84163 18.3335"
                      stroke="#99A1AF"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    placeholder="John"
                    className="w-full h-[51px] pl-11 pr-4 font-inter text-base border-[1.6px] border-[#E5E7EB] rounded-[10px] placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:ring-2 focus:ring-fairsay-blue focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="font-inter font-semibold text-sm leading-5 text-[#333]"
                >
                  Last Name
                </label>
                <div className="relative">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-3 top-[15px] pointer-events-none"
                  >
                    <path
                      d="M10.0003 10C12.3016 10 14.167 8.13452 14.167 5.83325C14.167 3.53198 12.3016 1.6665 10.0003 1.6665C7.69909 1.6665 5.83366 3.53198 5.83366 5.83325C5.83366 8.13452 7.69909 10 10.0003 10Z"
                      stroke="#99A1AF"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.1583 18.3335C17.1583 15.1085 13.95 12.5 10 12.5C6.04996 12.5 2.84163 15.1085 2.84163 18.3335"
                      stroke="#99A1AF"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    placeholder="Divine"
                    className="w-full h-[51px] pl-11 pr-4 font-inter text-base border-[1.6px] border-[#E5E7EB] rounded-[10px] placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:ring-2 focus:ring-fairsay-blue focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="font-inter font-semibold text-sm leading-5 text-[#333]"
              >
                Email address
              </label>
              <div className="relative">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-[15px] pointer-events-none"
                >
                  <path
                    d="M18.3327 5.83398L10.8402 10.6065C10.5859 10.7542 10.2971 10.8319 10.0031 10.8319C9.70907 10.8319 9.42027 10.7542 9.16602 10.6065L1.66602 5.83398"
                    stroke="#99A1AF"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.666 3.33398H3.33268C2.41221 3.33398 1.66602 4.08018 1.66602 5.00065V15.0007C1.66602 15.9211 2.41221 16.6673 3.33268 16.6673H16.666C17.5865 16.6673 18.3327 15.9211 18.3327 15.0007V5.00065C18.3327 4.08018 17.5865 3.33398 16.666 3.33398Z"
                    stroke="#99A1AF"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="you@example.com"
                  className="w-full h-[51px] pl-11 pr-4 font-inter text-base border-[1.6px] border-[#E5E7EB] rounded-[10px] placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:ring-2 focus:ring-fairsay-blue focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="font-inter font-semibold text-sm leading-5 text-[#333]"
              >
                Password
              </label>
              <div className="relative">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-[15px] pointer-events-none"
                >
                  <g clipPath="url(#clip_lock_pw)">
                    <path
                      d="M15.8333 9.16602H4.16667C3.24619 9.16602 2.5 9.91221 2.5 10.8327V16.666C2.5 17.5865 3.24619 18.3327 4.16667 18.3327H15.8333C16.7538 18.3327 17.5 17.5865 17.5 16.666V10.8327C17.5 9.91221 16.7538 9.16602 15.8333 9.16602Z"
                      stroke="#99A1AF"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.83398 9.16602V5.83268C5.83398 4.72761 6.27297 3.66781 7.05437 2.8864C7.83577 2.105 8.89558 1.66602 10.0007 1.66602C11.1057 1.66602 12.1655 2.105 12.9469 2.8864C13.7283 3.66781 14.1673 4.72761 14.1673 5.83268V9.16602"
                      stroke="#99A1AF"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip_lock_pw">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Create Strong Password"
                  className="w-full h-[51px] pl-11 pr-12 font-inter text-base border-[1.6px] border-[#E5E7EB] rounded-[10px] placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:ring-2 focus:ring-fairsay-blue focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[15px] focus:outline-none"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.7181 10.2908C1.64865 10.1037 1.64865 9.89788 1.7181 9.71079C2.39452 8.07067 3.5427 6.66832 5.01708 5.68154C6.49146 4.69475 8.22564 4.16797 9.99977 4.16797C11.7739 4.16797 13.5081 4.69475 14.9825 5.68154C16.4568 6.66832 17.605 8.07067 18.2814 9.71079C18.3509 9.89788 18.3509 10.1037 18.2814 10.2908C17.605 11.9309 16.4568 13.3333 14.9825 14.32C13.5081 15.3068 11.7739 15.8336 9.99977 15.8336C8.22564 15.8336 6.49146 15.3068 5.01708 14.32C3.5427 13.3333 2.39452 11.9309 1.7181 10.2908Z" stroke="#99A1AF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#99A1AF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="font-inter font-semibold text-sm leading-5 text-[#333]"
              >
                Confirm Password
              </label>
              <div className="relative">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-[15px] pointer-events-none"
                >
                  <g clipPath="url(#clip_lock_confirm)">
                    <path
                      d="M15.8333 9.16602H4.16667C3.24619 9.16602 2.5 9.91221 2.5 10.8327V16.666C2.5 17.5865 3.24619 18.3327 4.16667 18.3327H15.8333C16.7538 18.3327 17.5 17.5865 17.5 16.666V10.8327C17.5 9.91221 16.7538 9.16602 15.8333 9.16602Z"
                      stroke="#99A1AF"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.83398 9.16602V5.83268C5.83398 4.72761 6.27297 3.66781 7.05437 2.8864C7.83577 2.105 8.89558 1.66602 10.0007 1.66602C11.1057 1.66602 12.1655 2.105 12.9469 2.8864C13.7283 3.66781 14.1673 4.72761 14.1673 5.83268V9.16602"
                      stroke="#99A1AF"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip_lock_confirm">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  placeholder="Re-enter Password"
                  className="w-full h-[51px] pl-11 pr-12 font-inter text-base border-[1.6px] border-[#E5E7EB] rounded-[10px] placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:ring-2 focus:ring-fairsay-blue focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-[15px] focus:outline-none"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.7181 10.2908C1.64865 10.1037 1.64865 9.89788 1.7181 9.71079C2.39452 8.07067 3.5427 6.66832 5.01708 5.68154C6.49146 4.69475 8.22564 4.16797 9.99977 4.16797C11.7739 4.16797 13.5081 4.69475 14.9825 5.68154C16.4568 6.66832 17.605 8.07067 18.2814 9.71079C18.3509 9.89788 18.3509 10.1037 18.2814 10.2908C17.605 11.9309 16.4568 13.3333 14.9825 14.32C13.5081 15.3068 11.7739 15.8336 9.99977 15.8336C8.22564 15.8336 6.49146 15.3068 5.01708 14.32C3.5427 13.3333 2.39452 11.9309 1.7181 10.2908Z" stroke="#99A1AF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#99A1AF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Terms Agreement */}
            <label className="flex items-start gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) =>
                  setFormData({ ...formData, agreeToTerms: e.target.checked })
                }
                className="w-4 h-4 mt-0.5 rounded border-[#E5E7EB] text-fairsay-blue focus:ring-fairsay-blue"
                required
              />
              <span className="font-inter text-sm leading-5 text-[#4A5565]">
                I agree to the{" "}
                <a href="#" className="text-fairsay-blue font-semibold hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-fairsay-blue font-semibold hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>

            {/* Get Started Button */}
            <button
              type="submit"
              className="w-full h-[51px] flex items-center justify-center gap-2 rounded-[10px] bg-gradient-to-b from-fairsay-blue to-fairsay-teal font-inter font-semibold text-base leading-6 text-white hover:opacity-90 transition-opacity"
            >
              Get started
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.16602 10H15.8327" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 4.16602L15.8333 9.99935L10 15.8327" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>

          {/* Whistleblow link */}
          <p className="mt-5 text-center font-inter text-sm text-[#4A5565]">
            Want to whistleblow?{" "}
            <Link to="/whistleblowing" className="text-fairsay-blue font-semibold hover:underline">
              Here
            </Link>
          </p>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5E7EB]" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white font-inter text-sm leading-5 text-[#6A7282]">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Sign In Link */}
          <Link
            to="/sign-in"
            className="w-full h-[51px] flex items-center justify-center rounded-[10px] border-[1.6px] border-fairsay-blue font-inter font-semibold text-base leading-6 text-fairsay-blue hover:bg-fairsay-blue/5 transition-colors"
          >
            Sign in
          </Link>
        </div>

        {/* Back to Home */}
        <Link
          to="/"
          className="font-inter text-sm leading-5 text-white/80 text-center hover:text-white transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

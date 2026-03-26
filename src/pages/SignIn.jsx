import Logo from '../components/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { APP_STEPS } from '../utils/constants';

const BG_IMAGE =
  "https://cdn.builder.io/api/v1/image/assets%2F40ba842052b14f65b01728244d7b3248%2F81332e25d9d740ffbec61ecdc30601f5";

export default function SignIn() {
  const navigate = useNavigate();
  const { login, devLogin } = useAppContext();
  const [alert, setAlert] = useState({ show: false, message: "", type: "error"});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ show: false, message: "", type: "error" });
    setIsSubmitting(true);

    const result = await login(formData.email, formData.password);
      
    if (result.success) {
      navigate(result.redirectTo || APP_STEPS.DASHBOARD);
    } else {
      setAlert({ show: true, message: result.message || "Invalid credentials", type: "error" });
      setIsSubmitting(false); 
    }
  };

  // Quick login for development
  const handleQuickLogin = (persona) => {
    const res = devLogin(persona);
    if (res.success) {
      if (persona === 'admin') {
        navigate(APP_STEPS.ADMIN_DASHBOARD);
      } else if (persona === 'whistleblower') {
        navigate('/whistleblowing');
      } else {
        navigate(APP_STEPS.DASHBOARD);
      }
    } 
  }

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
      <div className="relative z-10 w-full max-w-[448px] flex flex-col items-stretch gap-8">
        {/* Logo */}
        <Logo variant="light" />

        {/* Sign In Card */}
        <div className="bg-white rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="font-poppins font-bold text-[30px] leading-9 text-[#333] mb-2">
              Welcome Back
            </h1>
            <p className="font-inter text-base leading-6 text-[#4A5565]">
              Sign in to your account to continue
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
            {/* Email Input */}
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
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full h-[51px] pl-11 pr-4 font-inter text-base border-[1.6px] border-[#E5E7EB] rounded-[10px] placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:ring-2 focus:ring-fairsay-blue focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
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
                  <g clipPath="url(#clip_lock_signin)">
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
                    <clipPath id="clip_lock_signin">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter Password"
                  className="w-full h-[51px] pl-11 pr-12 font-inter text-base border-[1.6px] border-[#E5E7EB] rounded-[10px] placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:ring-2 focus:ring-fairsay-blue focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[15px] focus:outline-none"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.7181 10.2908C1.64865 10.1037 1.64865 9.89788 1.7181 9.71079C2.39452 8.07067 3.5427 6.66832 5.01708 5.68154C6.49146 4.69475 8.22564 4.16797 9.99977 4.16797C11.7739 4.16797 13.5081 4.69475 14.9825 5.68154C16.4568 6.66832 17.605 8.07067 18.2814 9.71079C18.3509 9.89788 18.3509 10.1037 18.2814 10.2908C17.605 11.9309 16.4568 13.3333 14.9825 14.32C13.5081 15.3068 11.7739 15.8336 9.99977 15.8336C8.22564 15.8336 6.49146 15.3068 5.01708 14.32C3.5427 13.3333 2.39452 11.9309 1.7181 10.2908Z"
                      stroke="#99A1AF"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
                      stroke="#99A1AF"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="w-4 h-4 rounded border-[#E5E7EB] text-fairsay-blue focus:ring-fairsay-blue"
                />
                <span className="font-inter text-sm leading-5 text-[#4A5565]">
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="font-inter font-semibold text-sm leading-5 text-fairsay-blue hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-[51px] flex items-center justify-center gap-2 rounded-[10px] bg-fairsay-blue font-inter font-semibold text-base leading-6 text-white px-4 py-3.5 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-opacity disabled:opacity-70"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
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
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5E7EB]" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white font-inter text-sm leading-5 text-[#6A7282]">
                Don't have an account?
              </span>
            </div>
          </div>

          {/* Create Account Button */}
          <Link
            to="/sign-up"
            className="w-full h-[51px] flex items-center justify-center rounded-[10px] border-[1.6px] border-fairsay-blue font-inter font-semibold text-base leading-6 text-fairsay-blue hover:bg-fairsay-blue/5 transition-colors"
          >
            Create an account
          </Link>

<div className="mt-4 text-center">
  <p className="font-inter text-sm text-gray-500">
    Didn't get a verification email?{" "}
    <Link 
      to={APP_STEPS.VERIFY_NOTICE} 
      className="text-fairsay-blue font-semibold hover:underline"
    >
      Resend link
    </Link>
  </p>
</div>

          {/* QUICK LOGIN SECTION (DEV ONLY) */}
          {import.meta.env.DEV && (
            <div className="mt-8 pt-6 border-t border-dashed border-gray-200">
              <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-3 text-center">🛠️ Developer Quick Login</p>
              <div className="grid grid-cols-3 gap-2">
                <button 
                  type="button"
                  onClick={() => handleQuickLogin('admin')}
                  className="px-2 py-2 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg text-[11px] font-bold text-purple-700 transition-colors"
                >
                  Admin
                </button>
                <button 
                  type="button"
                  onClick={() => handleQuickLogin('whistleblower')}
                  className="px-2 py-2 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg text-[11px] font-bold text-red-700 transition-colors"
                >
                  Whistleblower
                </button>
                <button 
                  type="button"
                  onClick={() => handleQuickLogin('newbie')}
                  className="px-2 py-2 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg text-[11px] font-bold text-green-700 transition-colors"
                >
                  New User
                </button>
              </div>
            </div>
          )}
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
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Logo from "../components/Logo";
import api from "../services/api";

const BG_IMAGE =
  "https://cdn.builder.io/api/v1/image/assets%2F40ba842052b14f65b01728244d7b3248%2F81332e25d9d740ffbec61ecdc30601f5";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); 

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    //Basic Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      setIsSubmitting(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setIsSubmitting(false);
      return;
    }

    if (!token) {
      setError("Missing reset token. Please request a new password reset link.");
      setIsSubmitting(false);
      return;
    }

    try {
      await api.post("/auth/reset-password", { 
        token, 
        newPassword: password 
      });
      
      setSuccess(true);
    } catch (err) {
      console.error("Reset-Password request failed", err);
      setError(
        err.response?.data?.message || "Failed to reset password. The link may have expired."
      );
    } finally {
      setIsSubmitting(false);
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

      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[480px] flex flex-col items-stretch gap-4">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] p-8">
          
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Logo size={24} />
          </div>

          {/* Conditional Rendering: Success vs Form */}
          {success ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className="font-poppins font-bold text-[28px] leading-9 text-[#333] mb-2">
                Password Reset!
              </h1>
              <p className="font-inter text-base leading-6 text-[#4A5565] mb-8">
                Your password has been successfully updated. You can now use your new password to log in.
              </p>
              <button
                onClick={() => navigate("/sign-in")}
                className="w-full h-[51px] flex items-center justify-center rounded-[10px] bg-fairsay-blue font-inter font-semibold text-base leading-6 text-white hover:opacity-90 transition-opacity"
              >
                Go to Sign In
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-7">
                <h1 className="font-poppins font-bold text-[28px] leading-9 text-[#333] mb-2">
                  Set New Password
                </h1>
                <p className="font-inter text-base leading-6 text-[#4A5565]">
                  Your new password must be different from previously used passwords.
                </p>
              </div>

              {/* Display Error Messages */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* New Password field */}
                <div className="space-y-2">
                  <label className="font-inter font-semibold text-sm leading-5 text-[#333]">
                    New Password
                  </label>
                  <div className="relative">
                    {/* Lock Icon */}
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-[15px] pointer-events-none">
                      <path d="M15.8333 9.16602H4.16667C3.24619 9.16602 2.5 9.91221 2.5 10.8327V16.666C2.5 17.5865 3.24619 18.3327 4.16667 18.3327H15.8333C16.7538 18.3327 17.5 17.5865 17.5 16.666V10.8327C17.5 9.91221 16.7538 9.16602 15.8333 9.16602Z" stroke="#99A1AF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5.83398 9.16602V5.83268C5.83398 4.72761 6.27297 3.66781 7.05437 2.8864C7.83577 2.105 8.89558 1.66602 10.0007 1.66602C11.1057 1.66602 12.1655 2.105 12.9469 2.8864C13.7283 3.66781 14.1673 4.72761 14.1673 5.83268V9.16602" stroke="#99A1AF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      disabled={isSubmitting}
                      className="w-full h-[51px] pl-11 pr-4 font-inter text-base border-[1.6px] border-[#E5E7EB] rounded-[10px] placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:ring-2 focus:ring-fairsay-blue focus:border-transparent disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Confirm Password field */}
                <div className="space-y-2">
                  <label className="font-inter font-semibold text-sm leading-5 text-[#333]">
                    Confirm Password
                  </label>
                  <div className="relative">
                     {/* Lock Icon */}
                     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-[15px] pointer-events-none">
                      <path d="M15.8333 9.16602H4.16667C3.24619 9.16602 2.5 9.91221 2.5 10.8327V16.666C2.5 17.5865 3.24619 18.3327 4.16667 18.3327H15.8333C16.7538 18.3327 17.5 17.5865 17.5 16.666V10.8327C17.5 9.91221 16.7538 9.16602 15.8333 9.16602Z" stroke="#99A1AF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5.83398 9.16602V5.83268C5.83398 4.72761 6.27297 3.66781 7.05437 2.8864C7.83577 2.105 8.89558 1.66602 10.0007 1.66602C11.1057 1.66602 12.1655 2.105 12.9469 2.8864C13.7283 3.66781 14.1673 4.72761 14.1673 5.83268V9.16602" stroke="#99A1AF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      disabled={isSubmitting}
                      className="w-full h-[51px] pl-11 pr-4 font-inter text-base border-[1.6px] border-[#E5E7EB] rounded-[10px] placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:ring-2 focus:ring-fairsay-blue focus:border-transparent disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-[51px] flex items-center justify-center rounded-[10px] bg-fairsay-blue font-inter font-semibold text-base leading-6 text-white hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
                >
                  {isSubmitting ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Security note */}
        <p className="text-center font-inter text-xs text-white/70 flex items-center justify-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip_lock_rp)">
              <path d="M15.8333 9.16602H4.16667C3.24619 9.16602 2.5 9.91221 2.5 10.8327V16.666C2.5 17.5865 3.24619 18.3327 4.16667 18.3327H15.8333C16.7538 18.3327 17.5 17.5865 17.5 16.666V10.8327C17.5 9.91221 16.7538 9.16602 15.8333 9.16602Z" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5.83398 9.16602V5.83268C5.83398 4.72761 6.27297 3.66781 7.05437 2.8864C7.83577 2.105 8.89558 1.66602 10.0007 1.66602C11.1057 1.66602 12.1655 2.105 12.9469 2.8864C13.7283 3.66781 14.1673 4.72761 14.1673 5.83268V9.16602" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
              <clipPath id="clip_lock_rp">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Your connection is encrypted and secure
        </p>
      </div>
    </div>
  );
}
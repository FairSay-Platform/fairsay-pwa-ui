import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const BG_IMAGE =
  "https://cdn.builder.io/api/v1/image/assets%2F40ba842052b14f65b01728244d7b3248%2F81332e25d9d740ffbec61ecdc30601f5";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await api.post("/auth/forgot-password", { email });
      navigate("/check-email", { state: { email } });
    } catch (err) {
      console.error("Forgot-Password request failed", err);
      setError(
        err.response?.data?.message || "Failed to send link. Please check email and retry"
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
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[480px] flex flex-col items-stretch gap-4">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] p-8">
          {/* Logo inside card */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <svg
              width="32"
              height="32"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0"
            >
              <path
                d="M33.3327 21.6661C33.3327 29.9994 27.4993 34.1661 20.566 36.5828C20.203 36.7058 19.8086 36.6999 19.4493 36.5661C12.4993 34.1661 6.66602 29.9994 6.66602 21.6661V9.99945C6.66602 9.55742 6.84161 9.1335 7.15417 8.82094C7.46673 8.50838 7.89065 8.33278 8.33268 8.33278C11.666 8.33278 15.8327 6.33278 18.7327 3.79945C19.0858 3.49778 19.5349 3.33203 19.9993 3.33203C20.4638 3.33203 20.9129 3.49778 21.266 3.79945C24.1827 6.34945 28.3327 8.33278 31.666 8.33278C32.108 8.33278 32.532 8.50838 32.8445 8.82094C33.1571 9.1335 33.3327 9.55742 33.3327 9.99945V21.6661Z"
                stroke="#1E3A8A"
                strokeWidth="3.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-poppins font-bold text-2xl text-fairsay-blue">
              FairSay
            </span>
          </div>

          {/* Header */}
          <div className="text-center mb-7">
            <h1 className="font-poppins font-bold text-[28px] leading-9 text-[#333] mb-2">
              Forgot Password?
            </h1>
            <p className="font-inter text-base leading-6 text-[#4A5565]">
              No worries! Enter your email and we'll send you reset
              instructions.
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
            {/* Email field */}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  disabled={isSubmitting}
                  className="w-full h-[51px] pl-11 pr-4 font-inter text-base border-[1.6px] border-[#E5E7EB] rounded-[10px] placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:ring-2 focus:ring-fairsay-blue focus:border-transparent disabled:opacity-50"
                />
              </div>
            </div>

            {/* Send reset link button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-[51px] flex items-center justify-center rounded-[10px] bg-fairsay-blue font-inter font-semibold text-base leading-6 text-white hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send reset link"}
            </button>
          </form>

          {/* Back to Sign In */}
          <div className="mt-5 text-center">
            <Link
              to="/sign-in"
              className="inline-flex items-center gap-1.5 font-inter font-semibold text-sm text-fairsay-blue hover:underline"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.8327 10H4.16602"
                  stroke="#1E3A8A"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 15.8327L4.16602 9.99935L10 4.16602"
                  stroke="#1E3A8A"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Sign In
            </Link>
          </div>

          {/* OR divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5E7EB]" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white font-inter text-sm text-[#6A7282]">
                OR
              </span>
            </div>
          </div>

          {/* Warning box */}
          <div className="border border-[#F59E0B] bg-[#FFFBEB] rounded-[10px] p-4 mb-5">
            <p className="font-inter text-sm leading-5 text-[#92400E]">
              If you don't have access to your email, please contact your
              organization's administrator for assistance.
            </p>
          </div>

          {/* Don't have an account */}
          <p className="text-center font-inter text-sm text-[#4A5565]">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="font-semibold text-fairsay-blue hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Security note */}
        <p className="text-center font-inter text-xs text-white/70 flex items-center justify-center gap-1.5">
          <svg
            width="14"
            height="14"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip_lock_fp)">
              <path
                d="M15.8333 9.16602H4.16667C3.24619 9.16602 2.5 9.91221 2.5 10.8327V16.666C2.5 17.5865 3.24619 18.3327 4.16667 18.3327H15.8333C16.7538 18.3327 17.5 17.5865 17.5 16.666V10.8327C17.5 9.91221 16.7538 9.16602 15.8333 9.16602Z"
                stroke="white"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.83398 9.16602V5.83268C5.83398 4.72761 6.27297 3.66781 7.05437 2.8864C7.83577 2.105 8.89558 1.66602 10.0007 1.66602C11.1057 1.66602 12.1655 2.105 12.9469 2.8864C13.7283 3.66781 14.1673 4.72761 14.1673 5.83268V9.16602"
                stroke="white"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip_lock_fp">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Your data is encrypted and secure
        </p>
      </div>
    </div>
  );
}

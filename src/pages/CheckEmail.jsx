import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import api from "../services/api";

export default function CheckEmail() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { addNotification } = useAppContext();

  const email = searchParams.get("email") || location.state?.email || "your email address";
  const handleResend = async () => {
    try {
      // (Assuming you imported api and useAppContext for addNotification)
      await api.post("/auth/forgot-password", { email });
      addNotification("Email Sent!", "We just sent another reset link to your inbox.", "success");
    } catch (err) {
      addNotification("Error", "Failed to resend the email. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9]">
      <div className="w-full max-w-[480px]">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] p-8 sm:p-10">
          {/* Teal checkmark icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-fairsay-teal flex items-center justify-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M33.3333 12L16.6667 28.6667L6.66667 18.6667"
                  stroke="white"
                  strokeWidth="3.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="font-poppins font-bold text-[28px] leading-9 text-[#1A1A2E] mb-3">
              Check Your Email
            </h1>
            <p className="font-inter text-base leading-6 text-[#4A5565]">
              We've sent password reset instructions to
            </p>
            <p className="font-inter font-bold text-base text-fairsay-blue mt-1">
              {email}
            </p>
          </div>

          {/* Info box */}
          <div className="flex items-start gap-3 border-[1.6px] border-fairsay-blue rounded-[10px] bg-[#EFF6FF] p-4 mb-6">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0 mt-0.5"
            >
              <path
                d="M18.3327 5.83398L10.8402 10.6065C10.5859 10.7542 10.2971 10.8319 10.0031 10.8319C9.70907 10.8319 9.42027 10.7542 9.16602 10.6065L1.66602 5.83398"
                stroke="#1E3A8A"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.666 3.33398H3.33268C2.41221 3.33398 1.66602 4.08018 1.66602 5.00065V15.0007C1.66602 15.9211 2.41221 16.6673 3.33268 16.6673H16.666C17.5865 16.6673 18.3327 15.9211 18.3327 15.0007V5.00065C18.3327 4.08018 17.5865 3.33398 16.666 3.33398Z"
                stroke="#1E3A8A"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="font-inter text-sm leading-5 text-fairsay-blue">
              Click the link in the email to reset your password. The link will
              expire in 1 hour.
            </p>
          </div>

          {/* Back to sign in button */}
          <Link
            to="/sign-in"
            className="w-full h-[51px] flex items-center justify-center gap-2 rounded-[10px] bg-fairsay-blue font-inter font-semibold text-base leading-6 text-white hover:opacity-90 transition-opacity mb-4"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8327 10H4.16602"
                stroke="white"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 15.8327L4.16602 9.99935L10 4.16602"
                stroke="white"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to sign in
          </Link>

          {/* Resend link */}
          <p className="text-center font-inter text-sm font-semibold text-fairsay-blue mb-6">
            <button
              type="button" onClick={handleResend}
              className="hover:underline focus:outline-none"
            >
              Didn't receive the email? Resend
            </button>
          </p>

          {/* Divider */}
          <div className="border-t border-[#E5E7EB] mb-5" />

          {/* Spam note */}
          <p className="text-center font-inter text-sm text-[#6A7282]">
            Check your spam folder or{" "}
            <a
              href="mailto:support@fairsay.com"
              className="font-bold text-[#6A7282] hover:underline"
            >
              contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

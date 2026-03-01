import Logo from "../components/Logo";
import { Link, useLocation } from "react-router-dom";

export default function CheckEmail() {

  const location = useLocation();
  const email = location.state?.email || "Your email address"
  return (
    <div
      className="min-h-screen flex justify-center items-center px-4 py-7"
      style={{
        background: "linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)",
      }}
    >
      <div className="w-full max-w-[504px] flex flex-col items-center gap-7">
        {/* Logo */}
        <div className="flex items-center gap-2">
                            <div className="w-10 h-10"><Logo /></div>
                          </div>

        {/* Main Card */}
        <div className="w-full rounded-2xl bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] p-7">
          <div className="flex flex-col items-center text-center">
            {/* Success Icon */}
            <div className="w-18 h-18 rounded-full bg-[#0F766E] flex items-center justify-center mb-5">
              <svg
                width="43"
                height="43"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M43.6022 20.001C44.5156 24.4836 43.8646 29.1438 41.7579 33.2045C39.6512 37.2653 36.216 40.4811 32.0252 42.3156C27.8345 44.1501 23.1415 44.4925 18.7288 43.2857C14.3161 42.0789 10.4506 39.3958 7.77675 35.6838C5.10292 31.9718 3.78244 27.4554 4.03553 22.8877C4.28861 18.32 6.09996 13.9771 9.1675 10.5833C12.235 7.18946 16.3734 4.94982 20.8923 4.23786C25.4113 3.52591 30.0378 4.38468 34.0002 6.67096"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 22L24 28L44 8"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h1 className="font-poppins font-bold text-[27px] leading-[32px] text-[#333] mb-2.5">
              Check Your Email
            </h1>
            
            <p className="text-[#4A5565] text-sm mb-2">
              We've sent password reset instructions to
            </p>
            
            <p className="text-[#1E3A8A] font-semibold text-sm mb-5">
              your@email.com
            </p>

            {/* Info Box */}
            <div className="w-full rounded-lg border-2 border-[#1E3A8A] bg-[#EFF6FF] p-3.5 mb-5 flex gap-2.5">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0 mt-0.5"
              >
                <path
                  d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                  stroke="#1E3A8A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 6L12 13L2 6"
                  stroke="#1E3A8A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-xs text-[#1E3A8A] text-left">
                Click the link in the email to reset your password. The link will expire in
                1 hour.
              </p>
            </div>

            {/* Back to Sign In Button */}
            <Link
              to="/sign-in"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-semibold text-sm text-white mb-5 transition-all duration-300 hover:shadow-lg"
              style={{
                background: "linear-gradient(90deg, #1E3A8A 0%, #0F766E 100%)",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.8337 10H4.16699"
                  stroke="white"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.0003 15.8327L4.16699 9.99935L10.0003 4.16602"
                  stroke="white"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to sign in
            </Link>

            {/* Resend Link */}
            <p className="text-xs text-[#4A5565] mb-5">
              Didn't receive the email?{" "}
              <button className="text-[#1E3A8A] font-semibold hover:text-[#0F766E]">
                Resend
              </button>
            </p>

            {/* Help Text */}
            <p className="text-xs text-[#9CA3AF]">
              Check your spam folder or{" "}
              <a
                href="mailto:support@fairsay.com"
                className="text-[#1E3A8A] font-semibold hover:text-[#0F766E]"
              >
                contact support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

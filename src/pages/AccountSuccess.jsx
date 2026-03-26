import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const BG_IMAGE =
  "https://cdn.builder.io/api/v1/image/assets%2F40ba842052b14f65b01728244d7b3248%2F81332e25d9d740ffbec61ecdc30601f5";

export default function AccountSuccess() {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-8">
      {/* Back to Profile link */}
      <div className="absolute left-0 top-0 w-full max-w-[640px] mx-auto px-4 pt-6 z-20">
        <div className="mb-4 flex justify-end">
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-600 font-medium text-base"
            style={{ textDecoration: 'none' }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block align-middle"
            >
              <path
                d="M15 19l-7-7 7-7"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="align-middle" style={{ lineHeight: 1 }}>Back to Profile</span>
          </Link>
        </div>
      </div>
      <img
        src={BG_IMAGE}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 w-full max-w-[640px] flex flex-col gap-8">
        {/* Logo */}
        <Logo variant="light" />

        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] p-8 sm:p-12">
          {/* Success Icon */}
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
                  d="M33.3333 10L15 28.3333L6.66667 20"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="font-poppins font-bold text-[30px] leading-9 text-fairsay-gray-900 mb-2">
              Account Created Successfully!
            </h1>
            <p className="font-inter text-base leading-6 text-fairsay-gray-500">
              Welcome to FairSay, your voice for workplace justice
            </p>
          </div>

          {/* Status Items */}
          <div className="space-y-4 mb-8">
            {/* Account Verified */}
            <div className="flex items-start gap-4 p-4 bg-[#ECFDF5] rounded-lg">
              <div className="w-6 h-6 rounded-full bg-fairsay-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.3333 4L6 11.3333L2.66667 8"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-inter font-semibold text-base text-fairsay-gray-900">
                  Account Verified
                </h3>
                <p className="font-inter text-sm text-fairsay-gray-500">
                  Your email has been confirmed
                </p>
              </div>
            </div>

            {/* Profile Completed */}
            <div className="flex items-start gap-4 p-4 bg-[#ECFDF5] rounded-lg">
              <div className="w-6 h-6 rounded-full bg-fairsay-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.3333 4L6 11.3333L2.66667 8"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-inter font-semibold text-base text-fairsay-gray-900">
                  Profile Completed
                </h3>
                <p className="font-inter text-sm text-fairsay-gray-500">
                  Your workplace information is saved
                </p>
              </div>
            </div>

            {/* Verification Under Review */}
            <div className="flex items-start gap-4 p-4 bg-[#FEF3C7] rounded-lg">
              <div className="w-6 h-6 rounded-full bg-[#F59E0B] flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="2" />
                  <circle cx="8" cy="8" r="2" fill="white" />
                </svg>
              </div>
              <div>
                <h3 className="font-inter font-semibold text-base text-fairsay-gray-900">
                  Verification Under Review
                </h3>
                <p className="font-inter text-sm text-fairsay-gray-500">
                  We're reviewing your documents (usually within 24 hours)
                </p>
              </div>
            </div>
          </div>

          {/* What's Next Section */}
          <div className="mb-8">
            <h2 className="font-poppins font-bold text-xl text-fairsay-gray-900 mb-4">
              What's Next?
            </h2>
            <div className="space-y-3">
              {/* Educational Modules */}
              <Link
                to="/learning"
                className="flex items-start gap-4 p-4 border border-fairsay-gray-200 rounded-lg hover:border-fairsay-blue transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-[#DBEAFE] flex items-center justify-center flex-shrink-0">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.66602 10.0003C1.66602 10.0003 4.16602 4.16699 9.99935 4.16699C15.8327 4.16699 18.3327 10.0003 18.3327 10.0003C18.3327 10.0003 15.8327 15.8337 9.99935 15.8337C4.16602 15.8337 1.66602 10.0003 1.66602 10.0003Z"
                      stroke="#1E3A8A"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
                      stroke="#1E3A8A"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-inter font-semibold text-base text-fairsay-gray-900">
                    Explore Educational Modules
                  </h3>
                  <p className="font-inter text-sm text-fairsay-gray-500">
                    Learn about your workplace rights and how to protect them
                  </p>
                </div>
              </Link>

              {/* File a Complaint */}
              <Link
                to="/complaint"
                className="flex items-start gap-4 p-4 border border-fairsay-gray-200 rounded-lg hover:border-fairsay-blue transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-[#DBEAFE] flex items-center justify-center flex-shrink-0">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.83398 17.5H14.1673M10.0007 1.66699V5.00033M10.0007 5.00033C11.841 5.00033 13.334 6.49329 13.334 8.33366V11.667H6.66732V8.33366C6.66732 6.49329 8.16028 5.00033 10.0007 5.00033Z"
                      stroke="#1E3A8A"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-inter font-semibold text-base text-fairsay-gray-900">
                    File a Complaint (Coming Soon)
                  </h3>
                  <p className="font-inter text-sm text-fairsay-gray-500">
                    Report workplace issues securely and confidentially
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to="/dashboard"
              className="w-full h-[51px] flex items-center justify-center gap-2 rounded-[10px] bg-gradient-to-b from-fairsay-blue to-fairsay-teal font-inter font-semibold text-base leading-6 text-white hover:opacity-90 transition-opacity"
            >
              Go to Dashboard
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
            </Link>
            <Link
              to="/learning"
              className="w-full h-[51px] flex items-center justify-center rounded-[10px] border-[1.6px] border-fairsay-blue font-inter font-semibold text-base leading-6 text-fairsay-blue hover:bg-fairsay-blue/5 transition-colors"
            >
              Start Learning
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

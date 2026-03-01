import Logo from "../components/Logo";
import { Link } from "react-router-dom";

export default function AccountSuccess() {
  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-7" style={{
      background: "linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)"
    }}>
      <div className="w-full max-w-[1020px] flex flex-col items-start gap-7">
        {/* Logo */}
        <div className="flex items-center gap-2 w-full justify-center">
                   <div className="w-10 h-10"><Logo /></div>
                 </div>

        {/* Main Card */}
        <div className="w-full rounded-2xl bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] p-7">
          {/* Success Icon and Heading */}
          <div className="flex flex-col items-center gap-4 mb-7">
            <div className="w-18 h-18 rounded-full bg-[#0F766E] flex items-center justify-center">
              <svg
                width="48"
                height="48"
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
            <h1 className="font-poppins font-bold text-[27px] leading-[32px] text-[#333] text-center">
              Account Created Successfully!
            </h1>
            <p className="text-[#4A5565] text-base leading-7 text-center">
              Welcome to FairSay, your voice for workplace justice
            </p>
          </div>

          {/* Status Cards in 3-Column Grid on Desktop */}
          <div className="rounded-[14px] p-5 mb-5" style={{
            background: "linear-gradient(90deg, #EFF6FF 0%, #F0FDFA 100%)"
          }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Account Verified */}
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-[#0F766E] flex items-center justify-center flex-shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.1678 8.33357C18.5484 10.2013 18.2772 12.1431 17.3994 13.8351C16.5216 15.527 15.0902 16.8669 13.3441 17.6313C11.5979 18.3957 9.64252 18.5384 7.80391 18.0355C5.9653 17.5327 4.35465 16.4147 3.24056 14.8681C2.12646 13.3214 1.57626 11.4396 1.68171 9.53639C1.78717 7.63318 2.54189 5.82364 3.82004 4.40954C5.09818 2.99545 6.82248 2.06226 8.70538 1.76561C10.5883 1.46897 12.516 1.82679 14.167 2.7794"
                      stroke="white"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.5 9.16732L10 11.6673L18.3333 3.33398"
                      stroke="white"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-sm leading-5 text-[#333]">
                    Account Verified
                  </div>
                  <div className="text-xs leading-4 text-[#4A5565]">
                    Your email has been confirmed
                  </div>
                </div>
              </div>

              {/* Profile Completed */}
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-[#0F766E] flex items-center justify-center flex-shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.1678 8.33357C18.5484 10.2013 18.2772 12.1431 17.3994 13.8351C16.5216 15.527 15.0902 16.8669 13.3441 17.6313C11.5979 18.3957 9.64252 18.5384 7.80391 18.0355C5.9653 17.5327 4.35465 16.4147 3.24056 14.8681C2.12646 13.3214 1.57626 11.4396 1.68171 9.53639C1.78717 7.63318 2.54189 5.82364 3.82004 4.40954C5.09818 2.99545 6.82248 2.06226 8.70538 1.76561C10.5883 1.46897 12.516 1.82679 14.167 2.7794"
                      stroke="white"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.5 9.16732L10 11.6673L18.3333 3.33398"
                      stroke="white"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-sm leading-5 text-[#333]">
                    Profile Completed
                  </div>
                  <div className="text-xs leading-4 text-[#4A5565]">
                    Your workplace information is saved
                  </div>
                </div>
              </div>

              {/* Verification Under Review */}
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-[#F0B100] flex items-center justify-center flex-shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                </div>
                <div>
                  <div className="font-semibold text-sm leading-5 text-[#333]">
                    Verification Under Review
                  </div>
                  <div className="text-xs leading-4 text-[#4A5565]">
                    We're reviewing your documents (usually within 24 hours)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What's Next Section */}
          <div className="mb-5">
            <h2 className="font-poppins font-bold text-xl leading-7 text-[#333] mb-3">
              What's Next?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Educational Modules */}
              <div className="rounded-[10px] bg-[#F9FAFB] p-3 flex gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 mt-0.5"
                >
                  <path
                    d="M12 7V21"
                    stroke="#1E3A8A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 18C2.73478 18 2.48043 17.8946 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7C12 5.93913 12.4214 4.92172 13.1716 4.17157C13.9217 3.42143 14.9391 3 16 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V17C22 17.2652 21.8946 17.5196 21.7071 17.7071C21.5196 17.8946 21.2652 18 21 18H15C14.2044 18 13.4413 18.3161 12.8787 18.8787C12.3161 19.4413 12 20.2044 12 21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H3Z"
                    stroke="#1E3A8A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <div className="font-semibold text-sm leading-5 text-[#333]">
                    Complete Educational Modules
                  </div>
                  <div className="text-xs leading-4 text-[#4A5565]">
                    Learn about your workplace rights and proper reporting procedures
                    (required before filing complaints)
                  </div>
                </div>
              </div>

              {/* Dashboard */}
              <div className="rounded-[10px] bg-[#F9FAFB] p-3 flex gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 mt-0.5"
                >
                  <path
                    d="M6 22C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V4C4 3.46957 4.21071 2.96086 4.58579 2.58579C4.96086 2.21072 5.46957 2 6 2H14C14.3166 1.99949 14.6301 2.06161 14.9225 2.18277C15.215 2.30394 15.4806 2.48176 15.704 2.706L19.292 6.294C19.5168 6.51751 19.6952 6.78335 19.8167 7.07616C19.9382 7.36898 20.0005 7.68297 20 8V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6Z"
                    stroke="#0F766E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 2V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H20"
                    stroke="#0F766E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 9H8"
                    stroke="#0F766E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 13H8"
                    stroke="#0F766E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 17H8"
                    stroke="#0F766E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <div className="font-semibold text-sm leading-5 text-[#333]">
                    Explore the Dashboard
                  </div>
                  <div className="text-xs leading-4 text-[#4A5565]">
                    Familiarize yourself with complaint tracking, AI assistance, and
                    available resources
                  </div>
                </div>
              </div>

              {/* Anonymous Whistleblowing */}
              <div className="rounded-[10px] bg-[#F9FAFB] p-3 flex gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 mt-0.5"
                >
                  <path
                    d="M20 13.0004C20 18.0004 16.5 20.5005 12.34 21.9505C12.1222 22.0243 11.8855 22.0207 11.67 21.9405C7.5 20.5005 4 18.0004 4 13.0004V6.00045C4 5.73523 4.10536 5.48088 4.29289 5.29334C4.48043 5.10581 4.73478 5.00045 5 5.00045C7 5.00045 9.5 3.80045 11.24 2.28045C11.4519 2.09945 11.7214 2 12 2C12.2786 2 12.5481 2.09945 12.76 2.28045C14.51 3.81045 17 5.00045 19 5.00045C19.2652 5.00045 19.5196 5.10581 19.7071 5.29334C19.8946 5.48088 20 5.73523 20 6.00045V13.0004Z"
                    stroke="#B91C1C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <div className="font-semibold text-sm leading-5 text-[#333]">
                    Anonymous Whistleblowing Available
                  </div>
                  <div className="text-xs leading-4 text-[#4A5565]">
                    You can submit anonymous reports immediately without waiting for
                    verification
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="rounded border-l-4 border-[#F0B100] bg-[#FEFCE8] p-4 mb-6">
            <p className="text-sm leading-5 text-[#364153]">
              <span className="font-semibold">Important:</span> While your verification
              is under review, you can access educational materials and the AI assistant.
              Complaint submission will be enabled once verification is complete.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Link
              to="/dashboard"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-[10px] font-semibold text-base text-white"
              style={{
                background: "linear-gradient(180deg, #1E3A8A 0%, #0F766E 100%)"
              }}
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
            </Link>
            <Link
              to="/learning"
              className="flex items-center justify-center w-full py-3.5 rounded-[10px] border-[1.6px] border-[#1E3A8A] font-semibold text-base text-[#1E3A8A]"
            >
              Start Learning
            </Link>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-sm leading-5 text-[#4A5565] text-center w-full">
          We've sent a confirmation email to your inbox with next steps and helpful
          resources.
        </p>
      </div>
    </div>
  );
}

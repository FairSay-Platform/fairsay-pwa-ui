import Logo from '../components/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { APP_NAME } from '../utils/constants';
import { useAppContext } from '../context/AppContext';

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const [alert, setAlert] = useState({ show: false, message: "", type: "error"});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
 e.preventDefault();
  setAlert({ show: false, message: "", type: "error" });
  const result = await login(formData.email, formData.password);
  if (result.success) {
    if (result.user?.course_completed) {
      // Here you would handle authentication
      navigate("/dashboard");
    } else {
      navigate("/learning");
    }
  } else {
    setAlert({ show: true, message: result.message, type: "error" });
  }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center px-4 py-7"
      style={{
        background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
      }}
    >
      <div className="w-full max-w-[504px] flex flex-col items-center gap-7">
        {/* Logo */}
<div className="mb-2 transform scale-125 origin-center">
  <Logo />
</div>

        {/* Main Card */}
        <div className="w-full rounded-2xl bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] p-7">
          <div className="mb-7 text-center">
            <h1 className="font-poppins font-bold text-[27px] leading-[32px] text-[#333] mb-2">
              Welcome Back
            </h1>
            <p className="text-[#4A5565] text-sm">
              Sign in to your account to continue
            </p>
          </div>


       {/*For rendering the alert*/}
       {alert.show && (
         <div className={`mb-6 p-4 rounded-lg text-sm font-medium border ${
           alert.type === 'error' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
         }`}>
           {alert.message}
         </div>
       )}

          <form onSubmit={handleSubmit} className="space-y-[18px]">
            {/* Email Address */}
            <div>
              <label className="block text-[#333] text-sm font-medium mb-2">
                Email Address
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
                    d="M3 3H17C18.1 3 19 3.9 19 5V15C19 16.1 18.1 17 17 17H3C1.9 17 1 16.1 1 15V5C1 3.9 1.9 3 3 3Z"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 5L10 11L1 5"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-[11px] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent text-[#333] placeholder:text-[#9CA3AF]"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#333] text-sm font-medium mb-2">
                Password
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
                    d="M15.8333 9.16667H4.16667C3.24619 9.16667 2.5 9.91286 2.5 10.8333V16.6667C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6667V10.8333C17.5 9.91286 16.7538 9.16667 15.8333 9.16667Z"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.83333 9.16667V5.83333C5.83333 4.72826 6.27232 3.66846 7.05372 2.88706C7.83512 2.10565 8.89493 1.66667 10 1.66667C11.1051 1.66667 12.1649 2.10565 12.9463 2.88706C13.7277 3.66846 14.1667 4.72826 14.1667 5.83333V9.16667"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-[11px] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent text-[#333] placeholder:text-[#9CA3AF]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#333]"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {showPassword ? (
                      <>
                        <path
                          d="M14.95 14.95C13.5255 16.0358 11.7904 16.6374 10 16.6667C4.16667 16.6667 1.66667 10 1.66667 10C2.49595 8.35557 3.64607 6.89037 5.05 5.68333M8.25 3.53333C8.82379 3.39907 9.41073 3.33195 10 3.33333C15.8333 3.33333 18.3333 10 18.3333 10C17.9286 10.9463 17.4235 11.8473 16.8267 12.6867M11.7667 11.7667C11.5378 12.0123 11.2617 12.2093 10.9545 12.3459C10.6474 12.4826 10.3155 12.556 9.97884 12.562C9.64217 12.568 9.30781 12.5064 8.99596 12.3806C8.68412 12.2549 8.40125 12.0675 8.16394 11.8302C7.92663 11.5929 7.73925 11.31 7.61351 10.9982C7.48776 10.6863 7.42614 10.352 7.43213 10.0153C7.43812 9.67863 7.51159 9.34672 7.64822 9.03957C7.78486 8.73242 7.98183 8.45634 8.22733 8.22733"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1.66699 1.66667L18.3337 18.3333"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </>
                    ) : (
                      <>
                        <path
                          d="M1.66699 10C1.66699 10 4.16699 3.33333 10.0003 3.33333C15.8337 3.33333 18.3337 10 18.3337 10C18.3337 10 15.8337 16.6667 10.0003 16.6667C4.16699 16.6667 1.66699 10 1.66699 10Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.0003 12.5C11.381 12.5 12.5003 11.3807 12.5003 10C12.5003 8.61929 11.381 7.5 10.0003 7.5C8.61961 7.5 7.50033 8.61929 7.50033 10C7.50033 11.3807 8.61961 12.5 10.0003 12.5Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    setFormData({ ...formData, rememberMe: e.target.checked })
                  }
                  className="w-4 h-4 text-[#1E3A8A] border-[#E5E7EB] rounded focus:ring-[#1E3A8A]"
                />
                <label htmlFor="remember" className="text-sm text-[#4A5565]">
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-[#1E3A8A] hover:text-[#0F766E] font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-[10px] font-semibold text-sm text-white mt-5"
              style={{
                background: 'linear-gradient(180deg, #1E3A8A 0%, #0F766E 100%)',
              }}
            >
              Sign In
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

            {/* Create Account Link */}
            <div className="text-center pt-3.5">
              <p className="text-sm text-[#9CA3AF] mb-2.5">Don't have an account?</p>
              <Link
                to="/sign-up"
                className="block w-full py-3.5 rounded-[10px] border-2 border-[#1E3A8A] font-semibold text-sm text-[#1E3A8A] hover:bg-[#EFF6FF] transition-colors"
              >
                Create an Account
              </Link>
            </div>
          </form>
        </div>

        {/* Back to Home */}
        <Link
          to="/dashboard"
          className="text-sm text-[#4A5565] hover:text-[#1E3A8A] transition-colors inline-flex items-center gap-1"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6663 8H3.33301"
              stroke="currentColor"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 12.6673L3.33333 8.00065L8 3.33398"
              stroke="currentColor"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Home
        </Link>
      </div>
      
    </div>
  );
}

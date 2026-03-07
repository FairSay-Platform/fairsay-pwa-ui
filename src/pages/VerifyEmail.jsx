import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { APP_STEPS } from '../utils/constants';
import { useAppContext } from '../context/AppContext';

const BG_IMAGE = "https://cdn.builder.io/api/v1/image/assets%2F40ba842052b14f65b01728244d7b3248%2F81332e25d9d740ffbec61ecdc30601f5";

export default function VerifyEmailNotice() {
  const navigate = useNavigate();
  const { showAlert } = useAppContext();
  const [isResending, setIsResending] = React.useState(false);

  const handleResend = async () => {
    setIsResending(true);
    try {
      // await api.post('/auth/resend-verification'); // Uncomment when implemented
         showAlert("Verification email resent! Please check your inbox.", "success"); 
    } catch (err) {
      showAlert("Failed to resend email. Please try again later.", "error");
    } finally {
      setIsResending(false);
    }
}


  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-8">
      {/* Background with Overlay */}
      <img src={BG_IMAGE} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 w-full max-w-[500px] flex flex-col gap-8">
        <Logo variant="light" />

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>

          <h1 className="font-poppins font-bold text-2xl text-gray-900 mb-4">Check Your Email</h1>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            We've sent a verification link to your email address. 
            Please click the link in that email to activate your account and continue.
          </p>

          <div className="space-y-4">
            <button
              onClick={() => navigate('/sign-in')}
              className="w-full py-3.5 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Back to Sign In
            </button>
          </div>

         <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Didn't receive the email? Check your spam folder or wait a few minutes.</p>
            <button
              onClick={handleResend}
              disabled={isResending}
              className={`w-full py-3.5 rounded-xl ${isResending ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#0F766E] hover:bg-[#0D6B63]'} text-white font-semibold transition-colors`}
            >
              {isResending ? 'Resending...' : 'Resend Verification Email'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
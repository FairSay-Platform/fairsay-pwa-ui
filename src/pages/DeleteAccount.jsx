import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function DeleteAccount() {
  const [step, setStep] = useState(1); // 1: confirmation, 2: password verification, 3: final warning
  const [password, setPassword] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [reasons, setReasons] = useState({
    notUseful: false,
    privacyConcerns: false,
    foundAlternative: false,
    tooComplicated: false,
    other: false,
  });
  const [otherReason, setOtherReason] = useState('');
  const navigate = useNavigate();

  function handleReasonChange(reason) {
    setReasons(prev => ({ ...prev, [reason]: !prev[reason] }));
  }

  function handleNext() {
    if (step === 1) setStep(2);
    else if (step === 2 && password) setStep(3);
  }

  function handleDelete() {
    if (confirmText.toLowerCase() === 'delete my account') {
      // In a real app, this would call an API to delete the account
      alert('Account deletion initiated. You will be logged out.');
      navigate('/sign-in');
    }
  }

  return (
    <div className="min-h-screen bg-red-50 dark:bg-gray-900">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s === step
                    ? 'w-12 bg-red-600'
                    : s < step
                    ? 'w-8 bg-red-400'
                    : 'w-8 bg-red-200 dark:bg-red-900/30'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-dark-text-secondary mt-3">
            Step {step} of 3
          </p>
        </div>

        {/* Step 1: Confirmation & Reasons */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Warning Card */}
            <div className="bg-white dark:bg-dark-bg-secondary rounded-2xl shadow-sm border-2 border-red-300 dark:border-red-800 p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <div>
                  <h2 className="font-poppins font-bold text-xl text-red-600 dark:text-red-400 mb-2">
                    We're sorry to see you go
                  </h2>
                  <p className="text-gray-700 dark:text-dark-text-secondary text-sm leading-relaxed">
                    Before you delete your account, please note that this action is <strong className="text-red-600 dark:text-red-400">permanent and cannot be undone</strong>.
                  </p>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 space-y-2">
                <h3 className="font-semibold text-sm text-red-800 dark:text-red-300 mb-2">What will be deleted:</h3>
                <ul className="space-y-1.5 text-sm text-red-700 dark:text-red-400">
                  <li className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    All your personal information and profile data
                  </li>
                  <li className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    All filed complaints and their history
                  </li>
                  <li className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    All learning progress and completed modules
                  </li>
                  <li className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    All messages and communication history
                  </li>
                  <li className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Access to all whistleblowing reports
                  </li>
                </ul>
              </div>
            </div>

            {/* Feedback Section */}
            <div className="bg-white dark:bg-dark-bg-secondary rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-poppins font-bold text-lg text-gray-900 dark:text-dark-text-primary mb-4">
                Help us improve (Optional)
              </h3>
              <p className="text-sm text-gray-600 dark:text-dark-text-secondary mb-4">
                Could you tell us why you're leaving? This helps us improve FairSay for everyone.
              </p>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reasons.notUseful}
                    onChange={() => handleReasonChange('notUseful')}
                    className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-dark-text-secondary">The platform wasn't useful for my needs</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reasons.privacyConcerns}
                    onChange={() => handleReasonChange('privacyConcerns')}
                    className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-dark-text-secondary">I have privacy concerns</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reasons.foundAlternative}
                    onChange={() => handleReasonChange('foundAlternative')}
                    className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-dark-text-secondary">I found an alternative solution</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reasons.tooComplicated}
                    onChange={() => handleReasonChange('tooComplicated')}
                    className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-dark-text-secondary">The platform is too complicated</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reasons.other}
                    onChange={() => handleReasonChange('other')}
                    className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-dark-text-secondary">Other reason</span>
                </label>

                {reasons.other && (
                  <textarea
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    placeholder="Please tell us more..."
                    rows={3}
                    className="w-full mt-2 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-dark-text-primary dark:bg-dark-bg-tertiary outline-none resize-none focus:border-red-400"
                  />
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/profile/settings"
                className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-dark-text-secondary font-semibold py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"/>
                  <polyline points="12 19 5 12 12 5"/>
                </svg>
                Keep My Account
              </Link>
              <button
                onClick={handleNext}
                className="flex-1 bg-red-600 dark:bg-red-700 text-white font-semibold py-3.5 rounded-xl hover:bg-red-700 dark:hover:bg-red-800 transition-colors"
              >
                Continue with Deletion
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Password Verification */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-dark-bg-secondary rounded-2xl shadow-sm border-2 border-red-300 dark:border-red-800 p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <div>
                  <h2 className="font-poppins font-bold text-xl text-red-600 dark:text-red-400 mb-2">
                    Verify your identity
                  </h2>
                  <p className="text-gray-700 dark:text-dark-text-secondary text-sm leading-relaxed">
                    To confirm that you're the account owner, please enter your password.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                  Password
                </label>
                <div className="flex items-center border-2 border-red-300 dark:border-red-800 rounded-xl px-4 py-3 bg-white dark:bg-dark-bg-tertiary gap-3 focus-within:border-red-500">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="flex-1 text-sm text-gray-800 dark:text-dark-text-primary outline-none bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-dark-text-tertiary mt-2">
                  Don't remember your password? <Link to="/forgot-password" className="text-red-600 dark:text-red-400 hover:underline">Reset it here</Link>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-dark-text-secondary font-semibold py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"/>
                  <polyline points="12 19 5 12 12 5"/>
                </svg>
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!password}
                className={`flex-1 font-semibold py-3.5 rounded-xl transition-colors ${
                  password
                    ? 'bg-red-600 dark:bg-red-700 text-white hover:bg-red-700 dark:hover:bg-red-800'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                }`}
              >
                Verify &amp; Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Final Confirmation */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-dark-bg-secondary rounded-2xl shadow-sm border-2 border-red-300 dark:border-red-800 p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-600 dark:bg-red-700 flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <div>
                  <h2 className="font-poppins font-bold text-xl text-red-600 dark:text-red-400 mb-2">
                    Final Warning
                  </h2>
                  <p className="text-gray-700 dark:text-dark-text-secondary text-sm leading-relaxed mb-4">
                    This is your last chance to reconsider. Once you confirm, your account and all associated data will be permanently deleted.
                  </p>
                  <p className="text-red-600 dark:text-red-400 text-sm font-semibold">
                    This action cannot be reversed or undone.
                  </p>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-800 rounded-xl p-4 mb-6">
                <p className="text-sm text-red-800 dark:text-red-300 font-medium mb-3">
                  Type <strong>"DELETE MY ACCOUNT"</strong> below to confirm:
                </p>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="DELETE MY ACCOUNT"
                  className="w-full border-2 border-red-400 dark:border-red-700 rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-dark-text-primary dark:bg-dark-bg-tertiary outline-none focus:border-red-600"
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                  <div>
                    <p className="text-sm text-blue-800 dark:text-blue-300 font-medium mb-1">
                      Need a break instead?
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      Consider temporarily deactivating your account instead of deleting it. You can always reactivate it later.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-dark-text-secondary font-semibold py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"/>
                  <polyline points="12 19 5 12 12 5"/>
                </svg>
                Back
              </button>
              <button
                onClick={handleDelete}
                disabled={confirmText.toLowerCase() !== 'delete my account'}
                className={`flex-1 flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl transition-colors ${
                  confirmText.toLowerCase() === 'delete my account'
                    ? 'bg-red-600 dark:bg-red-700 text-white hover:bg-red-700 dark:hover:bg-red-800'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                }`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                  <line x1="10" y1="11" x2="10" y2="17"/>
                  <line x1="14" y1="11" x2="14" y2="17"/>
                </svg>
                Permanently Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function ActionBanners() {
  const { user } = useAppContext();

  if (!user) return null;

 
  //Profile Completion Banner
  if (!user.profile_completed) {
    return (
      <div className="mb-6 rounded-lg border-l-4 border-[#D97706] bg-amber-50 p-4 shadow-sm flex items-start justify-between flex-col md:flex-row gap-4">
        <div className="flex items-start gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          <div>
            <div className="font-semibold text-sm text-[#333] mb-1">Complete your profile</div>
            <div className="text-sm text-[#92400E]">
              Please complete your profile to access all the features of our app 
            </div>
          </div>
        </div>
        <Link to="/complete-profile" className="text-sm text-[#D97706] font-semibold hover:text-amber-800 whitespace-nowrap underline">
          Complete Profile
        </Link>
      </div>
    );
  }

  
  //Verification Rejection Banner
  
  if (user.verification_status === 'rejected') {
    return (
      <div className="mb-6 rounded-lg border-l-4 border-red-600 bg-red-50 p-4 shadow-sm flex items-start justify-between flex-col md:flex-row gap-4">
        <div className="flex items-start gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <div>
            <div className="text-red-600 font-bold text-sm mb-1">Action Required: Verification Rejected</div>
            <p className="text-sm text-red-800">Your proof was rejected. Please check your email for details and re-submit.</p>
          </div>
        </div>
        <Link to="/employee-verification" className="text-sm text-red-700 font-bold underline whitespace-nowrap">
          Re-submit Proof
        </Link>
      </div>
    );
  }

//Pending Verification Banner

  if (user.verification_status === 'pending') {
    return (
      <div className="mb-6 rounded-lg border-l-4 border-[#F0B100] bg-[#FEFCE8] p-4 shadow-sm flex items-start justify-between flex-col md:flex-row gap-4">
        <div className="flex items-start gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10" stroke="#F0B100" strokeWidth="2" />
            <path d="M12 8V12" stroke="#F0B100" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="16" r="1" fill="#F0B100" />
          </svg>
          <div>
            <div className="font-semibold text-sm text-[#333] mb-1">
              Verification In Progress
            </div>
            <div className="text-sm text-[#92400E]">
              Your employment verification is under review. You can access educational
              materials while we verify your documents (usually within 24 hours).
            </div>
          </div>
        </div>
        <Link to="/account-success" className="text-sm text-[#1E3A8A] font-semibold hover:text-[#0F766E] whitespace-nowrap">
          View Status
        </Link>
      </div>
    );
  }

  return null;
}
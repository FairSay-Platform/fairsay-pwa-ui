//To ensure that users can't access the complaint form or dashboard without going through the proper flow. Checks the user's session state from the global constants to either allow access or redirect to the appropriate step in the process.

import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { APP_STEPS } from "../utils/constants";


const ProtectedRoutes = ({ children, step }) => {
  const { user, loading } = useAppContext();
  const location = useLocation();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F766E]"></div>
      </div>
    );

  //For the whistleblower bypass
  if (user?.isWhistleblower) return children;

  //If not logged in, redirect to sign in
  if (!user)
    return <Navigate to="/sign-in" state={{ from: location }} replace />;

  //To check verification
  if (step === APP_STEPS.PROFILE_COMPLETION && !user.isVerified) {
    return <Navigate to="/account-success" replace />;
  }

  //if (step === APP_STEPS.EDUCATION && !user.hasCompletedEducation) { return <Navigate to="/learning" replace />;
  if (step === APP_STEPS.EDUCATION && !user.course_completed) {
    return <Navigate to="/learning" replace />;
  }

  return children;
}

export default ProtectedRoutes;
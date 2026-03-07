import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { APP_STEPS, USER_STATUS } from "../utils/constants";

const ProtectedRoutes = ({ children, step, requireAdmin = false }) => {
    const { user, loading } = useAppContext();
    const location = useLocation();

    // Check for development environment and the custom bypass flag
   
const isDevAdmin = 
    import.meta.env.DEV && 
    import.meta.env.VITE_DEV_ADMIN_BYPASS === 'true';

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F766E]"></div>
        </div>
    ); 

   //Auth Guard
  if (!user) {
    return <Navigate to={APP_STEPS.SIGN_IN} state={{ from: location }} replace />;
  }

  //Role-Based Access Control (RBAC) with development bypass
  const hasElevatedAccess = 
        user.role === 'super_admin' || 
        user.role === 'admin' ||    
        user.isAdmin === true ||     
        user.id?.toString().startsWith('dev-') ||
        isDevAdmin;

    if (hasElevatedAccess) {
        return children;
    }

    //Admin Guard (For non-admin users trying to sneak into /admin)
    if (requireAdmin && !hasElevatedAccess) {
        return <Navigate to={APP_STEPS.DASHBOARD} replace />;
  }

  //Profile Completion
  if (!user.profile_completed && location.pathname !== APP_STEPS.PROFILE_COMPLETION) {
    return <Navigate to={APP_STEPS.PROFILE_COMPLETION} replace />;
  }

  //For employee verification (only if profile is done)
  const hasNotSubmittedID = !user.verification_status;
  if (user.profile_completed && hasNotSubmittedID && location.pathname !== APP_STEPS.EMPLOYEE_VERIFICATION) {
    return <Navigate to={APP_STEPS.EMPLOYEE_VERIFICATION} replace />;
  }

  //To prevent backtracking
  const isSetupPage = [APP_STEPS.PROFILE_COMPLETION, APP_STEPS.EMPLOYEE_VERIFICATION].includes(location.pathname);
  if (user.profile_completed && user.verification_status && isSetupPage) {
    return <Navigate to={APP_STEPS.DASHBOARD} replace />;
  }
    return children;
}

export default ProtectedRoutes;
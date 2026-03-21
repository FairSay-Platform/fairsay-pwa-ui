import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { APP_STEPS, USER_STATUS } from "../utils/constants";

const ProtectedRoutes = ({ children, requireAdmin = false, step }) => {
    const { user, loading } = useAppContext();
    const location = useLocation();

    const isDevAdmin = import.meta.env.DEV && import.meta.env.VITE_DEV_ADMIN_BYPASS === 'true';

    //Loading State
    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F766E]"></div>
        </div>
    ); 

    //Auth Guard 
    if (!user) {
        return <Navigate to={APP_STEPS.SIGN_IN} state={{ from: location }} replace />;
    }

    //Admin & Role Check
    const userRole = String(user.role || user.role_name || user.userType || "").toLowerCase();
    const hasElevatedAccess = 
        userRole === 'super_admin' ||
        userRole === 'superadmin' || 
        userRole === 'admin' ||  
        userRole === 'investigator' ||  
        userRole.includes('admin') ||
        user.isAdmin === true ||  
        isDevAdmin;

    //Admin Guard
    if (requireAdmin && !hasElevatedAccess) {
        return <Navigate to={APP_STEPS.DASHBOARD} replace />;
    }

    //Admins bypass all onboarding checks
    if (hasElevatedAccess) {
        return children;
    }

    //Core Onboarding State
    const hasSkippedOnboarding = sessionStorage.getItem('fs_skip_onboarding') === 'true';
    const isSetupPage = [APP_STEPS.PROFILE_COMPLETION, APP_STEPS.EMPLOYEE_VERIFICATION].includes(location.pathname);
    const needsProfile = !user.profile_completed;
    const isActuallyVerified = user.verification_status === 'approved' || user.isVerified === true;
    const needsVerification = !isActuallyVerified && (
        !user.verification_status || 
        user.verification_status === 'unverified' || 
        user.verification_status === 'rejected'
    );

    
    if (step) {
        //Requires profile
        if (needsProfile) return <Navigate to={APP_STEPS.PROFILE_COMPLETION} replace />;
        
        //Requires verification 
        if (step === USER_STATUS.APPROVED || step === USER_STATUS.EDUCATION) {
            if (!isActuallyVerified) {
                return <Navigate to={APP_STEPS.EMPLOYEE_VERIFICATION} replace />;
            }
        }
        
        //Requires education
        if (step === USER_STATUS.EDUCATION && !user.course_completed && !user.educated) {
            return <Navigate to="/learning" replace />;
        }
    }

    //Profile Route Guard (for generic navigation)
    if (needsProfile && !hasSkippedOnboarding && location.pathname !== APP_STEPS.PROFILE_COMPLETION) {
        return <Navigate to={APP_STEPS.PROFILE_COMPLETION} replace />;
    }

    //Verification Route Guard (for generic navigation)
    if (!needsProfile && needsVerification && !hasSkippedOnboarding && location.pathname !== APP_STEPS.EMPLOYEE_VERIFICATION) {
        return <Navigate to={APP_STEPS.EMPLOYEE_VERIFICATION} replace />;
    }

    //To prevent fully onboarded users from going back to setup pages
    if (!needsProfile && !needsVerification && isSetupPage) {
        return <Navigate to={APP_STEPS.DASHBOARD} replace />;
    }

    return children;
}

export default ProtectedRoutes;
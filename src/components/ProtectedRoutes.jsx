import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { APP_STEPS } from "../utils/constants";

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

    //Dev-Admin bypass 
    if (isDevAdmin) return children;

    //For the whistleblower bypass
    if (user?.isWhistleblower) return children;

    //If not logged in, redirect to sign in
    if (!user) return <Navigate to="/sign-in" state={{ from: location }} replace />;

  
    //To check if the route requires admin privileges. 

    if (requireAdmin && !user.isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    // To check verification
    if (step === APP_STEPS.PROFILE_COMPLETION && !user.isVerified) {
         return <Navigate to="/account-success" replace />;
    }

   
    if (step === APP_STEPS.EDUCATION && !user.hasCompletedEducation) { 
        return <Navigate to="/learning" replace />;
    }

    return children;
}

export default ProtectedRoutes;
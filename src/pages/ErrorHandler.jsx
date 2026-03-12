import { useEffect } from "react";
import api from "../services/api"; 
import { useAppContext } from "../context/AppContext";

export default function GlobalErrorHandler({ children }) {
  const { showAlert } = useAppContext();

  useEffect(() => {
    // Set up the interceptor
    const responseInterceptor = api.interceptors.response.use(
      // Pass successful responses through normally
      (response) => response,
      
      // Catch errors globally
      (error) => {
        const status = error.response?.status;

        // Catch 500-level Server Errors
        if (status >= 500) {
          showAlert(
            "Our servers are currently experiencing an issue. Please try again in a few moments.", 
            "error"
          );
        }
        
        // Catch Network Errors (API is completely down or user lost internet)
        if (error.code === 'ERR_NETWORK') {
           showAlert(
            "Cannot connect to the server. Please check your internet connection.", 
            "error"
          );
        }

        // Pass the error back down so individual components can still run their local catch blocks if they want
        return Promise.reject(error);
      }
    );

    // Cleanup the interceptor when the component unmounts
    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [showAlert]);

  return <>{children}</>;
}
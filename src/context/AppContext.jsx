import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('fs_notifications');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('fs_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    const syncNotifications = async () => {
       try {
        const res = await api.get('/notifications');
        if (res.data.success) {
          setNotifications(prev => {
            const serverNotifs = res.data.notifications;
            
            //To merge server notifications. If already marked it as read locally, forces it to stay read
            const merged = serverNotifs.map(sn => {
              const localMatch = prev.find(pn => pn.id === sn.id);
              if (localMatch && localMatch.unread === false) {
                return { ...sn, unread: false };
              }
              return sn;
            });

            const serverIds = serverNotifs.map(sn => sn.id);
            const localOnly = prev.filter(pn => !serverIds.includes(pn.id));

            return [...localOnly, ...merged].slice(0, 20); 
          });
        }
      } catch (err) {
        console.log("System working in offline mode or backend unreachable.");
      }
    };

    if (user && user.id && !user.id.toString().startsWith('dev-')) {
       syncNotifications();
    }
  }, [user]);

  const addNotification = (title, desc, type = 'info') => {
    const newNotif = {
      id: Date.now().toString(),
      title,
      desc,
      type,
      unread: true,
      timestamp: 'Just now'
    };
    setNotifications(prev => [newNotif, ...prev].slice(0, 20));
  };
    
  const markAllAsRead = async () => {
    const previousState = [...notifications];
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));

    try {
      if (user && !user.id.toString().startsWith('dev-')) {
        await api.put('/notifications/read-all');
      }
    } catch (err) {
      console.error("Failed to sync notifications to server, rolling back.");
      setNotifications(previousState);
    }
  };

  // To trigger and show alerts after 4 seconds
  const showAlert = (message, type = 'info') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  };

 //Sign-up
  const register = async (userData) => {
    try {
      const backendData = {
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        password: userData.password
      };

      const res = await api.post('/auth/register', backendData);
      
      showAlert(res.data.message, "success");
      return { success: true, needsVerification: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed";
      showAlert(errorMsg, "error");
      return { success: false, message: errorMsg };
    }
  };

  //Login
  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password});
      
      console.log("🔥 RAW BACKEND RESPONSE:", res.data);
      
      const token = res.data?.token;
      const userData = res.data?.user || res.data?.data || res.data || {};

      const userRole = String(userData?.role || userData?.role_name || userData?.userType || userData?.user_type || "").toLowerCase();
      const isEmailAdmin = email.toLowerCase().includes('admin');

      const isElevated = 
          userRole === 'super_admin' || 
          userRole === 'superadmin' ||
          userRole === 'admin' ||    
          userRole === 'investigator' ||
          userRole.includes('admin') || 
          userData?.is_admin == true ||
          userData?.is_admin === 1 ||
          isEmailAdmin; 

      
      const normalizedUser = {
        ...userData, 
        firstName: userData?.first_name || userData?.firstName || "User",
        lastName: userData?.last_name || userData?.lastName || "",
        isAdmin: isElevated,
        profile_completed: Boolean(userData.profile_completed),
        verification_status: userData.verification_status || 'unverified'
      };
      
      if (token) {
        localStorage.setItem('fs_token', token);    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        console.warn("Warning: No token was found in the backend response!");
      }
      
      setUser(normalizedUser);

      //Routing logic
      let redirectTo = "/dashboard";
      if (isElevated) {
        redirectTo = "/admin/dashboard";
      } else if (!normalizedUser.profile_completed) {
        redirectTo = "/complete-profile";
      }

      return { success: true, user: normalizedUser, redirectTo }; 

    } catch (err) {
      console.error("Login crash details:", err); 
      const errorMsg = err.response?.data?.message || "Login failed due to server error";
      return { success: false, message: errorMsg };
    }
  };

  //Logout
  const logout = () => {
    localStorage.removeItem('fs_token');
    localStorage.removeItem('fs_user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  //To update user
  const updateUser = async (updatedData) => {
    try {
      if (!user?.id?.toString().startsWith('dev-')) {
        await api.put('/auth/profile', updatedData);
      }

      setUser(prev => ({ ...prev, ...updatedData, profile_completed: true}));
      addNotification("Profile Updated", "Your account information was saved successfully", "success");
      showAlert("Profile updated successfully!", "success");
      return true;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Update failed";
      console.error("Profile update failed", err);
      addNotification("Update Failed", "We couldn't save your profile changes", "error");
      showAlert(errorMsg, "error");
      return false;
    }
  };

  //Check for existing user session on app load
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem('fs_token');
      const devUser = localStorage.getItem('fs_user');

      if (token && token !== 'dev-bypass-token-123') {
        try {
          const res = await api.get('/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });

          console.log("Session restored!", res.data.user);
          const u = res.data.user;

          const normalized = {
            ...u,
            firstName: u.first_name || "User",
            lastName: u.last_name || "",
            isAdmin: ['super_admin', 'admin', 'investigator'].includes(String(u.role).toLowerCase()) || u.is_admin == true || u.is_admin === 1,
            profile_completed: Boolean(u.profile_completed),
            verification_status: u.verification_status || 'unverified'
          };
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setUser(normalized);
          
        } catch (err) {
          console.error("Session expired or token invalid");
          logout();
        }
      } else if (devUser) {
        setUser(JSON.parse(devUser));
      }
      
    
      setLoading(false);
    };

    checkSession();
  }, []); 

  const devLogin = (persona) => {
    const personas = {
      admin: {
        id: 'dev-admin-1',
        firstName: 'Dev',
        lastName: 'Admin',
        email: 'admin@fairsay.dev',
        role: 'super_admin',
        isAdmin: true,
        isVerified: true,
        educated: true
      },
      whistleblower: {
        id: 'dev-user-1',
        firstName: 'John',
        lastName: 'Whistleblower',
        email: 'john@fairsay.dev',
        role: 'user',
        isAdmin: false,
        isVerified: true,
        educated: true
      },
      newbie: {
        id: 'dev-user-2',
        firstName: 'New',
        lastName: 'User',
        email: 'new@fairsay.dev',
        role: 'user',
        isAdmin: false,
        isVerified: false,
        educated: false
      }
    };

    const selectedPersona = personas[persona];
    if (selectedPersona) {
      localStorage.setItem('fs_token', 'dev-bypass-token-123');
      localStorage.setItem('fs_user', JSON.stringify(selectedPersona));
      setUser(selectedPersona);
      showAlert(`Logged in as ${selectedPersona.firstName} (Dev Mode)`, "success");
      return { success: true };
    }
    return { success: false };
  };

  return (
    <AppContext.Provider value={{ user, setUser, register, login, updateUser, loading, alert, showAlert, logout, notifications, addNotification, markAllAsRead, devLogin }}>

      {/* To add a loading state instead of rendering children immediately */}

      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <p className="text-gray-500 font-medium animate-pulse">Restoring session...</p>
        </div>
      ) : (
        children
      )}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
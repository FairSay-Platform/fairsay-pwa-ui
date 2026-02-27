//Bridge for the global state of the app, such as user progress and form access

import React, { createContext, useState,  useContext, useEffect } from 'react';
import api from '../services/api';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  //For the core user & session state
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);//For the notification/alert system
  const [loading, setLoading] = useState(true); //For handling initial loading state, such as checking for existing sessions or fetching user data on app start
 const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('fs_notifications');
    return saved ? JSON.parse(saved) : [];
  });


  // Sync notifications to localStorage
  useEffect(() => {
    localStorage.setItem('fs_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // 2. Fetch fresh notifications from the backend on login/app start
  useEffect(() => {
    const syncNotifications = async () => {
      try {
        const res = await api.get('/notifications');
        if (res.data.success) {
          setNotifications(res.data.notifications);
        }
      } catch (err) {
        console.log("System working in offline mode or backend unreachable.");
      }
    };

    if (user) syncNotifications();
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
    setNotifications(prev => [newNotif, ...prev].slice(0, 20)); // Keep last 20
  };
    
  const markAllAsRead = async () => {
    const previousState = [...notifications];
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));

    try {
      await api.put('/notifications/read-all');
    } catch (err) {
      console.error("Failed to sync notifications to server, rolling back.");
      setNotifications(previousState);
    }
  };

  //To trigger and auto-dismiss alerts after 4 seconds
  const showAlert = (message, type= 'info') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  };


  const register = async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);

      //To trigger an alert to check email 
      showAlert(res.data.message, "success");
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed";
      showAlert(errorMsg, "error");
      return { success: false, message: errorMsg };
    }
  }

  //Login
const login = async (email, password) => {
  try {
    const res = await api.post('/auth/login', { email, password});
    const { token, user: userData } = res.data;

    const normalizedUser = {
      ...userData, 
      firstName: userData.first_name,
      lastName: userData.last_name,
    };

    localStorage.setItem('fs_token', token);
    setUser(normalizedUser);
    return { success: true, user: normalizedUser }; 
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Login failed"};
  }
};

 const logout = () => {
    localStorage.removeItem('fs_token');
    localStorage.removeItem('fs_user'); //To clear dev bypass also
    setUser(null);
  };

//Update user
const updateUser = async (updatedData) => {
  try {
    if (!user?.id?.startsWith('dev-')) {
  await api.put('/auth/profile', updatedData);
    }

  setUser(prev => ({ ...prev, ...updatedData, profile_completed: true}));

  addNotification("Profile Updated", "Your account information was saved successfully", "success");
  showAlert("Profile updated successfully!", "success");
  return true;
} catch (err) {
  const errorMsg = err.response?.data?.message || "Update failed"
  console.error("Profile update failed", err);
  addNotification("Update Failed", "We couldn't save your profile changes", "error");
  showAlert(errorMsg, "error")
  return false;
};
};


//To attach token to axios headers when user state changes
  useEffect(() => {
    const token = localStorage.getItem('fs_token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [user]);


  useEffect(() => {
    //To check for existing user session on app load
    const checkSession = async () => {
      const token = localStorage.getItem('fs_token');
      const devUser = localStorage.getItem('fs_user');

      if (token) {
        try {
          const res = await api.get('/protected');
         const normalized = {
            ...res.data.user,
            firstName: res.data.user.first_name,
            lastName: res.data.user.last_name
          };
          setUser(normalized);
        } catch (err) {
          console.error("Session expired");
          logout();
        }
      } else if (devUser) {
        //For the developer bypass
        setUser(JSON.parse(devUser));
      }
      setLoading(false);
    };
    checkSession();
  }, []);


 
  return (
    <AppContext.Provider value={{ user, setUser,register,  login, updateUser, loading, alert, showAlert, logout, notifications, addNotification, markAllAsRead }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
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
          setNotifications(res.data.notifications);
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

  // Sign-up
  const register = async (userData) => {
    try {
      const backendData = {
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        password: userData.password
      };

      const res = await api.post('/auth/register', backendData);
      const { token, user: userBackendData } = res.data;

      if (token) {
        localStorage.setItem('fs_token', token);

        const normalizedUser = {
          ...userBackendData,
          firstName: userBackendData.first_name,
          lastName: userBackendData.last_name,
          // Attach admin flag dynamically
          isAdmin: userBackendData.role === 'admin' || userBackendData.is_admin === true
        };
        setUser(normalizedUser);

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      showAlert(res.data.message, "success");
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed";
      showAlert(errorMsg, "error");
      return { success: false, message: errorMsg };
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password});
      const { token, user: userData } = res.data;

      const normalizedUser = {
        ...userData, 
        firstName: userData.first_name,
        lastName: userData.last_name,
        // Attach admin flag dynamically
        isAdmin: userData.role === 'admin' || userData.is_admin === true
      };

      localStorage.setItem('fs_token', token);
      setUser(normalizedUser);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Login failed"};
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('fs_token');
    localStorage.removeItem('fs_user');
    setUser(null);
  };

  // To update user
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

  // To attach token to axios headers when user state changes
  useEffect(() => {
    const token = localStorage.getItem('fs_token');
    if (token && token !== 'dev-bypass-token-123') {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [user]);

  // To check for existing user session on app load
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem('fs_token');
      const devUser = localStorage.getItem('fs_user');

      if (token && token !== 'dev-bypass-token-123') {
        try {
          const res = await api.get('/protected');
          const normalized = {
            ...res.data.user,
            firstName: res.data.user.first_name,
            lastName: res.data.user.last_name,
            // Attach admin flag dynamically
            isAdmin: res.data.user.role === 'admin' || res.data.user.is_admin === true
          };
          setUser(normalized);
        } catch (err) {
          console.error("Session expired");
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
      role: 'admin',
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
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
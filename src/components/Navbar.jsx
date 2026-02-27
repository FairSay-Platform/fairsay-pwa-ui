import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useAppContext } from '../context/AppContext';
import { getInitials } from '../utils/logic-helpers';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // --- NOTIFICATION STATE ---
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Welcome to FairSay",
      desc: "Complete your profile to get the most out of our AI Assistant.",
      time: "Just now",
      unread: true,
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  // Refs for closing dropdowns when clicking outside
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAppContext(); 

  // Detect scroll position
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setDropdownOpen(false);
    setShowNotifications(false);
  }, [location]);

  // Handle Sign Out
  const handleSignOut = () => {
    logout();
    navigate('/sign-in');
  };

  return (
    <header className={`px-6 py-3 sticky top-0 z-50 transition-all duration-700 ${
      scrolled 
        ? 'bg-[#1E3A8A] dark:bg-[#1E3A8A] shadow-lg border-b border-[#1E3A8A]' 
        : 'bg-white dark:bg-dark-bg-secondary border-b border-[#E5E7EB] dark:border-gray-200'
    }`}>
      <div className="max-w-[95%] mx-auto flex items-center justify-between">
        <Link to="/dashboard" className="hover:opacity-80 transition-opacity">
          <Logo variant="nav" scrolled={scrolled} />
        </Link>
        <div className="flex items-center gap-4">
          
          {/* Notification Area */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)} 
              className={`relative p-2 rounded-lg transition-colors duration-700 ${
                scrolled 
                  ? 'hover:bg-white/20' 
                  : 'hover:bg-gray-500 dark:hover:bg-blue-200'
              }`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" className={scrolled ? 'text-white' : 'text-gray-600 dark:text-gray-300'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" className={scrolled ? 'text-white' : 'text-gray-600 dark:text-gray-300'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white"></span>
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute top-[50px] z-[100] right-0 max-w-[85vw] w-[320px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-top-4 duration-200 ease-out">
                <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50 gap-5">
                  <h4 className="font-bold text-gray-800 font-poppins">Notifications</h4>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-[#1E3A8A] font-bold hover:text-[#0F766E] transition-colors"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
                  {notifications.length > 0 ? (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        className={`p-4 border-b border-gray-50 flex gap-3 transition-all cursor-pointer hover:bg-gray-50 active:bg-gray-100 ${n.unread ? 'bg-blue-50/30' : 'bg-white'}`}
                      >
                        <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${n.unread ? 'bg-[#1E3A8A]' : 'bg-transparent'}`} />
                        <div className="flex-1">
                          <div className="flex justify-between items-start gap-2">
                            <h5 className={`text-sm font-inter ${n.unread ? 'font-bold text-gray-900' : 'font-medium text-gray-600'}`}>
                              {n.title}
                            </h5>
                            <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">{n.time}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1 leading-relaxed font-inter">
                            {n.desc}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-12 text-center text-gray-400 text-sm font-inter">
                      No notifications yet
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-3 hover:opacity-80 transition-all duration-700 p-2 rounded-lg ${
                scrolled ? 'hover:bg-white/20' : 'hover:bg-gray-50 dark:hover:bg-blue-100'
              }`}
            >
              {/* Dynamic Initials */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-700 ${
                scrolled ? 'bg-white text-[#1E3A8A] font-poppins' : 'bg-[#1E3A8A] text-white font-poppins'
              }`}>
                {user ? getInitials(user) : "U"}
              </div>
              
              {/* Dynamic User Info */}
              <div className="hidden md:block text-left">
                <div className={`text-2x1 ${
                  scrolled ? 'text-white font-poppins' : 'text-[#333] dark:text-dark-text-primary font-poppins font-semibold'
                }`}>
                  {user?.firstName} {user?.lastName}
                </div>
                <div className={`text-xs ${
                  scrolled ? 'text-white/80 font-inter' : 'text-[#959aa3] dark:text-dark-text-tertiary font-inter'
                }`}>
                  {user?.job_title || 'Employee'}
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''} ${scrolled ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-dark-bg-secondary rounded-xl shadow-lg border border-gray-200 dark:border-gray-300 py-2 z-50">
                {/* User Info Header */}
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-200">
                  <div className="font-semibold text-sm text-gray-700 dark:text-dark-text-primary font-poppins mb-2">
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-dark-text-tertiary mt-0.5 truncate font-inter">
                    {user?.email}
                  </div>
                </div>

                {/* Menu Items */}

                 <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    My Profile
                  </Link>

                  <Link
                    to="/profile/settings"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                    </svg>
                    Settings
                  </Link>
                  
                <div className="py-2">
                  <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 font-inter dark:hover:bg-gray-50 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="9"/>
                      <rect x="14" y="3" width="7" height="5"/>
                      <rect x="14" y="12" width="7" height="9"/>
                      <rect x="3" y="16" width="7" height="5"/>
                    </svg>
                    Dashboard
                  </Link>

                  <Link to="/my-complaints" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-gray-50 font-inter transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    My Complaints
                  </Link>

                  <Link to="/learning" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-gray-50 font-inter transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                    </svg>
                    Learning Hub
                  </Link>
                  
                  <Link to="/ai-assistant" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-gray-50 font-inter transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    AI Assistant
                  </Link>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 dark:border-gray-200 my-2"></div>

                {/* Logout Button */}
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/20 font-inter transition-colors text-left"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

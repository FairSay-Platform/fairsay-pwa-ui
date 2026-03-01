import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { courses } from "../data/courses";
import { useAppContext } from "../context/AppContext";
import api from '../services/api';
import book from '../images/Book.svg';
import report from '../images/Report.svg';
import whitecheckmark from '../images/Whitecheckmark.svg';
import chatbubble from '../images/Chatbubble.svg';
import ribbon from '../images/Ribbon.svg';
import { getActivityIcon, getProgressStats, getCourseProgress } from "../utils/logic-helpers";

 export default function Dashboard() {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [complaintStats, setComplaintStats] = useState({ active: 0, resolved: 0});
  const [aiCount, setAiCount] = useState(0);

  const progressStats = getProgressStats();
  
  //To sync activities with localStorage
  useEffect(() => {
    if (user?.id) {
      try {
        const storedLogs = localStorage.getItem('fs_logs');
        const allLogs = storedLogs ? JSON.parse(storedLogs) : [];
        
        if (Array.isArray(allLogs)) {
          // Filter logs for this specific user
          const userLogs = allLogs.filter(log => log && log.userId === user.id);
          
          //To set recent activities (max 5)
          setActivities([...userLogs].reverse().slice(0, 5));

          //To calculate total AI consultation sessions dynamically!
          const aiSessions = userLogs.filter(log => 
            log.action?.includes("AI") || 
            log.action?.includes("Chat") || 
            log.action?.includes("Consultation")
          );
          setAiCount(aiSessions.length);
        }
      } catch (error) {
        console.error("Failed to parse logs:", error);
        setActivities([]); 
      }
    }
  }, [user]);

  //To fetch complaints 
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await api.get('/complaints/my-complaints');
        if (res.data.success) {
          const allComplaints = res.data.complaints;
          const activeCount = allComplaints.filter(c => c.status === 'pending' || c.status === 'in_progress').length;
          const resolvedCount = allComplaints.filter(c => c.status === 'resolved').length;
          
          setComplaintStats({ active: activeCount, resolved: resolvedCount });
        }
      } catch (error) {
        console.error("Failed to fetch complaints:", error);
      }
    };

    if (user) {
      fetchComplaints();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9]">
     
     <Navbar />

      {/* Main Content */}
      <main className="max-w-full mx-auto px-8 py-8">
        {/* Verification Banner */}
        {user?.verification_status === 'pending' && (
        <div className="mb-8 rounded-lg border-l-4 border-[#F0B100] bg-[#FEFCE8] p-4 flex items-start justify-between flex-col md:flex-row gap-4">
          <div className="flex items-start gap-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0 mt-0.5"
            >
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
          <Link
            to="/account-success"
            className="text-sm text-[#1E3A8A] font-semibold hover:text-[#0F766E] whitespace-nowrap"
          >
            View Status
          </Link>
        </div>
        )}

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-poppins font-bold text-3xl text-[#333] mb-2">
            Welcome Back, {user.firstName}!
          </h1>
          <p className="text-[#4A5565] text-[16px] font-inter">
            Here's what's happening with your workplace rights today
          </p>
        </div>

        {/* Top Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 px-2">
          <TopStat 
            icon={book} 
            label="Education Progress" 
            value={`${progressStats.completionPercentage}%`} 
            detail={`${progressStats.completed} of ${progressStats.total} modules`} 
            trend={progressStats.completionPercentage === 100 ? "Completed" : progressStats.completionPercentage > 0 ? "In Progress" : "Not Started"} 
            corner="bg-[#0F766E]/20" 
            iconBg="bg-[#0F766E]" 
          />
          <TopStat 
            icon={report} 
            label="Active Complaints" 
            value={complaintStats.active.toString()} 
            detail={complaintStats.active === 0 ? "0 ongoing cases" : complaintStats.active === 1 ? "1 ongoing case" : `${complaintStats.active} ongoing cases`} 
            badge={complaintStats.active > 0 ? "Action Needed" : null} 
            corner="bg-[#1E3A8A]/20" 
            iconBg="bg-[#1E3A8A]" 
          />
          <TopStat 
            icon={whitecheckmark} 
            label="Resolved Cases" 
            value={complaintStats.resolved.toString()} 
            detail={complaintStats.resolved === 0 ? "No cases yet" : "Successfully closed"} 
            corner="bg-[#0F766E]/20" 
            iconBg="bg-[#0F766E]" 
          />
          <TopStat 
            icon={chatbubble} 
            label="AI Consultations" 
            value={aiCount.toString()} 
            detail={aiCount === 1 ? "Total session" : "Total sessions"} 
            corner="bg-[#B91C1C]/20" 
            iconBg="bg-[#1E3A8A]" 
          />
        </div>

            {/* Quick Actions */}
            <section>
              <h3 className="text-[24px] font-poppins font-bold text-gray-800 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <ActionCard 
                icon={book}
                title="Continue Learning" desc="Resume your rights education modules" btnText="Go to Education hub" color="bg-[#0D7A6F]" onClick={() => navigate('/learning')} />
                <ActionCard icon={report} title="File New Complaint" desc="Report a workplace rights violation" btnText="Start Complaint" color="bg-gradient-to-br from-[#1E3A8A] to-[#1447E6]" locked={!progressStats.completionPercentage} onClick={() => navigate('/file-complaint')} />
                <ActionCard icon={chatbubble} title="Ask AI Assistant" desc="Get instant guidance on your rights" btnText="Start Chat" color="bg-[#2D4495]"  onClick={() => navigate('/ai-assistant')} />
              </div>
            </section>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10 bg-white p-6 rounded-xl border border-gray-100 shadow-sm w-max-full">

            {/* Recent Activity */}
            <section className="lg:col-span-8 bg-white rounded-xl border border-gray-300 p-8 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[20px] font-bold font-poppins  text-gray-800">Recent Activity</h3>
                <button className="text-[14px] font-inter font-semibold text-[#1E3A8A] hover:underline">View All</button>
              </div>
             <div className="space-y-3">
              {activities.length > 0 ? (
                activities.map((log, i) => (
                  <ActivityItem key={i} log={log} />
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No recent activity found.</p>
              )}
            </div>
            </section>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <EducationSidebar user={user} />
            <div className="bg-white rounded-xl border border-gray-300 p-8 shadow-lg">
               <h4 className="font-bold text-gray-800 font-poppins text-[16px] mb-4">Quick Links</h4>
               <div className="space-y-4">
                  <LinkItem 
                  onClick={() => navigate('/learning')}
                  icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
  <path d="M9 5.25V15.75M2.25 13.5C2.11739 13.5 1.99021 13.4473 1.89645 13.3536C1.80268 13.2598 1.75 13.1326 1.75 13V3C1.75 2.86739 1.80268 2.74021 1.89645 2.64645C1.99021 2.55268 2.11739 2.5 2.25 2.5H6C6.79565 2.5 7.55871 2.81607 8.12132 3.37868C8.68393 3.94129 9 4.70435 9 5.5C9 4.70435 9.31607 3.94129 9.87868 3.37868C10.4413 2.81607 11.2044 2.5 12 2.5H15.75C15.8826 2.5 16.0098 2.55268 16.1036 2.64645C16.1973 2.74021 16.25 2.86739 16.25 3V13C16.25 13.1326 16.1973 13.2598 16.1036 13.3536C16.0098 13.4473 15.8826 13.5 15.75 13.5H11.25C10.6533 13.5 10.081 13.7371 9.65901 14.159C9.23705 14.581 9 15.1533 9 15.75C9 15.1533 8.76295 14.581 8.34099 14.159C7.91903 13.7371 7.34674 13.5 6.75 13.5H2.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>} label="Education Hub" />

{/*Complaints quick link*/}
                  <LinkItem 
                  onClick={() => navigate('/my-complaints')}
                  icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4.5 16.5C4.10218 16.5 3.72064 16.342 3.43934 16.0607C3.15804 15.7794 3 15.3978 3 15V3C3 2.60218 3.15804 2.22064 3.43934 1.93934C3.72064 1.65804 4.10218 1.5 4.5 1.5H10.5L15 6V15C15 15.3978 14.842 15.7794 14.5607 16.0607C14.2794 16.342 13.8978 16.5 13.5 16.5H4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>} label="My Complaints" />
                  <LinkItem icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1.37468 8.23029C1.31912 8.08061 1.31912 7.91596 1.37468 7.76629C1.91581 6.45419 2.83435 5.33231 4.01386 4.54289C5.19336 3.75346 6.58071 3.33203 8.00001 3.33203C9.41932 3.33203 10.8067 3.75346 11.9862 4.54289C13.1657 5.33231 14.0842 6.45419 14.6253 7.76629C14.6809 7.91596 14.6809 8.08061 14.6253 8.23029C14.0842 9.54238 13.1657 10.6643 11.9862 11.4537C10.8067 12.2431 9.41932 12.6645 8.00001 12.6645C6.58071 12.6645 5.19336 12.2431 4.01386 11.4537C2.83435 10.6643 1.91581 9.54238 1.37468 8.23029Z" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/></svg>} label="Anonymous Report" onClick={() => navigate('/whistleblowing')} />
                  <LinkItem icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4.5 16.5C4.10218 16.5 3.72064 16.342 3.43934 16.0607C3.15804 15.7794 3 15.3978 3 15V3C3 2.60218 3.15804 2.22064 3.43934 1.93934C3.72064 1.65804 4.10218 1.5 4.5 1.5H10.5L15 6V15C15 15.3978 14.842 15.7794 14.5607 16.0607C14.2794 16.342 13.8978 16.5 13.5 16.5H4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>} label="Documents" />
                  <LinkItem 
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32" fill="none"><path d="M21.3327 28V25.3333C21.3327 23.9188 20.7708 22.5623 19.7706 21.5621C18.7704 20.5619 17.4138 20 15.9993 20H7.99935C6.58486 20 5.22831 20.5619 4.22811 21.5621C3.22792 22.5623 2.66602 23.9188 2.66602 25.3333V28" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/><path d="M21.334 4.17188C22.4777 4.46837 23.4905 5.13623 24.2136 6.07063C24.9366 7.00502 25.3289 8.15306 25.3289 9.33454C25.3289 10.516 24.9366 11.6641 24.2136 12.5985C23.4905 13.5329 22.4777 14.2007 21.334 14.4972" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/><path d="M29.334 27.9985V25.3319C29.3331 24.1502 28.9398 23.0022 28.2158 22.0683C27.4918 21.1344 26.4782 20.4673 25.334 20.1719" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.9993 14.6667C14.9449 14.6667 17.3327 12.2789 17.3327 9.33333C17.3327 6.38781 14.9449 4 11.9993 4C9.05383 4 6.66602 6.38781 6.66602 9.33333C6.66602 12.2789 9.05383 14.6667 11.9993 14.6667Z" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/></svg>} label="Profile Settings" />
               </div>
            </div>
          </div>
         </div>
      </main>
    </div>
  );
}

// Sub-components
function TopStat({ icon, label, value, detail, trend, badge, corner, iconBg }) {
  // Little touch to make the trend text color match the wording!
  const trendColor = trend === "Completed" ? "text-green-600" : trend === "In Progress" ? "text-teal-600" : "text-gray-400";

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
      <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-40 ${corner}`} />
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-4 ${iconBg}`}>
      <img src={icon} alt={label} className="w-6 h-6 object-contain stroke-white text-white" />
      </div>
      <p className="text-[16px] text-gray-400 font-inter font-bold tracking-wider">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-[30px] font-inter font-black text-gray-800">{value || '0'}</span>
        {trend && <span className={`text-[10px] font-bold ${trendColor}`}>{trend}</span>}
        {badge && <span className="text-[9px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold uppercase">{badge}</span>}
      </div>
      <p className="text-[12px] font-inter text-gray-400 mt-1">{detail}</p>
    </div>
  );
}

function ActionCard({ icon, title, desc, btnText, color, locked, onClick }) {
  return (
    <div className={`${color} p-6 rounded-2xl text-white relative flex flex-col justify-between min-h-[200px] gap-4 mb-[20px]`}>
      {locked && <span className="absolute top-4 right-4 bg-[#F0B100] text-[#78350F] text-[9px] font-semibold px-2 py-1 rounded-full">Locked</span>}
      <div>
        
          <img src={icon} alt={title} className="w-6 h-6 mb-4 object-contain" />
        <h4 className="text-[20px] font-poppins font-bold mb-2">{title}</h4>
        <p className="text-white/70 text-[14px] font-inter leading-relaxed">{desc}</p>
      </div>
      <button onClick={onClick} className="bg-white/10 hover:bg-white/20 transition-colors  h-max-[48px] font-inter py-2.5 w-fit px-5 rounded-xl text-[16px] font-bold flex items-center justify-center gap-2">
        {btnText} <span>→</span>
      </button>
    </div>
  );
}

function ActivityItem({ log }) {
  // Determine color theme based on activity type
  const isDanger = log.action.includes("Verification") || log.action.includes("Action Required");
  const isEdu = log.action.includes("Module") || log.action.includes("Lesson");
  
  const bgColor = isDanger ? 'bg-[#FEFCE8]' : isEdu ? 'bg-[#F0FDF4]' : 'bg-[#EFF6FF]';
  const borderColor = isDanger ? 'border-yellow-100' : isEdu ? 'border-green-100' : 'border-blue-100';

  return (
    <div className={`p-4 rounded-xl border flex items-center gap-4 transition-all hover:shadow-sm ${bgColor} ${borderColor}`}>
      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm text-gray-500">
        {/* Call the dynamic icon function */}
        {getActivityIcon(log.action)}
      </div>
      <div className="flex-1">
        <h5 className="text-[16px] font-bold text-gray-800 font-inter">{log.action}</h5>
        <p className="text-[12px] text-gray-500 leading-relaxed font-inter">{log.details}</p>
         <span className="text-[12px] text-gray-400 font-medium font-inter whitespace-nowrap">{log.timestamp.includes('now') ? log.timestamp : new Date(log.timestamp).toLocaleString()}</span>
      </div>
    </div>
  );
}

function EducationSidebar() {
  const navigate = useNavigate();
 
  return (
    <div className="bg-white rounded-xl border border-gray-300 p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-bold text-gray-800 font-poppins  text-[16px]">Education Progress</h4>
        <span className="text-lg">
          <img src={ribbon} alt="Education" className="w-5 h-5 object-contain" />
        </span>
      </div>
      
      <div className="space-y-5 mb-8">
        {courses.map((m) => {
          
          const progress = getCourseProgress(m.id);
          const isDone = progress === 100;
          
          return (
            <div key={m.id}>
              <div className="flex justify-between text-[11px] font-bold mb-1.5">
                <span className="text-gray-700 font-inter text-[16px] font-semibold">{m.title}</span>
                <span className="text-gray-400 font-inter  text-[12px]">{progress}%</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
             <div 
                  className={`h-full rounded-full transition-all duration-700 ease-out ${
                    isDone ? 'bg-gradient-to-r from-[#0F766E] to-[#00BBA7]' : 'bg-[#1e3a8a]'
                  }`}
                  style={{ width: `${progress}%` }} 
                />
              </div>
            </div>
          );
        })}
      </div>
      
      <button 
        onClick={() => navigate('/learning')}
        className="w-full bg-gradient-to-b from-[#1e3a8a] to-[#0F766E] hover:bg-[#162d6b] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors"
      >
        Continue Learning <span>→</span>
      </button>
    </div>
  );
}

function LinkItem({ icon, label, onClick }) {
  return (
    <div className="flex items-center gap-3  text-gray-600 hover:text-[#1D4ED8] cursor-pointer group" onClick={onClick}>
      <span className="text-gray-400 group-hover:text-[#1D4ED8]">
        <div className="text-gray-600 group-hover:text-[#1D4ED8] transition-colors flex items-center justify-center w-6 h-6">
        {icon} 
        </div>
      </span>
      <span className="text-[14px] font-bold font-inter">{label}</span>
    </div>
  );
}
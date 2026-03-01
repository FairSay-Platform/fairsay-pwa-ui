import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { fetchAdminDashboardStats } from "../../utils/logic-helpers";


function ComplaintTrendsChart() {
  const width = 400;
  const height = 160;
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const newData = [2, 3, 4, 6, 9, 7, 5];
  const resolvedData = [1, 2, 2, 3, 4, 6, 3];
  const maxVal = 12;

  const toX = (i) => (i / (days.length - 1)) * width;
  const toY = (v) => height - (v / maxVal) * height;

  const newPath = newData.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(v)}`).join(" ");
  const newArea = `${newPath} L${width},${height} L0,${height} Z`;

  const resPath = resolvedData.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(v)}`).join(" ");
  const resArea = `${resPath} L${width},${height} L0,${height} Z`;

  const yLabels = [0, 3, 6, 9, 12];

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[300px]">
        <svg viewBox={`0 0 ${width} ${height + 30}`} className="w-full" style={{ height: "200px" }}>
          <defs>
            <linearGradient id="newGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.02"/>
            </linearGradient>
            <linearGradient id="resGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0F766E" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="#0F766E" stopOpacity="0.02"/>
            </linearGradient>
          </defs>

          {yLabels.map((v) => (
            <g key={v}>
              <text x="0" y={toY(v) + 4} fontSize="9" fill="#9CA3AF">{v}</text>
              <line x1="20" y1={toY(v)} x2={width} y2={toY(v)} stroke="#F3F4F6" strokeWidth="1"/>
            </g>
          ))}

          <path d={resArea} fill="url(#resGrad)"/>
          <path d={newArea} fill="url(#newGrad)"/>

          <path d={resPath} stroke="#0F766E" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d={newPath} stroke="#1E3A8A" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>

          {days.map((d, i) => (
            <text key={d} x={toX(i)} y={height + 20} fontSize="9" fill="#9CA3AF" textAnchor="middle">{d}</text>
          ))}
        </svg>
        <div className="flex items-center justify-center gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-[#1E3A8A]"></div>
            <span className="text-xs text-gray-600">New</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-[#0F766E]"></div>
            <span className="text-xs text-gray-600">Resolved</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryChart() {
  const categories = [
    { label: "Harassment", value: 85 },
    { label: "Discrimination", value: 65 },
    { label: "Wage Theft", value: 50 },
    { label: "Safety", value: 35 },
    { label: "Other", value: 15 },
  ];
  return (
    <div className="space-y-3.5">
      {categories.map((c) => (
        <div key={c.label} className="flex items-center gap-3">
          <p className="text-xs text-gray-500 w-24 text-right shrink-0">{c.label}</p>
          <div className="flex-1 h-5 bg-gray-100 rounded-sm overflow-hidden">
            <div
              className="h-full bg-[#1E3A8A] rounded-sm transition-all duration-500"
              style={{ width: `${c.value}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 w-8">{c.value}%</p>
        </div>
      ))}
    </div>
  );
}

const activities = [
  {
    type: "complaint",
    title: 'New complaint filed: "Unpaid Overtime at Warehouse B"',
    time: "10 mins ago",
    color: "bg-blue-100 text-blue-700",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M14 2H6C5.47 2 4.96 2.21 4.59 2.59C4.21 2.96 4 3.47 4 4V20C4 20.53 4.21 21.04 4.59 21.41C4.96 21.79 5.47 22 6 22H18C18.53 22 19.04 21.79 19.41 21.41C19.79 21.04 20 20.53 20 20V8L14 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2V8H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  },
  {
    type: "user",
    title: "New user verification request: Sarah Jenkins",
    time: "25 mins ago",
    color: "bg-green-100 text-green-700",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/></svg>
    ),
  },
  {
    type: "security",
    title: "Failed login attempt detected from IP 192.168.1.1",
    time: "1 hour ago",
    color: "bg-red-100 text-red-700",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
    ),
  },
  {
    type: "tip",
    title: "Anonymous tip received regarding safety violation",
    time: "2 hours ago",
    color: "bg-amber-100 text-amber-700",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18C1.64 18.3 1.55 18.64 1.55 18.99C1.55 19.34 1.64 19.68 1.82 19.98C2 20.28 2.26 20.52 2.57 20.69C2.88 20.85 3.23 20.94 3.59 20.94H20.41C20.77 20.94 21.12 20.85 21.43 20.69C21.74 20.52 22 20.28 22.18 19.98C22.36 19.68 22.45 19.34 22.45 18.99C22.45 18.64 22.36 18.3 22.18 18L13.71 3.86C13.53 3.56 13.27 3.31 12.96 3.14C12.64 2.97 12.29 2.88 11.93 2.88C11.57 2.88 11.22 2.97 10.91 3.14C10.6 3.31 10.34 3.56 10.16 3.86H10.29Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  },
];

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      const res = await fetchAdminDashboardStats();
      if (res.success) setData(res.data);
    };
    loadStats();
  }, []);

  const dynamicStats = [
    {
      label: "Total Complaints",
      value: data?.total_complaints || "0",
      change: `+${data?.complaints_change || 0}% from last month`,
      changeUp: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 2V8H20" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      label: "Active Whistleblows",
      value: data?.active_whistleblows || "0",
      change: `+${data?.new_this_week || 0} new this week`,
      changeUp: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#9CA3AF" strokeWidth="1.5"/>
          <path d="M12 6V12L16 14" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      label: "Pending Review",
      value: data?.pending_count || "0",
      subLabel: `High Priority: ${data?.high_priority_count || 0}`,
      highPriority: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 9V13" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 17H12.01" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      label: "Total Users",
      value: "15.4k", 
      change: "+120 new users today",
      changeUp: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="9" cy="7" r="4" stroke="#9CA3AF" strokeWidth="1.5"/>
          <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 space-y-6">
        <div>
          <h1 className="font-poppins text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm mt-0.5">Welcome back, Admin. Here's what's happening today.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {dynamicStats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
                {s.icon}
              </div>
              <p className="font-poppins text-2xl font-bold text-gray-900 mb-1">{s.value}</p>
              {s.change && (
                <p className={`text-xs font-medium ${s.changeUp ? "text-green-600" : "text-red-500"}`}>
                  {s.changeUp ? "↑" : "↓"} {s.change}
                </p>
              )}
              {s.subLabel && (
                <p className="text-xs font-medium text-red-500">{s.subLabel}</p>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-800 text-sm mb-0.5">Complaint Trends</h2>
            <p className="text-gray-400 text-xs mb-4">Daily volume of new and resolved complaints</p>
            <ComplaintTrendsChart />
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-800 text-sm mb-0.5">Complaints by Category</h2>
            <p className="text-gray-400 text-xs mb-5">Distribution of violation types</p>
            <CategoryChart />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-800 text-sm mb-0.5">Recent Activity</h2>
          <p className="text-gray-400 text-xs mb-4">Latest actions across the platform</p>
          <div className="divide-y divide-gray-100">
            {activities.map((a, i) => (
              <div key={i} className="flex items-center gap-4 py-3.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${a.color}`}>
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 font-medium leading-snug">{a.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                    {a.time}
                  </p>
                </div>
                <button className="flex items-center gap-1 text-xs text-[#1E3A8A] font-medium hover:underline shrink-0">
                  View
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="15,3 21,3 21,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
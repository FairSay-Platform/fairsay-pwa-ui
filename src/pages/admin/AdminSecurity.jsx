import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";

//Mock data 
const activityLogs = [
  { user: "Admin User", action: "Login Success", ip: "192.168.1.1", time: "10:45 AM", status: "SUCCESS" },
  { user: "Sarah Jenkins", action: "Accessed Complaint #C-005", ip: "10.0.0.4", time: "10:30 AM", status: "INFO" },
  { user: "Unknown", action: "Failed Login Attempt", ip: "45.32.12.9", time: "09:15 AM", status: "DANGER" },
  { user: "Mike Ross", action: "Exported User Data", ip: "192.168.1.5", time: "08:50 AM", status: "WARNING" },
  { user: "Admin User", action: "Modified User Permissions", ip: "192.168.1.1", time: "07:30 AM", status: "WARNING" },
];

const statusStyles = {
  SUCCESS: "bg-green-100 text-green-700",
  INFO: "bg-blue-100 text-blue-700",
  DANGER: "bg-red-100 text-red-700",
  WARNING: "bg-yellow-100 text-yellow-700",
};

const ndaStaff = [
  { name: "Admin User", status: "Signed", date: "Jan 01, 2024" },
  { name: "Sarah Jenkins", status: "Signed", date: "Feb 03, 2024" },
  { name: "New Moderator", status: "Pending", date: "-" },
];

function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${enabled ? "bg-[#1E3A8A]" : "bg-gray-200"}`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-6" : "translate-x-1"}`}
      />
    </button>
  );
}

export default function AdminSecurity() {
  const [tab, setTab] = useState("activity");
  
  // Persist settings to local storage
  const [twoFactor, setTwoFactor] = useState(() => JSON.parse(localStorage.getItem('admin_2fa') ?? "true"));
  const [ipWhitelist, setIpWhitelist] = useState(() => JSON.parse(localStorage.getItem('admin_ip') ?? "false"));
  const [autoLogout, setAutoLogout] = useState(() => JSON.parse(localStorage.getItem('admin_logout') ?? "true"));

  useEffect(() => localStorage.setItem('admin_2fa', JSON.stringify(twoFactor)), [twoFactor]);
  useEffect(() => localStorage.setItem('admin_ip', JSON.stringify(ipWhitelist)), [ipWhitelist]);
  useEffect(() => localStorage.setItem('admin_logout', JSON.stringify(autoLogout)), [autoLogout]);

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 space-y-5">
        <div>
          <h1 className="font-poppins text-2xl font-bold text-gray-900">Security & Logs</h1>
          <p className="text-gray-500 text-sm mt-0.5">Monitor system activity, manage NDAs, and configure security settings</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-200">
          {[
            { id: "activity", label: "Activity Logs" },
            { id: "nda", label: "NDA Management" },
            { id: "privacy", label: "Privacy & Settings" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                tab === t.id
                  ? "border-[#1E3A8A] text-[#1E3A8A]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Activity Logs Tab */}
        {tab === "activity" && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div>
                <h2 className="font-semibold text-gray-800 text-sm">System Activity Logs</h2>
                <p className="text-xs text-gray-400 mt-0.5">Real-time monitoring of user actions and security events</p>
              </div>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-600 font-medium hover:border-gray-300 transition-colors">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                Export Logs
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["User", "Action", "IP Address", "Time", "Status"].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {activityLogs.map((log, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5 font-semibold text-gray-900 whitespace-nowrap">{log.user}</td>
                      <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">{log.action}</td>
                      <td className="px-5 py-3.5 text-gray-400 font-mono text-xs whitespace-nowrap">{log.ip}</td>
                      <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">{log.time}</td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${statusStyles[log.status]}`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* NDA Management Tab */}
        {tab === "nda" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800 text-sm">Staff NDA Status</h2>
                <p className="text-xs text-gray-400 mt-0.5">Track confidentiality agreements for all admin staff</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {["Staff Member", "Status", "Signed Date", "Action"].map((h) => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {ndaStaff.map((s) => (
                      <tr key={s.name} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3.5 font-medium text-gray-900">{s.name}</td>
                        <td className="px-5 py-3.5">
                          {s.status === "Signed" ? (
                            <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              Signed
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 text-amber-600 text-sm font-medium">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18C1.55 18.43 1.55 18.99 1.82 19.42C2.09 19.85 2.57 20.12 3.09 20.12H20.91C21.43 20.12 21.91 19.85 22.18 19.42C22.45 18.99 22.45 18.43 22.18 18L13.71 3.86C13.43 3.43 12.96 3.16 12.44 3.16C11.92 3.16 11.45 3.43 11.17 3.86H10.29Z" stroke="currentColor" strokeWidth="2"/></svg>
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-gray-500 text-sm">{s.date}</td>
                        <td className="px-5 py-3.5">
                          {s.status === "Pending" && (
                            <button className="text-xs font-medium text-[#1E3A8A] border border-[#1E3A8A] px-2.5 py-1 rounded-lg hover:bg-blue-50 transition-colors">
                              Send Reminder
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">NDA Compliance</h3>
                <p className="text-xs text-gray-400 mt-0.5">Policy Overview</p>
              </div>
              <ul className="space-y-3">
                {[
                  "All staff members must sign the Non-Disclosure Agreement before accessing sensitive user data.",
                  "Violations are logged and may result in immediate account suspension.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Privacy & Settings Tab */}
        {tab === "privacy" && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
            <div>
              <h2 className="font-semibold text-gray-800 text-sm mb-0.5">Security Configuration</h2>
              <p className="text-xs text-gray-400">Manage authentication and access controls</p>
            </div>
            <div className="space-y-5">
              {[
                { label: "Two-Factor Authentication", desc: "Require 2FA for admin accounts", value: twoFactor, onChange: setTwoFactor },
                { label: "IP Whitelist", desc: "Restrict access to specific IP addresses", value: ipWhitelist, onChange: setIpWhitelist },
                { label: "Auto Logout", desc: "Automatically log out inactive users after 15 minutes", value: autoLogout, onChange: setAutoLogout },
              ].map((setting) => (
                <div key={setting.label} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{setting.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{setting.desc}</p>
                  </div>
                  <Toggle enabled={setting.value} onChange={setting.onChange} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
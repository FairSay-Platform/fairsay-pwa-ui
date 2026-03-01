import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAppContext } from '../context/AppContext';

// Toggle Component
function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-teal-500' : 'bg-gray-300 dark:bg-gray-600'
      }`}
    >
      <span
        className={`${
          checked ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
      />
    </button>
  );
}

// SettingRow Component
function SettingRow({ label, description, checked, onToggle, divider = true }) {
  return (
    <>
      <div className="flex items-center justify-between py-4">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-800 dark:text-dark-text-primary font-inter">{label}</h3>
          <p className="text-xs text-gray-500 dark:text-dark-text-tertiary font-inter mt-0.5">{description}</p>
        </div>
        <Toggle checked={checked} onChange={onToggle} />
      </div>
      {divider && <div className="border-t border-gray-100 dark:border-gray-700" />}
    </>
  );
}

// PasswordField Component
function PasswordField({ label, placeholder, name }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="block text-sm text-gray-600 dark:text-dark-text-secondary mb-2 font-inter">{label}</label>
      <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 bg-white dark:bg-dark-bg-tertiary gap-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          className="flex-1 text-sm text-gray-800 dark:text-dark-text-primary font-inter outline-none bg-transparent"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          {showPassword ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
              <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

// Account Tab
function AccountTab({ editing, onEdit, onCancel, onSave, isSaving, user }) {
  const [editData, setEditData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    username: user?.username || (user?.email ? user.email.split('@')[0] : ""),
  });

  useEffect(() => {
    if (user && !editing) {
      setEditData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        username: user.username || (user.email ? user.email.split('@')[0] : ""),
      });
    }
  }, [user, editing]);

  const handleChange = (e) => {
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    onSave(editData);
  };

  const handleCancel = () => {
    setEditData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      username: user?.username || (user?.email ? user.email.split('@')[0] : ""),
    });
    onCancel();
  };

  return (
    <div className="space-y-6">
      <section className="bg-white dark:bg-dark-bg-secondary rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-poppins font-bold text-xl text-gray-900 dark:text-dark-text-primary">Account Information</h2>
          {!editing ? (
            <button
              onClick={onEdit}
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-dark-text-secondary text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Edit
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className="flex items-center gap-1.5 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-dark-text-secondary text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
              >
                Cancel
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 bg-[#1E3A8A] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-900 disabled:opacity-70"
              >
                {isSaving ? "Saving..." : "Save changes"}
                {!isSaving && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                    <polyline points="17 21 17 13 7 13 7 21"/>
                    <polyline points="7 3 7 8 15 8"/>
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-dark-text-secondary mb-2 font-inter">First Name</label>
              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 bg-white dark:bg-dark-bg-tertiary gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                <input name="firstName" value={editData.firstName} onChange={handleChange} readOnly={!editing} className="flex-1 text-sm text-gray-800 dark:text-dark-text-primary font-inter outline-none bg-transparent" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-dark-text-secondary mb-2 font-inter">Last Name</label>
              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 bg-white dark:bg-dark-bg-tertiary gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                <input name="lastName" value={editData.lastName} onChange={handleChange} readOnly={!editing} className="flex-1 text-sm text-gray-800 dark:text-dark-text-primary font-inter outline-none bg-transparent" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-dark-text-secondary mb-2 font-inter">Email Address</label>
            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 bg-white dark:bg-dark-bg-tertiary gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
              <input name="email" value={editData.email} onChange={handleChange} readOnly={!editing} className="flex-1 text-sm text-gray-800 dark:text-dark-text-primary font-inter outline-none bg-transparent" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-dark-text-secondary mb-2 font-inter">Phone Number</label>
            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 bg-white dark:bg-dark-bg-tertiary gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
              <input name="phone" value={editData.phone} onChange={handleChange} readOnly={!editing} placeholder="Add phone number" className="flex-1 text-sm text-gray-800 dark:text-dark-text-primary font-inter outline-none bg-transparent" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-dark-text-secondary mb-2 font-inter">Username</label>
            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 bg-white dark:bg-dark-bg-tertiary gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              <input name="username" value={editData.username} onChange={handleChange} readOnly={!editing} className="flex-1 text-sm text-gray-800 dark:text-dark-text-primary font-inter outline-none bg-transparent" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-dark-text-secondary mb-2 font-inter">Language</label>
              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 bg-white dark:bg-dark-bg-tertiary">
                <select disabled={!editing} className="flex-1 text-sm text-gray-800 dark:text-dark-text-primary font-inter outline-none bg-transparent">
                  <option>English</option>
                  <option>Yoruba</option>
                  <option>Hausa</option>
                  <option>Igbo</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-dark-text-secondary mb-2 font-inter">Timezone</label>
              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 bg-white dark:bg-dark-bg-tertiary">
                <select disabled={!editing} className="flex-1 text-sm text-gray-800 dark:text-dark-text-primary font-inter outline-none bg-transparent">
                  <option>WAT (UTC+1)</option>
                  <option>GMT (UTC+0)</option>
                  <option>CAT (UTC+2)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Verification Status */}
      <section className="bg-white dark:bg-dark-bg-secondary rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="font-poppins font-bold text-xl text-gray-900 dark:text-dark-text-primary mb-4">Email Verification</h2>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-dark-text-primary font-inter">Email Verified</p>
            <p className="text-sm text-gray-500 dark:text-dark-text-tertiary font-inter mt-0.5">Your email address has been verified successfully.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

// Security Tab
function SecurityTab() {
  const [twoFaEnabled, setTwoFaEnabled] = useState(true);

  return (
    <div className="space-y-6">
      {/* Change Password Section */}
      <section className="bg-white dark:bg-dark-bg-secondary rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="font-poppins font-bold text-xl text-gray-900 dark:text-dark-text-primary mb-6">Change Password</h2>
        <div className="space-y-4">
          <PasswordField label="Current Password" placeholder="Enter current password" name="currentPassword" />
          <PasswordField label="New Password" placeholder="Enter new password" name="newPassword" />
          <PasswordField label="Confirm New Password" placeholder="Confirm new password" name="confirmPassword" />
          <button className="bg-[#1E3A8A] text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-blue-900 transition-colors mt-2">
            Update Password
          </button>
        </div>
      </section>

      {/* Two-Factor Authentication */}
      <section className="bg-white dark:bg-dark-bg-secondary rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="font-poppins font-bold text-xl text-gray-900 dark:text-dark-text-primary">Two-Factor Authentication</h2>
            <p className="text-sm text-gray-500 dark:text-dark-text-tertiary font-inter mt-1">Add an extra layer of security to your account</p>
          </div>
          <Toggle checked={twoFaEnabled} onChange={() => setTwoFaEnabled(!twoFaEnabled)} />
        </div>

        {twoFaEnabled && (
          <div className="mt-6 space-y-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              <p className="text-sm text-[#1E3A8A] dark:text-blue-400 font-inter">Scan the QR code with your authenticator app to set up 2FA.</p>
            </div>

            <div className="flex justify-center py-4">
              <div className="w-36 h-36 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-inter">QR Code</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-inter">Placeholder</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 dark:text-dark-text-secondary mb-2 font-inter">Verification Code</label>
              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 bg-white dark:bg-dark-bg-tertiary gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                </svg>
                <input placeholder="Enter 6-digit code" maxLength={6} className="flex-1 text-sm text-gray-800 dark:text-dark-text-primary font-inter outline-none bg-transparent" />
              </div>
            </div>

            <button className="w-full bg-[#1E3A8A] text-white font-semibold py-3.5 rounded-xl hover:bg-blue-900 transition-colors">
              Verify &amp; Enable
            </button>
          </div>
        )}
      </section>

      {/* Active Sessions */}
      <section className="bg-white dark:bg-dark-bg-secondary rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="font-poppins font-bold text-xl text-gray-900 dark:text-dark-text-primary mb-6">Active Sessions</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#1E3A8A] flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-800 dark:text-dark-text-primary font-inter">Desktop - Chrome</p>
                  <span className="text-xs bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 px-2 py-0.5 rounded-full font-medium">Current</span>
                </div>
                <p className="text-xs text-gray-400 dark:text-dark-text-tertiary font-inter">Lagos, Nigeria</p>
                <p className="text-xs text-gray-400 dark:text-dark-text-tertiary font-inter">Active now</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-400">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-dark-text-primary font-inter">Mobile - Safari</p>
                <p className="text-xs text-gray-400 dark:text-dark-text-tertiary font-inter">Lagos, Nigeria</p>
                <p className="text-xs text-gray-400 dark:text-dark-text-tertiary font-inter">2 hours ago</p>
              </div>
            </div>
            <button className="text-red-500 dark:text-red-400 text-sm font-semibold hover:text-red-700 dark:hover:text-red-300 transition-colors">
              Sign Out
            </button>
          </div>
        </div>

        <button className="mt-6 w-full border border-[#1E3A8A] dark:border-blue-500 text-[#1E3A8A] dark:text-blue-400 font-semibold text-sm py-3.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
          Sign out on all devices
        </button>
      </section>
    </div>
  );
}

// Notifications Tab
function NotificationsTab() {
  const [emailNotifs, setEmailNotifs] = useState({
    complaintUpdates: true,
    messages: true,
    newsletter: false,
  });
  const [pushNotifs, setPushNotifs] = useState({
    complaintUpdates: true,
    messages: false,
    reminders: true,
  });
  const [smsNotifs, setSmsNotifs] = useState({
    importantUpdates: false,
    messages: false,
  });

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <section className="bg-white dark:bg-dark-bg-secondary rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="font-poppins font-bold text-xl text-gray-900 dark:text-dark-text-primary mb-2">Email Notifications</h2>
        <SettingRow
          label="Complaint Updates"
          description="Get notified when there are updates to your complaints"
          checked={emailNotifs.complaintUpdates}
          onToggle={() => setEmailNotifs((p) => ({ ...p, complaintUpdates: !p.complaintUpdates }))}
        />
        <SettingRow
          label="Messages"
          description="Receive notifications for new messages"
          checked={emailNotifs.messages}
          onToggle={() => setEmailNotifs((p) => ({ ...p, messages: !p.messages }))}
        />
        <SettingRow
          label="Newsletter & Updates"
          description="Stay informed about platform updates and news"
          checked={emailNotifs.newsletter}
          onToggle={() => setEmailNotifs((p) => ({ ...p, newsletter: !p.newsletter }))}
          divider={false}
        />
      </section>

      {/* Push Notifications */}
      <section className="bg-white dark:bg-dark-bg-secondary rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="font-poppins font-bold text-xl text-gray-900 dark:text-dark-text-primary mb-2">Push Notifications</h2>
        <p className="text-sm text-gray-500 dark:text-dark-text-tertiary font-inter mb-4">Manage push notifications for the mobile app</p>
        <SettingRow
          label="Complaint Updates"
          description="Push notifications for complaint status changes"
          checked={pushNotifs.complaintUpdates}
          onToggle={() => setPushNotifs((p) => ({ ...p, complaintUpdates: !p.complaintUpdates }))}
        />
        <SettingRow
          label="Messages"
          description="Get push notifications for new messages"
          checked={pushNotifs.messages}
          onToggle={() => setPushNotifs((p) => ({ ...p, messages: !p.messages }))}
        />
        <SettingRow
          label="Reminders"
          description="Receive reminders for pending actions"
          checked={pushNotifs.reminders}
          onToggle={() => setPushNotifs((p) => ({ ...p, reminders: !p.reminders }))}
          divider={false}
        />
      </section>

      {/* SMS Notifications */}
      <section className="bg-white dark:bg-dark-bg-secondary rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="font-poppins font-bold text-xl text-gray-900 dark:text-dark-text-primary mb-2">SMS Notifications</h2>
        <p className="text-sm text-gray-500 dark:text-dark-text-tertiary font-inter mb-4">Receive text messages for urgent updates</p>
        <SettingRow
          label="Important Updates"
          description="Receive SMS for critical updates only"
          checked={smsNotifs.importantUpdates}
          onToggle={() => setSmsNotifs((p) => ({ ...p, importantUpdates: !p.importantUpdates }))}
        />
        <SettingRow
          label="Messages"
          description="Get SMS notifications for new messages"
          checked={smsNotifs.messages}
          onToggle={() => setSmsNotifs((p) => ({ ...p, messages: !p.messages }))}
          divider={false}
        />
      </section>

      <button className="bg-[#1E3A8A] text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-blue-900 transition-colors">
        Save Preferences
      </button>
    </div>
  );
}

// Privacy Tab
function PrivacyTab() {
  const [showActivity, setShowActivity] = useState(false);
  const [anonymousReporting, setAnonymousReporting] = useState(true);
  const [shareAnalytics, setShareAnalytics] = useState(false);

  return (
    <div className="space-y-6">
      {/* Profile Privacy */}
      <section className="bg-white dark:bg-dark-bg-secondary rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="font-poppins font-bold text-xl text-gray-900 dark:text-dark-text-primary mb-6">Profile Privacy</h2>
        <div className="mb-5">
          <label className="block text-sm text-gray-600 dark:text-dark-text-secondary mb-2 font-inter">Profile Visibility</label>
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 bg-white dark:bg-dark-bg-tertiary">
            <select className="w-full text-sm text-gray-800 dark:text-dark-text-primary font-inter outline-none bg-transparent">
              <option>Private (Only me)</option>
              <option>Company (Visible to colleagues)</option>
              <option>Public (Everyone)</option>
            </select>
          </div>
        </div>
        <SettingRow
          label="Show Activity Status"
          description="Let others see when you're online"
          checked={showActivity}
          onToggle={() => setShowActivity(!showActivity)}
        />
        <SettingRow
          label="Anonymous Reporting by Default"
          description="Make all your reports anonymous automatically"
          checked={anonymousReporting}
          onToggle={() => setAnonymousReporting(!anonymousReporting)}
          divider={false}
        />
      </section>

      {/* Data & Privacy */}
      <section className="bg-white dark:bg-dark-bg-secondary rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="font-poppins font-bold text-xl text-gray-900 dark:text-dark-text-primary mb-4">Data &amp; Privacy</h2>
        <SettingRow
          label="Share Analytics Data"
          description="Help us improve by sharing anonymous usage data"
          checked={shareAnalytics}
          onToggle={() => setShareAnalytics(!shareAnalytics)}
          divider={false}
        />

        <div className="mt-6 space-y-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          <button className="flex items-center justify-center gap-2 w-full border border-gray-300 dark:border-gray-600 text-[#1E3A8A] dark:text-blue-400 font-semibold text-sm py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Export my Data
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </button>
          <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <p className="text-sm text-blue-600 dark:text-blue-400 font-inter">You can download all your data including complaints, messages, and activity history.</p>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="border-2 border-red-300 dark:border-red-800 rounded-2xl p-6 bg-white dark:bg-dark-bg-secondary">
        <h2 className="font-poppins font-bold text-xl text-red-600 dark:text-red-400 mb-2">Danger Zone</h2>
        <p className="text-sm text-gray-600 dark:text-dark-text-secondary font-inter mb-5">Once you delete your account, there is no going back. Please be certain.</p>
        <Link
          to="/profile/delete-account"
          className="inline-flex items-center gap-3 bg-red-600 dark:bg-red-700 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-red-700 dark:hover:bg-red-800 transition-colors"
        >
          Delete Account
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            <line x1="10" y1="11" x2="10" y2="17"/>
            <line x1="14" y1="11" x2="14" y2="17"/>
          </svg>
        </Link>
      </section>
    </div>
  );
}

// Main Component
export default function ProfileSettings() {
  const { user, updateUser } = useAppContext();
  const [activeTab, setActiveTab] = useState('account');
  const [editing, setEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAccount = async (updatedData) => {
    setIsSaving(true);
    const success = await updateUser(updatedData);
    if (success) {
      setEditing(false);
    }
    setIsSaving(false);
  };

  const tabItems = [
    {
      key: "account",
      label: "Account",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
      ),
    },
    {
      key: "security",
      label: "Security",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      ),
    },
    {
      key: "notifications",
      label: "Notifications",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      ),
    },
    {
      key: "privacy",
      label: "Privacy",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg-primary">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-poppins font-bold text-3xl text-gray-900 dark:text-dark-text-primary">Profile Settings</h1>
          <p className="text-gray-500 dark:text-dark-text-tertiary font-inter mt-1">Manage your account settings and preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Sidebar nav */}
          <aside className="w-full lg:w-56 flex-shrink-0">
            <nav className="bg-white dark:bg-dark-bg-secondary rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-3">
              {tabItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => { setActiveTab(item.key); setEditing(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium font-inter transition-colors mb-1.5 last:mb-0 ${
                    activeTab === item.key
                      ? "bg-[#1E3A8A] text-white"
                      : "text-gray-600 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1">
            {activeTab === "account" && (
              <AccountTab
                user={user}
                editing={editing}
                isSaving={isSaving}
                onEdit={() => setEditing(true)}
                onCancel={() => setEditing(false)}
                onSave={handleSaveAccount}
              />
            )}
            {activeTab === "security" && <SecurityTab />}
            {activeTab === "notifications" && <NotificationsTab />}
            {activeTab === "privacy" && <PrivacyTab />}
          </main>
        </div>
      </div>
    </div>
  );
}
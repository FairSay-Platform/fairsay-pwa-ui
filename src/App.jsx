import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ProtectedRoutes from './components/ProtectedRoutes';
import { APP_STEPS } from './utils/constants';
import { Alert } from './components/Alert';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import CheckEmail from './pages/CheckEmail';
import CompleteProfile from './pages/CompleteProfile';
import EmployeeVerification from './pages/EmployeeVerification';
import AccountSuccess from './pages/AccountSuccess';
import Dashboard from './pages/Dashboard';
import ComplaintForm from './pages/ComplaintForm';
import ComplaintSuccess from './pages/ComplaintSuccess';
import MyComplaints from './pages/MyComplaints';
import EducationHub from './pages/EducationHub';
import Lesson from './pages/Lesson';
import Quiz from './pages/Quiz';
import AIAssistant from './pages/AIAssistant';
import Whistleblowing from './pages/Whistleblowing';
import Profile from './pages/Profile';
import ProfileSettings from './pages/ProfileSettings';
import DeleteAccount from './pages/DeleteAccount';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminComplaints from './pages/admin/AdminComplaints';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSecurity from './pages/admin/AdminSecurity';
import ComplaintFeedback from './pages/ComplaintFeedback';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          {/* Authentication Routes */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/check-email" element={<CheckEmail />} />

          {/* Dashboard - Logged in users only */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes step={APP_STEPS.EDUCATION}>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route path="/home" element={<Navigate to="/dashboard" replace />} />

          {/* Onboarding & Verification */}
          <Route
            path="/complete-profile"
            element={
              <ProtectedRoutes>
                <CompleteProfile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/employee-verification"
            element={
              <ProtectedRoutes>
                <EmployeeVerification />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/account-success"
            element={
              <ProtectedRoutes>
                <AccountSuccess />
              </ProtectedRoutes>
            }
          />

          {/* User Profile Management */}
          <Route path="/profile" element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          } />
          <Route path="/profile/settings" element={
            <ProtectedRoutes>
              <ProfileSettings />
            </ProtectedRoutes>
          } />
          <Route path="/profile/delete" element={
            <ProtectedRoutes>
              <DeleteAccount />
            </ProtectedRoutes>
          } />

          {/* Complaint Management - Requires Profile Verification */}
          <Route
            path="/my-complaints"
            element={
              <ProtectedRoutes step={APP_STEPS.PROFILE_COMPLETION}>
                <MyComplaints />
              </ProtectedRoutes>
            }
          />

          {/* Filing & Education - Requires Education Completion */}
          <Route path="/file-complaint" element={
            <ProtectedRoutes step={APP_STEPS.EDUCATION}>
              <ComplaintForm />
            </ProtectedRoutes>
          } />
          <Route path="/complaint-success" element={
            <ProtectedRoutes step={APP_STEPS.EDUCATION}>
              <ComplaintSuccess />
            </ProtectedRoutes>
          } />
          <Route path="/complaint-feedback" element={
            <ProtectedRoutes>
              <ComplaintFeedback />
            </ProtectedRoutes>
          } />

          {/* Learning Hub */}
          <Route path="/learning" element={<ProtectedRoutes><EducationHub /></ProtectedRoutes>} />
          <Route path="/learning/lesson/:courseId/:lessonId" element={<ProtectedRoutes><Lesson /></ProtectedRoutes>} />
          <Route path="/learning/quiz/:courseId" element={<ProtectedRoutes><Quiz /></ProtectedRoutes>} />
          
          {/* AI RAG */}
          <Route path="/ai-assistant" element={
            <ProtectedRoutes>
              <AIAssistant />
            </ProtectedRoutes>
          } />
          
          {/* Whistleblowing Route */}
          <Route path="/whistleblowing" element={
            <ProtectedRoutes>
              <Whistleblowing />
            </ProtectedRoutes>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<ProtectedRoutes requireAdmin={true}>
            <AdminDashboard /></ProtectedRoutes>} />
          <Route path="/admin/complaints" element={<ProtectedRoutes requireAdmin={true}><AdminComplaints /></ProtectedRoutes>} />
          <Route path="/admin/users" element={<ProtectedRoutes requireAdmin={true}><AdminUsers /></ProtectedRoutes>} />
          <Route path="/admin/security" element={<ProtectedRoutes requireAdmin={true}><AdminSecurity /></ProtectedRoutes>} />
          
          {/* Catch all - redirect to landing page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Alert />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
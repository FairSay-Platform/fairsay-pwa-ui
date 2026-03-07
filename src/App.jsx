import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ProtectedRoutes from './components/ProtectedRoutes';
import { APP_STEPS, USER_STATUS } from './utils/constants';
import { Alert } from './components/Alert';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import VerifyEmailNotice from './pages/VerifyEmail';
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
          <Route path={APP_STEPS.SIGN_IN} element={<SignIn />} />
          <Route path={APP_STEPS.SIGN_UP} element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/check-email" element={<CheckEmail />} />
          <Route path={APP_STEPS.VERIFY_EMAIL} element={<VerifyEmailNotice />} />

          {/* Onboarding & Verification */}
          <Route
            path={APP_STEPS.PROFILE_COMPLETION}
            element={
              <ProtectedRoutes>
                <CompleteProfile />
              </ProtectedRoutes>
            }
          />
          <Route
            path={APP_STEPS.EMPLOYEE_VERIFICATION}
            element={
              <ProtectedRoutes>
                <EmployeeVerification />
              </ProtectedRoutes>
            }
          />
          <Route
            path={APP_STEPS.ACCOUNT_SUCCESS}
            element={
              <ProtectedRoutes>
                <AccountSuccess />
              </ProtectedRoutes>
            }
          />

           {/* Dashboard - Logged in users only */}
          <Route
            path={APP_STEPS.DASHBOARD}
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route path="/home" element={<Navigate to="/dashboard" replace />} />

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

          {/* Complaint Management - Requires Approved User Status */}
          <Route
            path="/my-complaints"
            element={
              <ProtectedRoutes step={USER_STATUS.APPROVED}>
                <MyComplaints />
              </ProtectedRoutes>
            }
          />

          {/* Filing & Education - Requires Education Completion */}
          <Route
            path="/file-complaint"
            element={
              <ProtectedRoutes step={USER_STATUS.EDUCATION}>
                <ComplaintForm />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/complaint-success"
            element={
              <ProtectedRoutes step={APP_STEPS.EDUCATION}>
                <ComplaintSuccess />
              </ProtectedRoutes>
            }
          />
         <Route 
  path="/feedback" 
  element={
    <ProtectedRoutes>
      <ComplaintFeedback />
    </ProtectedRoutes>
  } 
/>

          {/* Learning Hub */}
          <Route
            path="/learning"
            element={
              <ProtectedRoutes>
                <EducationHub />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/learning/lesson/:courseId/:lessonId"
            element={
              <ProtectedRoutes>
                <Lesson />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/learning/quiz/:courseId"
            element={
              <ProtectedRoutes>
                <Quiz />
              </ProtectedRoutes>
            }
          />

          {/* AI RAG */}
          <Route
            path="/ai-assistant"
            element={
              <ProtectedRoutes>
                <AIAssistant />
              </ProtectedRoutes>
            }
          />
          {/*Whistleblowing Route*/}
          <Route path="/whistleblowing" element={
              <Whistleblowing />
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path={APP_STEPS.ADMIN_DASHBOARD} element={<ProtectedRoutes requireAdmin={true}>
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
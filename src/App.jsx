import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

// Pages
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AdminRegister from './pages/AdminRegister';
import EmployeeRegister from './pages/EmployeeRegister';
import ManagerRegister from './pages/ManagerRegister';
import EmployeeList from './pages/EmployeeList';
import DepartmentList from './pages/DepartmentList';
import EmployeeAttendance from './pages/EmployeeAttendance';
import EmployeeSalary from './pages/EmployeeSalary';
import UpdateEmployee from './pages/UpdateEmployee';
import UpdateSalary from './pages/UpdateSalary';
import UpdateManager from './pages/UpdateManager';
import ViewDeptEmp from './pages/ViewDeptEmp';
import EmployeeProfile from './pages/EmployeeProfile';
import EmpLeaves from './pages/EmpLeaves';
import ManageLeaveRequests from './pages/ManageLeaveRequests';
import MyLeaveRequests from './pages/MyLeaveRequests';
import JobPostForm from './pages/JobPostForm';
import JobPostingsList from './pages/JobPostingsList';
import JobApplyForm from './pages/JobApplyForm';
import ManagerApplications from './pages/ManagerApplications';
import ContactMessages from './pages/ContactMessages';


// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Auth Context
import { AuthProvider, useAuth } from './context/AuthContext';
import EmpLeave from './pages/EmpLeaves';

// Optional NotFound Page (Create if needed)
const NotFound = () => (
  <div className="p-8 text-center text-xl text-red-600 font-semibold">
    404 - Page Not Found
  </div>
);

// ✅ Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* Public / Auth Routes */}
          <Route path="/authLayout" element={<AuthLayout />} />
          <Route path="/about" element={<AuthLayout><About /></AuthLayout>} />
          <Route path="/contact" element={<AuthLayout><Contact /></AuthLayout>} />
          <Route path="/post-job" element={<JobPostForm />} />
          <Route path="/job-postings" element={<JobPostingsList />} />
          <Route path="/apply-job/:jobId" element={<JobApplyForm />} />


          <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="/register/admin" element={<AuthLayout><AdminRegister /></AuthLayout>} />

          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout><Dashboard /></MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/employees" element={
            <ProtectedRoute>
              <MainLayout><EmployeeList /></MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/departments" element={
            <ProtectedRoute>
              <MainLayout><DepartmentList /></MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/add-attendance" element={
            <ProtectedRoute>
              <MainLayout><EmployeeAttendance /></MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/register/employee" element={
            <ProtectedRoute>
              <MainLayout><EmployeeRegister /></MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/register/manager" element={
            <ProtectedRoute>
              <MainLayout><ManagerRegister /></MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/employee-salary" element={
            <ProtectedRoute>
              <MainLayout><EmployeeSalary /></MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/update/employee/:id" element={
            <ProtectedRoute>
              <MainLayout><UpdateEmployee /></MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/update/salary/:id" element={
            <ProtectedRoute>
              <MainLayout><UpdateSalary /></MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/update/manager/:id" element={
            <ProtectedRoute>
              <MainLayout><UpdateManager /></MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/view-department-employees/:managerId" element={
            <ProtectedRoute>
              <MainLayout><ViewDeptEmp /></MainLayout>
            </ProtectedRoute>
          } />


          <Route path="/employee-profile" element={
            <ProtectedRoute>
              <MainLayout><EmployeeProfile /></MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/EmpLeave" element={
            <ProtectedRoute>
              <MainLayout><EmpLeaves /></MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/my-leaves" element={
            <ProtectedRoute>
              <MainLayout><MyLeaveRequests /></MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/manage-leaves" element={
            <ProtectedRoute>
              <MainLayout><ManageLeaveRequests /></MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/manager/applications" element={
            <ProtectedRoute>
              <MainLayout><ManagerApplications /></MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/contact/messages" element={
            <ProtectedRoute>
              <MainLayout><ContactMessages /></MainLayout>
            </ProtectedRoute>
          } />

          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

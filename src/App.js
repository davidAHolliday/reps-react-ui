import logo from './logo.svg';
import './App.css';
import MyForm from './forms/RepsForm';
import ViolationPage from './forms/ViolationPage';
import FailureToComplete from './forms/FailureToComplete';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './secuirty/Login';
import Register from './secuirty/Register';
import Dashboard from './components/Dashboard';
import StudentDashboard from './components/DashboardStudent ';
import { useState,useEffect } from 'react';
import LoadingPage from './components/LoadingPage';
import AuthRoute from './secuirty/AuthRoute';
import CreateAssignmentForm from './components/createAssignmentForm';
import AdminDashboard from './components/dashboard/admin/adminDashboard';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/infractionAssignments/:param1/:param2" element={<ViolationPage />} />
        <Route path="/" element={<Login />} />

        {/* Use AuthRoute for role-based access control */}
        <Route path="/dashboard/admin" element={<AdminDashboard/>} allowedRoles={["ADMIN"]} />
        <Route path="/dashboard/student" element={<StudentDashboard />} allowedRoles={["STUDENT"]} />
        <Route path="/dashboard/teacher" element={<Dashboard />} allowedRoles={["TEACHER"]} />
        <Route path="/forms/start-punishment" element={<MyForm />} />
        <Route path="/forms/ftc-closure" element={<FailureToComplete />} />
        {/* <Route path="/forms/create-assignment" element={<CreateAssignmentForm/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;

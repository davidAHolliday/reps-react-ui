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

function App() {


  const [loggedInRole, setLoggedInRole] = useState(sessionStorage.getItem("role"));


  
  useEffect(() => {
    const role = sessionStorage.getItem("role");
    setLoggedInRole(role);
  }, []); 



  
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/infractionAssignments/:param1/:param2" element={<ViolationPage />} />
      <Route path="/" element={<Login/>} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/forms/start-punishment" element={<MyForm />} />
      <Route path="/forms/ftc-closure" element={<FailureToComplete />} />
      </Routes>
    </Router>
  );


}

export default App;

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
import { useState } from 'react';

function App() {
  const [isStudent,setIsStudent] = useState(true)
  const [isInstructor,setIsInstuctor] = useState(true)


  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/infractionAssignments/:param1" element={<ViolationPage />} />
      <Route path="/" element={<Login/>} />
      {isStudent && <Route path="/dashboard" element={<StudentDashboard/>} />
 }

      {isInstructor && <Route path="/dashboard" element={<StudentDashboard/>} />
 }
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/forms/start-punishment" element={<MyForm />} />
      <Route path="/forms/ftc-closure" element={<FailureToComplete />} />
      </Routes>
    </Router>
  );


}

export default App;

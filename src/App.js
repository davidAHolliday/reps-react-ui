import './App.css';
import MyForm from './forms/RepsForm';
import ViolationPage from './forms/ViolationPage';
import FailureToComplete from './forms/FailureToComplete';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './secuirty/Login';
import Register from './secuirty/Register';
import StudentDashboard from './components/dashboard/student/DashboardStudent ';
import AdminDashboard from './components/dashboard/admin/adminDashboard';
import PDFReport from './components/dashboard/admin/reports/PDFReport';
import { PDFViewer } from '@react-pdf/renderer';
import TeacherDashboard from './components/dashboard/teacher/teacherDashboard';
import GlobalArchivedPunishmentPanel from './components/dashboard/global/globalArchivedPunishmentPanel';

function App() {

  return (
    <div className='App'>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/infractionAssignments/:param1/:param2" element={<ViolationPage />} />
        <Route path="/" element={<Login />} />

        {/* Use AuthRoute for role-based access control */}
        <Route path="/dashboard/admin" element={<AdminDashboard/>} allowedRoles={["ADMIN"]} />
        <Route path="/dashboard/student" element={<StudentDashboard />} allowedRoles={["STUDENT"]} />
        <Route path="/dashboard/teacher" element={<TeacherDashboard />} allowedRoles={["TEACHER"]} />
        <Route path="/forms/start-punishment" element={<MyForm />} />
        <Route path="/forms/ftc-closure" element={<FailureToComplete />} />
        <Route path="/admin/archived" element={<GlobalArchivedPunishmentPanel />} />


        <Route path="/forms/report" element={<> 
          <PDFViewer width="100%" height="800px">

        <PDFReport />
        </PDFViewer>
        </>} />

        {/* <Route path="/forms/create-assignment" element={<CreateAssignmentForm/>} /> */}
      </Routes>
    </Router>
    </div>
  );
}

export default App;

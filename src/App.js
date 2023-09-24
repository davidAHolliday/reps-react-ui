import logo from './logo.svg';
import './App.css';
import MyForm from './forms/RepsForm';
import ViolationPage from './forms/ViolationPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/infractionAssignments/:param1" element={<ViolationPage />} />
        <Route path="/forms/start-punishment" element={<MyForm />} />
      </Routes>
    </Router>
  );


}

export default App;

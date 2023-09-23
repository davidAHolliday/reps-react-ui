import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyForm from './forms/RepsForm';
import Login from './secuirty/Login';
import Register from './secuirty/Register';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        HEADERS
      </header>
      <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/create-punishment" element={<MyForm/>} />
        {/* Add more routes for other pages */}
      </Routes>
    </Router>
    </div>
  );
}

export default App;

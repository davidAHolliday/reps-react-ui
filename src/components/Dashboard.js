import React, { useEffect , useState} from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [loggedIn,setLoggedIn] = useState();
  const handleLogout = () => {
    // Clear the session authorization (JWT token) here
    sessionStorage.removeItem('Authorization');
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("schoolName")
    sessionStorage.removeItem("email")
    
    // You can also redirect the user to the login page or any other page after logout
    window.location.href = '/login';
  };


  useEffect(()=>{
    if(sessionStorage.getItem("Authorization")=== null){
      window.location.href = '/login';
  
    }else{
      setLoggedIn(true);
    }
  })


  return (
    loggedIn &&
    <div className="dashboard">
          <button onClick={handleLogout}>Logout</button>
      <h1>Greetings, {sessionStorage.getItem("userName")}!</h1>
      <p>School:{sessionStorage.getItem("schoolName")}</p>
      <p>Email: {sessionStorage.getItem("email")}</p>

      <div className="button-container">
        <Link to="/forms/start-punishment" className="dashboard-button">
          Start Punishment
        </Link>
        <Link to="/forms/ftc-closure" className="dashboard-button">
          FTC Closure
        </Link>
        <Link to="/infractionAssignments/tardy-1" className="dashboard-button">
          Infraction Tardy Level 1
        </Link>
        <Link to="/infractionAssignments/tardy-2" className="dashboard-button">
          Infraction Tardy Level 2
        </Link>
        <Link to="/more-info" className="dashboard-button">
          More Info
        </Link>
      </div>

      {/* You can add logos/images here */}
      {/* For example: <img src="logo.png" alt="Logo" /> */}
    </div>
  );
};

export default Dashboard;

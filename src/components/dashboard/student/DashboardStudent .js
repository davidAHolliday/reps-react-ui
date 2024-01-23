import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../utils/jsonData';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NotificationBar from '../../notification-bar/NotificationBar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import StudentClosedPunishmentPanel from './studentClosePunihsmentPanel';
import StudentOpenPunishmentPanel from './studentOpenPunihsmentPanel';
import ShoutOutReport from './shoutOutReport';
import WarningIcon from '@mui/icons-material/Warning';
import ShoutOutWidget from './shoutOutWidget';
import TotalPositivePoints from './positivePointsComponents';
import Card from '@mui/material/Card';
import BlankPanelForTest from './blankPanelForTest';
import ViolationPage from '../../../forms/ViolationPage';



const StudentDashboard = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [listOfInfractionsAssociatedByTeacher, setListOfInfractionsAssociatedByTeacher] = useState([]);
  const [data, setData] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openNotificationDrawer, setOpenNotificationDrawer] = useState(false)
  const [panelName,setPanelName] = useState("openAssignments")
  const [selectAssignmentToStart,setSelectAssignmentToStart] = useState();
  const [studentDetails,setStudentDetails] = useState();


  const handleLogout = () => {
    sessionStorage.removeItem('Authorization');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('schoolName');
    sessionStorage.removeItem('email');
    window.location.href = '/login';
  };

  useEffect(() => {
    if (sessionStorage.getItem('Authorization') === null) {
      window.location.href = '/login';
    } else {
      setLoggedIn(true);
    }
  }, []);





  const headers = {
    Authorization: 'Bearer ' + sessionStorage.getItem('Authorization'),
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/punish/v1/punishments`, { headers })
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        setListOfInfractionsAssociatedByTeacher([]);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${baseUrl}/student/v1/email/${sessionStorage.getItem("email")}`, { headers })
      .then(function (response) {
        setStudentDetails(response.data);
        console.log("student data",response.data)
      })
      .catch(function (error) {
        setStudentDetails([]);
        console.log(error);
      });
  }, []);



  const toggleNotificationDrawer = (open) => {
    setOpenNotificationDrawer(open);
  };

  const handleStartAssignment = (data) =>{
    setSelectAssignmentToStart(data)
    setPanelName("startAssignment")
  }

  return (
    loggedIn && (
      <>
        <div className ="app-bar">
        <Toolbar style={{background:"yellow", color: "black"}}>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Welcome, {sessionStorage.getItem('userName')}
            </Typography>
            <NotificationsIcon style={{marginRight:"15px"}} onClick={()=> toggleNotificationDrawer(true) }/>
    

            <AccountBoxIcon/>           
              <IconButton type="button" color="inherit" onClick={handleLogout}>
              Logout
            </IconButton>

          </Toolbar>
        </div>
       <div className='page'>
      <div className='student-main-content'> 
      {/* start-nav-bar */}
    
    

      <div className='dashboard-title'>
      <div className ="student-main-content-menu">
      <div>Student Dashboard</div>

            {/* Mandatory Open Assignment Drop Down */}
          <button 
          className='student-drop-btn' 
          onClick={() => {
            // openDropdown("studentDropdown")
            setPanelName("openAssignments")
        }}
        >
          Mandatory Open Assignments
        </button>

             

    
  {/* Histroy Drop Down */}
  <button 
          className='student-drop-btn' 
          onClick={() => {
      // openDropdown("referralDropdown")
       setPanelName("closedAssignments")}}
  >
    History
  </button>

    {/* Histroy Drop Down */}
    <button disabled={true}
          style={{opacity:.4}}

          className='student-drop-btn' 
          onClick={() => {
      // openDropdown("referralDropdown")
       setPanelName("closedAssignments")}}
  >
    Resources
  </button>

      </div>
      </div>

      { false ? 
      <div style={{backgroundColor:"white",height:"80vh",marginTop:"10px"}} className='student-panel'>
      <BlankPanelForTest/>
      </div>:<>

      


      <div className='student-overview'>
        <div className='student-overview-first'>
        <Card variant="outlined">
        <ShoutOutWidget/>
        </Card>
        </div>
        <div className='student-overview-second'>
        <Card style={{height:"200px"}}variant="outlined">
          <TotalPositivePoints data={studentDetails}/>
          </Card>
        </div>

      </div>

      <div className = "student-panel">
          {panelName === "shoutOutPanel" &&<ShoutOutReport/>}
        {panelName === "closedAssignments" &&<StudentClosedPunishmentPanel/>}
        {panelName === "openAssignments" &&<StudentOpenPunishmentPanel handleStartAssignment={handleStartAssignment}/>}
        {panelName === "startAssignment" &&<ViolationPage data={selectAssignmentToStart} />}
      </div>
      </>
}

        <Drawer anchor='right' open={openNotificationDrawer} onClose={()=> toggleNotificationDrawer(false)}>
        <NotificationBar />
        </Drawer>
      </div>
      </div>
      </>
    )
  );
};

export default StudentDashboard;

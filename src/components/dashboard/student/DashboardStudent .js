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



const StudentDashboard = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [listOfInfractionsAssociatedByTeacher, setListOfInfractionsAssociatedByTeacher] = useState([]);
  const [data, setData] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openNotificationDrawer, setOpenNotificationDrawer] = useState(false)
  const [panelName,setPanelName] = useState("openAssignments")


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

  const toggleDrawer = (open) => {
    setOpenDrawer(open);
  };

  const toggleNotificationDrawer = (open) => {
    setOpenNotificationDrawer(open);
  };

  return (
    loggedIn && (
      <>
        <div className ="app-bar">
          <Toolbar>
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
      <div className ="student-main-content-menu">
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

                  {/* Shoutout Drop Down */}
        <button 
          className='student-drop-btn' 
          onClick={() => {
            // openDropdown("teacherDropDown")
            setPanelName("shoutOutPanel")
            }}
        >
          Shout Outs!
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

   {/* Extra Support Drop Down */}
   <button 
          className='student-drop-btn' 
          onClick={() => {
      // openDropdown("referralDropdown")
       setPanelName("")}}
  >
    Extra Support
  </button>
      </div>
      {/* end-nav-bar */}

      <div className='dashboard-title'>
        Student Dashboard
      </div>

      <div className='student-overview'>
        <div className='student-overview-first'>
        <Card variant="outlined">
        <ShoutOutWidget/>
        </Card>
        </div>
        <div className='student-overview-second'>
        <Card style={{height:"200px"}}variant="outlined">
          <TotalPositivePoints/>
          </Card>
        </div>

      </div>

      <div className = "student-panel">
      </div>
      {panelName === "shoutOutPanel" &&<ShoutOutReport/>}
        {panelName === "closedAssignments" &&<StudentClosedPunishmentPanel/>}
        {panelName === "openAssignments" &&<StudentOpenPunishmentPanel/>}

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

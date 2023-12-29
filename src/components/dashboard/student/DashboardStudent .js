import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../../utils/jsonData';
import {CardComponent} from '../../CardComponet';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {TableComponent} from "../../TableComponent"
import {ActionCard} from "../../CardComponet"
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NotificationBar from '../../notification-bar/NotificationBar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import StudentPanel from './studentClosePunihsmentPanel';
import PunishmentPanel from '../panel/punishmentPanel';
import CreatePunishmentPanel from '../panel/createPunishmentPanel';
import CreateNewStudentPanel from '../panel/createNewStudentPanel';
import BlankPanelForTest from './blankPanelForTest';
import StudentClosedPunishmentPanel from './studentClosePunihsmentPanel';
import StudentOpenPunishmentPanel from './studentOpenPunihsmentPanel';
import ShoutOutReport from './shoutOutReport';
import WarningIcon from '@mui/icons-material/Warning';


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
         

      <div className='side-bar'>
        <div className="side-bar-widget">
        <WarningIcon  color="warning"/> Assignments 3 days late will result in In Lunch Detention 
        </div>
        <div className="side-bar-widget">
        <WarningIcon color ="error"/> Assignments 5 or More Days Past Due, will result in In School Suspension 
        </div>
     {/* <button onClick={handleGeneratePDF}>Generate PDF Report</button> */}

      </div>
      <div className='main-content'> 
      <div className = "main-content-menu">
      <div style={{display:"flex",backgroundColor:"rgb(25, 118, 210)",marginTop:"10px", marginBlock:"5px"}}>
  
  {/* Histroy Drop Down */}
  <button 
    className='dropbtn' 
    onClick={() => {
      // openDropdown("referalDropdown")
       setPanelName("closedAssignments")}}
    style={{ flex: 1, outline:"1px solid  white", padding: "5px", textAlign: "center"}}
  >
    History
  </button>
    {/* Shoutout Drop Down */}
    <button 
    className='dropbtn' 
    onClick={() => {
      // openDropdown("teacherDropDown")
      setPanelName("shoutOutPanel")
  }}
    style={{ flex: 1, outline:"1px solid  white", padding: "5px", textAlign: "center"}}
  >
    Shout Outs!
  </button>


    {/* Student Drop Down */}
    <button 
    className='dropbtn' 
    onClick={() => {
      // openDropdown("studentDropdown")
      setPanelName("openAssignments")
  }}
    style={{ flex: 1, outline:"1px solid  white", padding: "5px", textAlign: "center"}}
  >
    Active Assignments
  </button>
        </div>
      </div>
      <div className = "">
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

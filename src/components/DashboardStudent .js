import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../utils/jsonData';
import {CardComponent} from './CardComponet';
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
import {TableComponent} from "./TableComponent"
import {ActionCard} from "./CardComponet"
import AccountBoxIcon from '@mui/icons-material/AccountBox';import NotificationBar from './notification-bar/NotificationBar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import StudentPanel from './dashboard/student/studentClosePunihsmentPanel';
import PunishmentPanel from './dashboard/panel/punishmentPanel';
import CreatePunishmentPanel from './dashboard/panel/createPunishmentPanel';
import CreateNewStudentPanel from './dashboard/panel/createNewStudentPanel';
import BlankPanelForTest from './dashboard/student/blankPanelForTest';
import StudentClosedPunishmentPanel from './dashboard/student/studentClosePunihsmentPanel';
import StudentOpenPunishmentPanel from './dashboard/student/studentOpenPunihsmentPanel';


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
      <div style={{ maxWidth: '90%', margin: '0 auto' }}> {/* Center the app within 90% of the screen */}
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Welcome, {sessionStorage.getItem('userName')}
            </Typography>
            <NotificationsIcon style={{marginRight:"15px"}} onClick={()=> toggleNotificationDrawer(true) }/>
    

            <AccountBoxIcon/>           
              <IconButton type="button" color="inherit" onClick={handleLogout}>
              Logout
            </IconButton>

          </Toolbar>
          
        </AppBar>
        <Drawer anchor='right' open={openNotificationDrawer} onClose={()=> toggleNotificationDrawer(false)}>
        <NotificationBar />
        </Drawer>

        <Drawer anchor="left" open={openDrawer} onClose={() => toggleDrawer(false)}>
          <List>
            <ListItem button>
              <ListItemText primary="Students" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Resources" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Referral" />
            </ListItem>
          </List>
        </Drawer>
        <div style={{ display: 'flex', justifyContent: 'center',backgroundColor:"white" }}>
          <ActionCard url="/" title="School Bulletin" descriptions="Stay Up To Date with all your School Lastest" style={{ backgroundColor: 'blue', color: 'white' }} />
        </div>
        <div style={{display:"flex",backgroundColor:"rgb(25, 118, 210)",marginTop:"10px", marginBlock:"5px"}}>
   <Typography onClick={()=>setPanelName("closedAssignments")} backgroundColor={panelName ==="closedAssignments" && "Blue"} color="white" variant="h6" style={{ flex: 1, outline:"1px solid  white",padding:
"5px",textAlign: "center"}}>
   Close Assignments
        </Typography>
        <Typography onClick={()=>setPanelName("openAssignments")}backgroundColor={panelName ==="openAssignments" && "Blue"} color="white" variant="h6" style={{ flex: 1, outline:"1px solid  white",padding:
"5px",textAlign: "center"}}>
      Pending Assignments

        </Typography>
        {/* <Typography onClick={()=>setPanelName("notification")}backgroundColor={panelName =="student" && "Blue"} color="white" variant="h6" style={{ flex: 1, outline:"1px solid  white",padding:
"5px",textAlign: "center"}}>
       Notifications

        </Typography> */}
        </div>

{panelName === "closedAssignments" &&<StudentClosedPunishmentPanel/>}
{panelName === "openAssignments" &&<StudentOpenPunishmentPanel/>}






{/* 
        {data.length > 0 && <TableComponent title={"OPEN ASSIGNMENTS"} list={data} status={'OPEN'} />}
        {data.length > 0 && <TableComponent title={"CLOSED ASSIGMENTS"}list={data} status={'CLOSED'} />} */}




      </div>
    )
  );
};

export default StudentDashboard;

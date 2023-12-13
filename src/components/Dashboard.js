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
import StudentPanel from './dashboard/panel/studentPanel';
import PunishmentPanel from './dashboard/panel/punishmentPanel';
import CreatePunishmentPanel from './dashboard/panel/createPunishmentPanel';
import CreateNewStudentPanel from './dashboard/panel/createNewStudentPanel';
import StudentProfile from './StudentProfile';


const Dashboard = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [listOfInfractionsAssociatedByTeacher, setListOfInfractionsAssociatedByTeacher] = useState([]);
  const [data, setData] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openNotificationDrawer, setOpenNotificationDrawer] = useState(false)
  const [panelName,setPanelName] = useState("punishment")

  const handleLogout = () => {
    sessionStorage.removeItem('Authorization');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('schoolName');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('role');
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
        {/* <div style={{ display: 'flex', justifyContent: 'center',backgroundColor:"white" }}>
          <ActionCard url="/forms/start-punishment" title="Punishment" descriptions="Log an infraction and initiate a punishment" style={{ backgroundColor: 'blue', color: 'white' }} />
          <ActionCard url="/forms/ftc-closure" title="Review Assignments" descriptions="Review Student Assignment" style={{ backgroundColor: 'green', color: 'white' }} />
          <ActionCard url="/" title="Open Reports" descriptions="See Reports of Infraction Stats" style={{ backgroundColor: 'orange', color: 'white' }} />
          <ActionCard url="/" title="Other Link" descriptions="We can add other things here" style={{ backgroundColor: 'purple', color: 'white' }} />
        </div> */}
        <div style={{display:"flex",backgroundColor:"rgb(25, 118, 210)",marginTop:"10px", marginBlock:"5px"}}>
   <Typography onClick={()=>setPanelName("punishment")} backgroundColor={panelName =="punishment" && "Blue"} color="white" variant="h6" style={{ flex: 1, outline:"1px solid  white",padding:
"5px",textAlign: "center"}}>
   Punishments
        </Typography>
        <Typography onClick={()=>setPanelName("student")}backgroundColor={panelName =="student" && "Blue"} color="white" variant="h6" style={{ flex: 1, outline:"1px solid  white",padding:
"5px",textAlign: "center"}}>
   Student
        </Typography>
        <Typography onClick={()=>setPanelName("createPunishment")} backgroundColor={panelName =="createPunishment" && "Blue"} color="white" variant="h6" style={{ flex: 1, outline:"1px solid  white",padding:
"5px",textAlign: "center"}}>
  Create Punishment
        </Typography>
        <Typography onClick={()=>setPanelName("createNewStudent")} backgroundColor={panelName =="createNewStudent" && "Blue"} color="white" variant="h6" style={{ flex: 1, outline:"1px solid  white",padding:
"5px",textAlign: "center"}}>
  Create Student
        </Typography>
        </div>
{panelName === "student" &&<StudentPanel/>}
{panelName === "punishment" &&<PunishmentPanel/>}
{panelName === "createPunishment" && <CreatePunishmentPanel/>}
{panelName === "createNewStudent" && <CreateNewStudentPanel/>}





{/* 
        {data.length > 0 && <TableComponent title={"OPEN ASSIGNMENTS"} list={data} status={'OPEN'} />}
        {data.length > 0 && <TableComponent title={"CLOSED ASSIGMENTS"}list={data} status={'CLOSED'} />} */}




      </div>
    )
  );
};

export default Dashboard;

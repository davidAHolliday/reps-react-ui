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
import AccountBoxIcon from '@mui/icons-material/AccountBox';import NotificationBar from '../../notification-bar/NotificationBar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import StudentPanel from '../panel/studentPanel';
import PunishmentPanel from '../panel/punishmentPanel';
import CreatePunishmentPanel from '../panel/createPunishmentPanel';
import CreateNewStudentPanel from '../panel/createNewStudentPanel';
import StudentProfile from '../../StudentProfile';
import TeacherStudentPanel from './teacherPanels/teacherStudentPanel';
import TeacherFTCPanel from './teacherPanels/FTCpanel';
import TeacherPunishmentPanel from './teacherPanels/teacherPunishmentPanel';


const TeacherDashboard = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [listOfInfractionsAssociatedByTeacher, setListOfInfractionsAssociatedByTeacher] = useState([]);
  const [data, setData] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openNotificationDrawer, setOpenNotificationDrawer] = useState(false)
  const [panelName,setPanelName] = useState("punishment")
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    referalDropdown:false,
    teacherDropdown:false,
    studentDropdown:false,
    toolsDropdown:false,
    ftcDropdown:false
  });
  const [punishmentFilter, setPunishmentFilter] =useState("OPEN")



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

  const openDropdown =(field)=>{
    setIsDropdownOpen({})
    setIsDropdownOpen((prev)=>({
      ...prev, [field]: !isDropdownOpen[field]
    }))
  }

  const renderDropdownContent = (dropdownState,filterValue,label,panelName) =>{
    return(
      <div onClick={()=>{
        setIsDropdownOpen(dropdownState)
        setPunishmentFilter(filterValue)
        setPanelName(panelName)}}
        className='dropdown-item'>{label}
        </div>
    )
  }

  return (
    loggedIn && (
      <>
        <div className ="app-bar">
          <Toolbar>
            {/* <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton> */}
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
         
      {/* <div className='side-bar'>
        <div className="side-bar-widget">
          <DetentionWidget/>
        </div>
        <div className="side-bar-widget">
          <ISSWidget/>
        </div>
     <button onClick={handleGeneratePDF}>Generate PDF Report</button>

      </div> */}
      <div className='main-content'> 
      <div className = "main-content-menu">
      <div style={{display:"flex",backgroundColor:"rgb(25, 118, 210)",marginTop:"10px", marginBlock:"5px"}}>
  
  {/* Punishment Drop Down */}
  <button 
    className='dropbtn' 
    onClick={() => {
      openDropdown("referalDropdown")
       setPanelName("punishment")}}
    style={{ flex: 1, outline:"1px solid  white", padding: "5px", textAlign: "center"}}
  >
    Referals
  </button>
  <div className={isDropdownOpen.referalDropdown ? 'dropdown-content show' : 'dropdown-content'}>
    

{renderDropdownContent(!isDropdownOpen.referalDropdown,"OPEN","Open","punishment")}
{renderDropdownContent(!isDropdownOpen.referalDropdown,"CFR","CFR","punishment")}
{renderDropdownContent(!isDropdownOpen.referalDropdown,"CLOSED","Closed","punishment")}
{renderDropdownContent(!isDropdownOpen.referalDropdown,"ALL","All","punishment")}
  </div>

    {/* Student Drop Down */}
    <button 
    className='dropbtn' 
    onClick={() => {
      openDropdown("studentDropdown")
      // setPanelName("punishment")
  }}
    style={{ flex: 1, outline:"1px solid  white", padding: "5px", textAlign: "center"}}
  >
    Student
  </button>
      {/* Margin Left is used to move dropdown under the buttons */}
  <div style={{marginLeft:"25%"}} className={isDropdownOpen.studentDropdown ? 'dropdown-content show' : 'dropdown-content'}>
    <div onClick={()=>{
      setPanelName("student") 
      setIsDropdownOpen(!isDropdownOpen.studentDropdown)
 
     }}className='dropdown-item'>View Students</div>
     
  </div>

    {/* Student Drop Down */}
    <button 
    className='dropbtn' 
    onClick={() => {
      openDropdown("toolsDropdown")
      // setPanelName("punishment")
  }}
    style={{ flex: 1, outline:"1px solid  white", padding: "5px", textAlign: "center"}}
  >
    Tools
  </button>
      {/* Margin Left is used to move dropdown under the buttons */}
  <div style={{marginLeft:"50%"}} className={isDropdownOpen.toolsDropdown ? 'dropdown-content show' : 'dropdown-content'}>
    <div onClick={()=>{
      setPanelName("createNewStudent")  
      setIsDropdownOpen(!isDropdownOpen.toolsDropdown)

     }}className='dropdown-item'>New Student</div>
      <div onClick={()=>{
      setPanelName("createPunishment")  
      setIsDropdownOpen(!isDropdownOpen.toolsDropdown)

     }}className='dropdown-item'>New Referral</div>
     
  </div>

    {/* FTC Drop Down */}
    <button 
    className='dropbtn' 
    onClick={() => {
      openDropdown("ftcDropdown")
      // setPanelName("punishment")
  }}
    style={{ flex: 1, outline:"1px solid  white", padding: "5px", textAlign: "center"}}
  >
    FTC
  </button>
      {/* Margin Left is used to move dropdown under the buttons */}
  <div style={{marginLeft:"75%"}} className={isDropdownOpen.ftcDropdown ? 'dropdown-content show' : 'dropdown-content'}>
    <div onClick={()=>{
      setPanelName("ftc")  
      setIsDropdownOpen(!isDropdownOpen.ftcDropdown)

     }}className='dropdown-item'>Pending Assignments</div>
   
     
  </div>
        </div>
      </div>
      <div className = "main-content-panel">
{panelName === "student" &&<TeacherStudentPanel/>}
{panelName === "punishment" &&<TeacherPunishmentPanel filter={punishmentFilter}/>}
{panelName === "createPunishment" && <CreatePunishmentPanel/>}
{panelName === "createNewStudent" && <CreateNewStudentPanel/>}
{panelName === "ftc" && <TeacherFTCPanel/>}


      </div>

        <Drawer anchor='right' open={openNotificationDrawer} onClose={()=> toggleNotificationDrawer(false)}>
        <NotificationBar />
        </Drawer>
      </div>
      </div>
      </>
    )
  );
};

export default TeacherDashboard;

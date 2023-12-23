import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../utils/jsonData';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PunishmentPanel from '../panel/punishmentPanel';
import CreatePunishmentPanel from '../panel/createPunishmentPanel';
import CreateNewStudentPanel from '../panel/createNewStudentPanel';
import StudentPanel from '../panel/studentPanel';
import NotificationBar from '../../notification-bar/NotificationBar';
import ISSWidget from './issWidget';
import DetentionWidget from './detentionWidget';
import AdminPunishmentPanel from './adminPunishmentPanel';
import AdminTeacherPanel from './adminTeacherPanel';
import AdminUserRoleManagement from './adminUserRoleManagement';
import { Navigate } from 'react-router-dom';



const AdminDashboard = () => {
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
    toolsDropdown:false
  });
const [punishmentFilter, setPunishmentFilter] =useState("OPEN")
const [showPDF, setShowPDF] = useState(false); // State to toggle the PDF display
  
const handleGeneratePDF = () => {
  window.open('/forms/report', '_blank'); // '_blank' will open the URL in a new tab/window
};

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

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState); // Toggle the state value
  };


//   'absolute'
// | 'fixed'
// | 'relative'
// | 'static'

//Close and Open dropdowns by field name
const openDropdown =(field)=>{
  setIsDropdownOpen({})
  setIsDropdownOpen((prev)=>({
    ...prev, [field]: !isDropdownOpen[field]
  }))
}

  return (
    loggedIn && (
      <>
        <div className ="app-bar">
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
        </div>
       <div className='page'>
         
      <div className='side-bar'>
        <div className="side-bar-widget">
          <DetentionWidget/>
        </div>
        <div className="side-bar-widget">
          <ISSWidget/>
        </div>
     <button onClick={handleGeneratePDF}>Generate PDF Report</button>

      </div>
      <div className='main-content'> 
      <div className = "main-content-menu">
      <div style={{display:"flex",backgroundColor:"rgb(25, 118, 210)",marginTop:"10px", marginBlock:"5px"}}>
  
  {/* Punishment Drop Down */}
  <button 
    className='dropbtn' 
    onClick={() => {
      openDropdown("referalDropdown")
       setPanelName("punishment")
  }}
    style={{ flex: 1, outline:"1px solid  white", padding: "5px", textAlign: "center"}}
  >
    Referals
  </button>
  <div className={isDropdownOpen.referalDropdown ? 'dropdown-content show' : 'dropdown-content'}>
    <div onClick={()=>{
      setIsDropdownOpen(!isDropdownOpen.referalDropdown)
      setPunishmentFilter("OPEN")
       setPanelName("punishment")}}className='dropdown-item'>Open</div>
       <div onClick={()=>{
      setIsDropdownOpen(!isDropdownOpen.referalDropdown)
      setPunishmentFilter("CFR")
       setPanelName("punishment")}}className='dropdown-item'>CFR</div><div onClick={()=>{
        setIsDropdownOpen(!isDropdownOpen.referalDropdown)

        setPunishmentFilter("CLOSED")
         setPanelName("punishment")}}className='dropdown-item'>Closed</div><div onClick={()=>{
          setIsDropdownOpen(!isDropdownOpen.referalDropdown)

          setPunishmentFilter("ALL")
           setPanelName("punishment")}}className='dropdown-item'>All</div>
    


  </div>
    {/* Teacher Drop Down */}
    <button 
    className='dropbtn' 
    onClick={() => {
      openDropdown("teacherDropDown")
      // setPanelName("punishment")
  }}
    style={{ flex: 1, outline:"1px solid  white", padding: "5px", textAlign: "center"}}
  >
    Teachers
  </button>
      {/* Margin Left is used to move dropdown under the buttons */}
  <div style={{marginLeft:"25%"}} className={isDropdownOpen.teacherDropDown ? 'dropdown-content show' : 'dropdown-content'}>
    <div onClick={()=>{
      setIsDropdownOpen(!isDropdownOpen.teacherDropDown)
      // setPunishmentFilter("OPEN")
       setPanelName("viewTeacher")
       }}className='dropdown-item'>Active Teachers</div>
       <div onClick={()=>{
      setIsDropdownOpen(!isDropdownOpen.teacherDropDown)
      // setPunishmentFilter("CFR")
      //  setPanelName("punishment")
      }}className='dropdown-item'>Add Teachers</div>
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
  <div style={{marginLeft:"50%"}} className={isDropdownOpen.studentDropdown ? 'dropdown-content show' : 'dropdown-content'}>
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
  <div style={{marginLeft:"75%"}} className={isDropdownOpen.toolsDropdown ? 'dropdown-content show' : 'dropdown-content'}>
    <div onClick={()=>{
      setPanelName("createPunishment")  
      setIsDropdownOpen(!isDropdownOpen.toolsDropdown)

     }}className='dropdown-item'>Create Punishment</div>
      <div onClick={()=>{
      setPanelName("userManagement")  
      setIsDropdownOpen(!isDropdownOpen.toolsDropdown)

     }}className='dropdown-item'>User Role Management</div>
     
  </div>




        </div>
      </div>
      <div className = "main-content-panel">
{panelName === "viewTeacher" &&<AdminTeacherPanel/>}
{panelName === "student" &&<StudentPanel/>}
{panelName === "punishment" &&<AdminPunishmentPanel filter={punishmentFilter}/>}
{panelName === "createPunishment" && <CreatePunishmentPanel/>}
{panelName === "createNewStudent" && <CreateNewStudentPanel/>}
{panelName === "userManagement" && <AdminUserRoleManagement/>}




      </div>

        <Drawer anchor='right' open={openNotificationDrawer} onClose={()=> toggleNotificationDrawer(false)}>
        <NotificationBar />
        </Drawer>

<Drawer 
  className={openDrawer ? 'drawer-open' : ''} 
  anchor="left" 
  open={openDrawer} 
  onClose={() => toggleDrawer(false)}
>      <div style={{display:"flex", justifyContent:"space-between", }}>
      <button  onClick={()=>toggleDrawer(false)}style={{width:"50%"}}>
          close (x)
        </button>
        <button style={{width:"50%"}}>
          Print (x)
        </button>
      </div>
      <div style={{height:"40px"}}></div>
      


         </Drawer>







      </div>
      </div>
      </>
    )
  );
};

export default AdminDashboard;

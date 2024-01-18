import React, { useEffect, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CreatePunishmentPanel from '../panel/createPunishmentPanel';
import CreateNewStudentPanel from '../panel/createNewStudentPanel';
import StudentPanel from '../panel/studentPanel';
import NotificationBar from '../../notification-bar/NotificationBar';
import ISSWidget from './issWidget';
import DetentionWidget from './detentionWidget';
import AdminTeacherPanel from './adminTeacherPanel';
import AdminUserRoleManagement from './adminUserRoleManagement';
import GlobalPunishmentPanel from '../global/globalPunishmentPanel';
import GlobalArchivedPunishmentPanel from '../global/globalArchivedPunishmentPanel';
import AdminOverviewPanel from './adminOverview';
import { baseUrl } from '../../../utils/jsonData';
import axios from 'axios';
import DashboardIcon from '@mui/icons-material/Dashboard';



const AdminDashboard = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [openNotificationDrawer, setOpenNotificationDrawer] = useState(false)
  const [panelName,setPanelName] = useState("punishment")
  const [data,setData] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    referralDropdown:false,
    teacherDropdown:false,
    studentDropdown:false,
    toolsDropdown:false
  });
const [punishmentFilter, setPunishmentFilter] =useState("OPEN")
  
const handleGeneratePDF = () => {
  window.open('/forms/report', '_blank'); // '_blank' will open the URL in a new tab/window
};

const handleLogout = () => {
  clearSessionStorage();
  window.location.href = '/login';
};

const clearSessionStorage = () => {
  ['Authorization', 'userName', 'schoolName', 'email', 'role'].forEach(key => {
    sessionStorage.removeItem(key);
  });
};

  useEffect(() => {
    if (sessionStorage.getItem('Authorization') === null) {
      window.location.href = '/login';
    } else {
      setLoggedIn(true);
    }
  }, []);



  const toggleNotificationDrawer = (open) => {
    setOpenNotificationDrawer(open);
  };

const openDropdown =(field)=>{
  setIsDropdownOpen({})
  setIsDropdownOpen((prev)=>({
    ...prev, [field]: !isDropdownOpen[field]
  }))
}

const headers = {
  Authorization: 'Bearer ' + sessionStorage.getItem("Authorization"),
};


useEffect(() => {
  axios
    .get(`${baseUrl}/punish/v1/punishments`, { headers })
    .then(function (response) {
      setData(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}, []);




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
          <DashboardIcon onClick={()=>setPanelName("overview")} style={{color:"blue",backgroundColor:"black", marginRight:"10px"}}/>
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

      <div className='teacher-main-content'> 
      <div className="">
      <div className = "teacher-main-content-menu">

        {/* Overview button */}
    <button 
    className='teacher-dash-dropbtn' 
    onClick={() => {
      setPanelName("overview")
  }}
  >
    Overview
  </button>

  {/* New Shout Reffere **/}
  <button 
    className='teacher-dash-dropbtn' 
    onClick={() => {
      // openDropdown("newReferral")
      setPanelName("createPunishment")
  }}
  >
    New Referral/Shout out
  </button>
  
  {/* Punishment Drop Down */}
  {/* Student Drop Down */}
  <button 
    className='teacher-dash-dropbtn' 
    onClick={() => {
      openDropdown("studentDropdown")
      // setPanelName("student")
  }}
    // style={{ flex: 1, outline:"1px solid  white", padding: "5px", textAlign: "center"}}
  >
    Information
  </button>
      {/* Margin Left is used to move dropdown under the buttons */}
  <div style={{marginLeft:"50%"}} className={isDropdownOpen.studentDropdown ? 'dropdown-content show' : 'dropdown-content'}>
    <div onClick={()=>{
      setPanelName("student") 
      setIsDropdownOpen(!isDropdownOpen.studentDropdown)
 
     }}className='teacher-dropdown-item'>View Students</div>

    <div onClick={()=>{
      setPanelName("punishment") 
      setIsDropdownOpen(!isDropdownOpen.studentDropdown)
 
     }}className='teacher-dropdown-item'>View Contacts</div>
      
      <div onClick={()=>{
      setIsDropdownOpen(!isDropdownOpen.studentDropdown)
      // setPunishmentFilter("OPEN")
       setPanelName("viewTeacher")
       }}className='dropdown-item'> View Teachers</div>
  </div>
     
    {/* Teacher Drop Down */}
    {/* <button 
    className='dropbtn' 
    onClick={() => {
      openDropdown("teacherDropDown")
  }}
    style={{ flex: 1, outline:"1px solid  white", padding: "5px", textAlign: "center"}}
  >
    Teachers
  </button>
      {/* Margin Left is used to move dropdown under the buttons */}
 

 

    {/* Tooks Drop Down */}
    <button 
    className='teacher-dash-dropbtn' 
    onClick={() => {
      openDropdown("toolsDropdown")
      // setPanelName("punishment")
  }}
    style={{ flex: 1, outline:"1px solid  white", padding: "5px", textAlign: "center"}}
  >
    Tools
  </button>
      {/* Margin Left is used to move dropdown under the buttons */}
  <div style={{marginLeft:"60%"}} className={isDropdownOpen.toolsDropdown ? 'dropdown-content show' : 'dropdown-content'}>
    <div onClick={()=>{
      setPanelName("createPunishment")  
      setIsDropdownOpen(!isDropdownOpen.toolsDropdown)

     }}className='dropdown-item'>Create Punishment</div>
      <div onClick={()=>{
      setPanelName("userManagement")  
      setIsDropdownOpen(!isDropdownOpen.toolsDropdown)

     }}className='dropdown-item'>User Role Management</div>
           <div onClick={()=>{
      setPanelName("archived")  
      setIsDropdownOpen(!isDropdownOpen.toolsDropdown)

     }}className='dropdown-item'>Archived</div>
     
  </div>
        </div>
      </div>
      <div className = "main-content-panel">
{panelName === "overview" &&<AdminOverviewPanel data={data}/>}
{panelName === "viewTeacher" &&<AdminTeacherPanel/>}
{panelName === "student" &&<StudentPanel/>}
{panelName === "punishment" &&<GlobalPunishmentPanel filter={punishmentFilter} />}
{panelName === "createPunishment" && <CreatePunishmentPanel/>}
{panelName === "createNewStudent" && <CreateNewStudentPanel/>}
{panelName === "userManagement" && <AdminUserRoleManagement/>}
{panelName === "archived" && <GlobalArchivedPunishmentPanel/>}

      </div>
      </div>

        <Drawer anchor='right' open={openNotificationDrawer} onClose={()=> toggleNotificationDrawer(false)}>
        <NotificationBar />
        </Drawer>
      </div>
      </>
    )
  );
};

export default AdminDashboard;

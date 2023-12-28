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
import AdminPunishmentPanel from './adminPunishmentPanel';
import AdminTeacherPanel from './adminTeacherPanel';
import AdminUserRoleManagement from './adminUserRoleManagement';



const AdminDashboard = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [openNotificationDrawer, setOpenNotificationDrawer] = useState(false)
  const [panelName,setPanelName] = useState("punishment")
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    referalDropdown:false,
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


    {/* Teacher Drop Down */}
    <button 
    className='dropbtn' 
    onClick={() => {
      openDropdown("teacherDropDown")
  }}
    style={{ flex: 1, outline:"1px solid  white", padding: "5px", textAlign: "center"}}
  >
    Teachers
  </button>
      {/* Margin Left is used to move dropdown under the buttons */}
  <div style={{marginLeft:"20%"}} className={isDropdownOpen.teacherDropDown ? 'dropdown-content show' : 'dropdown-content'}>
    <div onClick={()=>{
      setIsDropdownOpen(!isDropdownOpen.teacherDropDown)
      // setPunishmentFilter("OPEN")
       setPanelName("viewTeacher")
       }}className='dropdown-item'>Active Teachers</div>
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
  <div style={{marginLeft:"40%"}} className={isDropdownOpen.studentDropdown ? 'dropdown-content show' : 'dropdown-content'}>
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
  <div style={{marginLeft:"60%"}} className={isDropdownOpen.toolsDropdown ? 'dropdown-content show' : 'dropdown-content'}>
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
      </div>
      </div>
      </>
    )
  );
};

export default AdminDashboard;

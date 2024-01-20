import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../utils/jsonData';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import AccountBoxIcon from '@mui/icons-material/AccountBox';import NotificationBar from '../../notification-bar/NotificationBar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CreatePunishmentPanel from '../panel/createPunishmentPanel';
import CreateNewStudentPanel from '../panel/createNewStudentPanel';
import TeacherStudentPanel from './teacherPanels/teacherStudentPanel';
import TeacherFTCPanel from './teacherPanels/FTCpanel';
import TeacherPunishmentPanel from '../global/globalPunishmentPanel.js';
import GlobalPunishmentPanel from '../global/globalPunishmentPanel.js';
import Card from '@mui/material/Card';
import ShoutOutWidget from '../student/shoutOutWidget.js';
import TeaherOverviewPanel from './teacherPanels/teacherOverview.js';
import TeacherOverviewPanel from './teacherPanels/teacherOverview.js';
import TeacherShoutOutWidget from './teacherPanels/teacherShoutOutWidget.js';
import DetentionWidget from '../admin/detentionWidget.js';
import ISSWidget from '../admin/issWidget.js';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LevelThreePanel from '../global/levelThreePanel.js';

const TeacherDashboard = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [data, setData] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openNotificationDrawer, setOpenNotificationDrawer] = useState(false)
  const [panelName,setPanelName] = useState("overview")
  const [notificationData,setNotificationData]= useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    referralDropdown:false,
    teacherDropdown:false,
    studentDropdown:false,
    toolsDropdown:false,
    ftcDropdown:false,
    newReferral:false,
  });
  const [punishmentFilter, setPunishmentFilter] =useState("OPEN")
  const [sideBarOpen,setSideBarOpen]= useState(false)

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
        className='teacher-dropdown-item'>{label}
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
      <div className='teacher-main-content'> 
      <div className = "">
      <div className='teacher-main-content-menu'
      >
  
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
      openDropdown("newReferral")
      // setPanelName("createPunishment")
  }}
  >
  Referral/Shout Out
  </button>
  <div style={{marginLeft:"25%"}} className={isDropdownOpen.newReferral ? 'dropdown-content show' : 'dropdown-content'}>
    <div onClick={()=>{
      setPanelName("createPunishment")  
      setIsDropdownOpen(!isDropdownOpen.newReferral)

     }}className='teacher-dropdown-item'>New Referral/Shout Out</div>
       <div onClick={()=>{
      setPanelName("punishment")  
      setIsDropdownOpen(!isDropdownOpen.newReferral)

     }}className='teacher-dropdown-item'>Existing Referrals/Shout Outs</div>

</div>
 
    {/* Student Drop Down */}
    <button 
    className='teacher-dash-dropbtn' 
    onClick={() => {
      // openDropdown("studentDropdown")
      setPanelName("student")
  }}
    // style={{ flex: 1, outline:"1px solid  white", padding: "5px", textAlign: "center"}}
  >
    My Students
  </button>
      {/* Margin Left is used to move dropdown under the buttons */}
  {/* <div style={{marginLeft:"50%"}} className={isDropdownOpen.studentDropdown ? 'dropdown-content show' : 'dropdown-content'}>
    <div onClick={()=>{
      setPanelName("student") 
      setIsDropdownOpen(!isDropdownOpen.studentDropdown)
 
     }}className='teacher-dropdown-item'>My Students</div>

    <div onClick={()=>{
      setPanelName("punishment") 
      setIsDropdownOpen(!isDropdownOpen.studentDropdown)
 
     }}className='teacher-dropdown-item'>My Write-Ups</div>
     
  </div> */}

  

    {/* FTC Drop Down */}
    <button 
    className='teacher-dash-dropbtn' 
    onClick={() => {
      openDropdown("ftcDropdown")
      // setPanelName("punishment")
  }}
  >
    My Tasks
  </button>
  <div style={{marginLeft:"75%"}} className={isDropdownOpen.ftcDropdown ? 'dropdown-content show' : 'dropdown-content'}>
    <div onClick={()=>{
      setPanelName("ftc")  
      setIsDropdownOpen(!isDropdownOpen.ftcDropdown)

     }}className='teacher-dropdown-item'>Failure to Complete Work</div>
       <div onClick={()=>{
      setPanelName("levelThree")  
      setIsDropdownOpen(!isDropdownOpen.ftcDropdown)

     }}className='teacher-dropdown-item'>Level Three Approval</div>
   
     
  </div>
  
  </div>
  <div className='teacher-overview'>
  <div 
  // style={{width: sideBarOpen ?"70%":"95%"}}
   className='left-main'>

      <div className = "teacher-panel">
      {panelName === "overview" &&<TeacherOverviewPanel data={data}/>}
{panelName === "student" &&<TeacherStudentPanel/>}
{panelName === "punishment" &&<GlobalPunishmentPanel filter={punishmentFilter} roleType={"teacher"}/>}
{panelName === "createPunishment" && <CreatePunishmentPanel/>}
{panelName === "ftc" && <TeacherFTCPanel/>}
{panelName === "levelThree" && <LevelThreePanel/>}
      </div>


  </div>
  {/* <div className="sidebar-content">
  <div style={{width: sideBarOpen ?"20%":"1%"}}className="sidebar-content">
  {!sideBarOpen ? (
    <div onClick={()=>setSideBarOpen(true)} className="vertical-text">
      Click to open
    </div>
  ) : (
    <>
    <button onClick={()=>setSideBarOpen(false)}>Close (x)</button>
    <div style={{marginBottom:"10px"}}>
   
        <DetentionWidget />
      
    </div>
      <div>
     
      <ISSWidget />
    
      </div>
  
    </>
  )}
</div>
</div> */}
   </div> 
     </div>
  
        <Drawer anchor='right' open={openNotificationDrawer} onClose={()=> toggleNotificationDrawer(false)}>
        <NotificationBar notificationData={data}/>
        </Drawer>
      </div>
      </div>
      </>
    )
  );
};

export default TeacherDashboard;

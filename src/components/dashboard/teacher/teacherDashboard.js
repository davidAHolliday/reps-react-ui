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


const TeacherDashboard = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [listOfInfractionsAssociatedByTeacher, setListOfInfractionsAssociatedByTeacher] = useState([]);
  const [data, setData] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openNotificationDrawer, setOpenNotificationDrawer] = useState(false)
  const [panelName,setPanelName] = useState("overview")
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    referralDropdown:false,
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
      <div className = "student-main-content-menu">
      <div style={{display:"flex",backgroundColor:"rgb(25, 118, 210)"}}>
  
  {/* Punishment Drop Down */}
  <button 
    className='dropbtn' 
    onClick={() => {
      openDropdown("referralDropdown")
       setPanelName("punishment")}}
    style={{ flex: 1, outline:"1px solid  white", padding: "5px", textAlign: "center"}}
  >
    Referrals
  </button>
  <div className={isDropdownOpen.referralDropdown ? 'dropdown-content show' : 'dropdown-content'}>
    

{renderDropdownContent(!isDropdownOpen.referralDropdown,"OPEN","Open","punishment")}
{renderDropdownContent(!isDropdownOpen.referralDropdown,"CFR","CFR","punishment")}
{renderDropdownContent(!isDropdownOpen.referralDropdown,"CLOSED","Closed","punishment")}
{renderDropdownContent(!isDropdownOpen.referralDropdown,"ALL","All","punishment")}
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
  <div style={{marginLeft:"20%"}} className={isDropdownOpen.studentDropdown ? 'dropdown-content show' : 'dropdown-content'}>
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
  <div style={{marginLeft:"40%"}} className={isDropdownOpen.toolsDropdown ? 'dropdown-content show' : 'dropdown-content'}>
 
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
  <div style={{marginLeft:"60%"}} className={isDropdownOpen.ftcDropdown ? 'dropdown-content show' : 'dropdown-content'}>
    <div onClick={()=>{
      setPanelName("ftc")  
      setIsDropdownOpen(!isDropdownOpen.ftcDropdown)

     }}className='dropdown-item'>Pending Assignments</div>
   
     
  </div>
  </div>
  <div className='sub-main'>
  <div className='left-main'>
  <div className='teacher-overview'>
        <div className='teacher-overview-first'>
        <Card variant="outlined">
         <h2>Positive Behavioral</h2>
        <TeacherShoutOutWidget/>
        </Card>
        </div>
      </div>
      <div className = "teacher-panel">
      {panelName === "overview" &&<TeacherOverviewPanel/>}
{panelName === "student" &&<TeacherStudentPanel/>}
{panelName === "punishment" &&<GlobalPunishmentPanel filter={punishmentFilter} roleType={"teacher"}/>}
{panelName === "createPunishment" && <CreatePunishmentPanel/>}
{panelName === "ftc" && <TeacherFTCPanel/>}
      </div>


  </div>
  <div className='right-side-bar'>
    Side Bar
  </div>


  </div>


   


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

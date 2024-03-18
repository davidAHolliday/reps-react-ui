import React, { useEffect, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CreatePunishmentPanel from '../panel/createPunishmentPanel';
import TeacherStudentPanel from './teacherPanels/teacherStudentPanel';
import TeacherFTCPanel from './teacherPanels/FTCpanel';
import GlobalPunishmentPanel from '../global/globalPunishmentPanel.js';
import TeacherOverviewPanel from './teacherPanels/teacherOverview.js';
import DetentionWidget from '../admin/detentionWidget.js';
import ISSWidget from '../admin/issWidget.js';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LevelThreePanel from '../global/levelThreePanel.js';
import ChatIcon from '@mui/icons-material/Chat';
import { ContactUsModal } from '../../../secuirty/contactUsModal';
import { get } from '../../../utils/api/api.js';
import LoadingWheelPanel from '../student/blankPanelForTest.js';
import "../teacher/teacherPanels/teacher.css"
import { NavigationLoggedIn } from '../../landing/navigation-loggedIn.jsx';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@material-ui/core';
import { Navigation } from '../../landing/navigation.jsx';

const TeacherDashboard = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [data, setData] = useState([]);
  const [openNotificationDrawer, setOpenNotificationDrawer] = useState(false)
  const [panelName,setPanelName] = useState("overview")
  const [studentData,setStudentData]= useState([])
  const [modalType,setModalType] = useState("")
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

  const loggedInUser = sessionStorage.getItem("email")




  useEffect(() => {
 
    const fetchPunishmentData = async () =>{
      try{
        const response = await get(`DTO/v1/TeacherOverviewData`)
        setData(response)
      }catch(err){
        console.error(err)
      }

    }
    if(panelName === "overview"){
      fetchPunishmentData()

    }

  }, [panelName]);


  const toggleNotificationDrawer = (open) => {
    setOpenNotificationDrawer(open);
  };

  const openDropdown =(field)=>{
    setIsDropdownOpen({})
    setIsDropdownOpen((prev)=>({
      ...prev, [field]: !isDropdownOpen[field]
    }))
  }

  const defaultTheme = createTheme();


  return (
    loggedIn && (
      <ThemeProvider theme={defaultTheme}>
        <div 
        >
      
          {/* <Toolbar style={{background:"", color: "black"}}> */}
          {modalType === "contact" &&
              <ContactUsModal setContactUsDisplayModal={setModalType} />
        
        }

<NavigationLoggedIn setLogin={()=>console.log('click')} />

          {/* <DashboardIcon onClick={()=>setPanelName("overview")} style={{color:"white",backgroundColor:"black", marginRight:"10px"}}/>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Welcome, {sessionStorage.getItem('userName')}
            </Typography>
            <NotificationsIcon style={{marginRight:"15px"}} onClick={()=> toggleNotificationDrawer(true) }/>
            <div onClick={()=>setModalType("contact")}><ChatIcon style={{marginRight:"15px"}}/></div>
    

            <AccountBoxIcon/>           
              <IconButton type="button" color="inherit" onClick={handleLogout}>
              Logout
            </IconButton>

          </Toolbar> */}
        </div>
       <div className=''>
      <div className=''> 
      <div className = "">
      <div style={{backgroundColor:"#5ca9fb", display:"none"}}className='teacher-main-content-menu'
      >
  
    {/* Overview button */}
    {/* <button 
    className='teacher-dash-dropbtn' 
    onClick={() => {
      setPanelName("overview")
  }}
  >
    Overview
  </button> */}

  {/* New Shout Reffere **/}
  {/* <button 
    className='teacher-dash-dropbtn' 
    onClick={() => {
      openDropdown("newReferral")
  }}
  >
  Referral/Shout Out
  </button> */}
  {/* <div style={{marginLeft:"25%"}} className={isDropdownOpen.newReferral ? 'dropdown-content show' : 'dropdown-content'}>
    <div onClick={()=>{
      setPanelName("createPunishment")  
      setIsDropdownOpen(!isDropdownOpen.newReferral)

     }}className='teacher-dropdown-item'>New Referral/Shout Out</div>
       <div onClick={()=>{
      setPanelName("punishment")  
      setIsDropdownOpen(!isDropdownOpen.newReferral)

     }}className='teacher-dropdown-item'>Existing Referrals/Shout Outs</div>

</div> */}
 
    {/* Student Drop Down */}
    {/* <button 
    className='teacher-dash-dropbtn' 
    onClick={() => {
      // openDropdown("studentDropdown")
      setPanelName("student")
  }}
  >
    My Students
  </button> */}

    {/* FTC Drop Down */}
    {/* <button 
    className='teacher-dash-dropbtn' 
    onClick={() => {
      setPanelName("levelThree")
  }}
  >
    My Tasks
  </button> */}

  </div>
 { data.length===0 ? <LoadingWheelPanel/>:<div className='teacher-overview'>
  <div 
  style={{width: false ?"70%":"100%"}}
   className='left-main'>

      <div className = "teacher-panel">
      {panelName === "overview" && <TeacherOverviewPanel setPanelName={setPanelName} data={data} />}

{panelName === "student" &&<TeacherStudentPanel listOfStudents={studentData}/>}
{panelName === "punishment" &&<GlobalPunishmentPanel filter={punishmentFilter} roleType={"teacher"}/>}
{panelName === "createPunishment" && <CreatePunishmentPanel/>}
{panelName === "ftc" && <TeacherFTCPanel/>}
{panelName === "levelThree" && <LevelThreePanel/>}
      </div>


  </div>
   </div> }
     </div>
  
        <Drawer anchor='right' open={openNotificationDrawer} onClose={()=> toggleNotificationDrawer(false)}>
        <DetentionWidget />
      
        <ISSWidget />
        </Drawer>
      </div>
      </div>
      </ThemeProvider>
    )
  );
};

export default TeacherDashboard;

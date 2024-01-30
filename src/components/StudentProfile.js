import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../utils/jsonData';
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
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NotificationBar from './notification-bar/NotificationBar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, getImageListItemBarUtilityClass } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContactsIcon from '@mui/icons-material/Contacts';
import VisibilityIcon from '@mui/icons-material/Visibility';


const StudentProfile = (props) => {
    const [loggedIn, setLoggedIn] = useState(true);
    const [listOfInfractionsAssociatedByTeacher, setListOfInfractionsAssociatedByTeacher] = useState([]);
    const [data, setData] = useState([]);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openNotificationDrawer, setOpenNotificationDrawer] = useState(false)
    const [panelName,setPanelName] = useState("openAssignments")
    const [studentEmail, setStudentEmail] = useState("");
  
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
        console.log(props);
      axios
        .post(`${baseUrl}/punish/v1/studentsReport/${props.studentEmail}`, "payload", { headers })
        .then(function (response) {
          setData(response.data);
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, [props.studentEmail]);
  
    const toggleDrawer = (open) => {
      setOpenDrawer(open);
    };
  
    const toggleNotificationDrawer = (open) => {
      setOpenNotificationDrawer(open);
    };

    const hasScroll = data.length > 10;
  
    return (
        <>
         <div style={{backgroundColor:"rgb(25, 118, 210)",marginTop:"10px", marginBlock:"5px"}}>
   <Typography color="white" variant="h6" style={{ flexGrow: 1, outline:"1px solid  white",padding:
"5px"}}>
   {props.studentName}
        </Typography>
        </div>
   
    <TableContainer component={Paper} style={{ maxHeight: hasScroll ? '400px' : 'auto', overflowY: hasScroll ? 'scroll' : 'visible' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
              Id Number
            </TableCell>
          
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
              Infraction Name
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
              Description 
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
             Level
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
             Status
            </TableCell>
			<TableCell variant="head" style={{ fontWeight: 'bold' }}>
             Action
            </TableCell>
         
          </TableRow>
        </TableHead>
        <TableBody>




          {data.length > 0 ? (
            data.map((x, key) => (
<TableRow key={key}>
  <TableCell>
    {x.punishmentId}
  </TableCell>
  <TableCell>{x.infraction.infractionName}</TableCell>
  <TableCell>{x.infraction.infractionDescription}</TableCell>
  <TableCell>{x.infraction.infractionLevel}</TableCell>
  <TableCell>{x.status}</TableCell>
  <TableCell>

      <ContactsIcon color="primary" /> {/* Use a suitable color for the Contact icon */}

      <VisibilityIcon color="primary" /> {/* Use a suitable color for the View icon */}

  </TableCell>
</TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="5">No closed assignments found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    </>
    );
  };

  export default StudentProfile;
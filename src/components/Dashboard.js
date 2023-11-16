import React, { useEffect, useState } from 'react';
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
import Avatar from '@mui/material/Avatar'; // Import Avatar component

const Dashboard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [listOfInfractionsAssociatedByTeacher, setListOfInfractionsAssociatedByTeacher] = useState([]);
  const [data, setData] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);

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
            <Avatar alt="User Profile" src="URL_TO_USER_AVATAR" />
            <IconButton color="inherit" onClick={handleLogout}>
              Logout
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer anchor="left" open={openDrawer} onClose={() => toggleDrawer(false)}>
          <List>
            <ListItem button>
              <ListItemText primary="Menu Item 1" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Menu Item 2" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Menu Item 3" />
            </ListItem>
          </List>
        </Drawer>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ActionCard url="/forms/start-punishment" title="Punishment" descriptions="Log an infraction and initiate a punishment" style={{ backgroundColor: 'blue', color: 'white' }} />
          <ActionCard url="/forms/ftc-closure" title="Review Assignments" descriptions="Review Student Assignment" style={{ backgroundColor: 'green', color: 'white' }} />
          <ActionCard url="/" title="Open Reports" descriptions="See Reports of Infraction Stats" style={{ backgroundColor: 'orange', color: 'white' }} />
          <ActionCard url="/" title="Other Link" descriptions="We can add other things here" style={{ backgroundColor: 'purple', color: 'white' }} />
        </div>

        {data.length > 0 && <TableComponent title={"OPEN ASSIGNMENTS"} list={data} status={'OPEN'} />}
        {data.length > 0 && <TableComponent title={"CLOSED ASSIGMENTS"}list={data} status={'CLOSED'} />}

      </div>
    )
  );
};

export default Dashboard;




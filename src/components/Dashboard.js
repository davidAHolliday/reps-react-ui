import React, { useEffect , useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../utils/jsonData';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Dashboard = () => {
  const [loggedIn,setLoggedIn] = useState();
  const [listOfInfractions, setListOfInfractions] = useState([])
  const [filteredInfractions, setFilteredInfractions] = useState([]);
  const handleLogout = () => {
    // Clear the session authorization (JWT token) here
    sessionStorage.removeItem('Authorization');
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("schoolName")
    sessionStorage.removeItem("email")
    
    // You can also redirect the user to the login page or any other page after logout
    window.location.href = '/login';
  };


  useEffect(()=>{
    if(sessionStorage.getItem("Authorization")=== null){
      window.location.href = '/login';
  
    }else{
      setLoggedIn(true);
    }
  })

  const headers = {
    Authorization: "Bearer " + sessionStorage.getItem("Authorization"),
  };

  const filterAndSetList =(data) =>{

    const filteredData = data.filter(infraction =>  infraction.teacherEmail === "justin_iverson.c@charleston.k12.sc.us" && infraction.status === "OPEN")
    console.log(filteredData)
    setListOfInfractions(filteredData)

  }
   


  useEffect(()=>{
    axios.get(`${baseUrl}/punish/v1/punishments`,{headers})
    .then(function(response){
        filterAndSetList(response.data)
    }).catch(function (error){
      setListOfInfractions([])
        console.log(error)
    })
  
  },[]);

  function findPunishmentsByTeacherEmail() {
    const foundInfractions = listOfInfractions.find(punishments => punishments.teacherEmail === "justin_iverson.c@charleston.k12.sc.us");
    return foundInfractions || null; // Returns the found student or null if not found
  }








  return (
    loggedIn &&
    <div className="dashboard-container" style={{backgroundColor:"lightgrey", maxHeight:"90vh",display:"flex"}}>

    <div className="dashboard">
      
      <div className='welcome-message'>
        WELCOME {sessionStorage.getItem("userName")}
      </div>

      <div style={{width:"100%",height:"10vh"}}>
      <div style={{width:"100%",height:"8vh",backgroundColor:"white"}} className='notification-widget'></div>
       <div style={{width:"100%",height:"3vh",backgroundColor:"lightblue"}}>
        Students With Open Assigment</div>
        <table className="my-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Date Created</th>
      <th>Teacher</th>
      <th>Infraction Description</th>
      <th>Status</th>
      {/* <th>Action</th> */}
    </tr>
  </thead>
  <tbody>
  {listOfInfractions.length > 0 ? (
  listOfInfractions.map((x, key) => (
    <tr key={key}>
      <td>{x.student.firstName} {x.student.lastName}</td>
      <td>{x.timeCreated}</td>
      <td>{x.teacherEmail}</td>
      <td>{x.infraction.infractionDescription}</td>
      <td>{x.status}</td>
      {/* <td><button onClick={()=>{handleClose(x.punishmentId)}}>Mark Completed</button></td> */}
    </tr>
  ))
) : (
  <tr>
    <td colSpan="5">No open assignments found.</td>
  </tr>
)}
  </tbody>
</table>
<div style={{width:"100%",height:"8vh",backgroundColor:"white"}} className='notification-widget'></div>
       <div style={{width:"100%",height:"3vh",backgroundColor:"lightblue"}}>
        What are we doing today?</div>
        <div className='card-container' style={{display:"flex" }}>
        <Card onClick={()=>{window.location.href = '/forms/start-punishment'}} sx={{ width: 345}}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://media.istockphoto.com/id/1001207390/vector/report-icon-vector-sign-and-symbol-isolated-on-white-background-report-logo-concept.jpg?s=170667a&w=0&k=20&c=JS4K4Maitnaxvg9P_J82AXt-vnXKudpKU41jJF5pSDE="
        title="report"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Punishment
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Log an infraction and initiate a punishment. 
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    <Card onClick={()=>{window.location.href = '/forms/ftc-closure'}} sx={{ width: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://media.istockphoto.com/id/1001207390/vector/report-icon-vector-sign-and-symbol-isolated-on-white-background-report-logo-concept.jpg?s=170667a&w=0&k=20&c=JS4K4Maitnaxvg9P_J82AXt-vnXKudpKU41jJF5pSDE="
        title="report"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Review  Assignments
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Review Student Assigment
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    <Card sx={{ width: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://media.istockphoto.com/id/1001207390/vector/report-icon-vector-sign-and-symbol-isolated-on-white-background-report-logo-concept.jpg?s=170667a&w=0&k=20&c=JS4K4Maitnaxvg9P_J82AXt-vnXKudpKU41jJF5pSDE="
        title="report"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
       Open Reports
        </Typography>
        <Typography variant="body2" color="text.secondary">
         See Reports of Infraction Stats
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    <Card sx={{ width: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://media.istockphoto.com/id/1001207390/vector/report-icon-vector-sign-and-symbol-isolated-on-white-background-report-logo-concept.jpg?s=170667a&w=0&k=20&c=JS4K4Maitnaxvg9P_J82AXt-vnXKudpKU41jJF5pSDE="
        title="report"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
      Other Link
        </Typography>
        <Typography variant="body2" color="text.secondary">
        We ca add other things here
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </div>
        
      </div>

    </div>
    </div>
  );
};

export default Dashboard;

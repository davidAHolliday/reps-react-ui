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
import AssessmentIcon from '@mui/icons-material/Assessment';
import { TableComponent } from './TableComponent';
import { CardComponent } from './CardComponet';
const Dashboard = () => {
  const [loggedIn,setLoggedIn] = useState();
  const [listOfInfractionsAssociatedByTeacher, setListOfInfractionsAssociatedByTeacher] = useState([])
  const [data, setData] = useState([]);
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

   
  useEffect(()=>{
    axios.get(`${baseUrl}/punish/v1/punishments`,{headers})
    .then(function(response){
        setData(response.data)
    }).catch(function (error){
      setListOfInfractionsAssociatedByTeacher([])
        console.log(error)
    })
  
  },[]);

  // function findPunishmentsByTeacherEmail() {
  //   const foundInfractions = listOfInfractions.find(punishments => punishments.teacherEmail === teacherEmail);
  //   return foundInfractions || null; // Returns the found student or null if not found
  // }



const handleStatus = ()=>{

}



  return (
    loggedIn && <div>
     <button onClick={handleLogout}>Logout</button>
      
       <div className='welcome-message'>
          <h1>Welcome {sessionStorage.getItem("userName")}</h1>
      </div>
     

    
{/* <div style={{width:"100%",height:"8vh",backgroundColor:"white"}} className='notification-widget'></div> */}
        <div style={{width:"100%",height:"3vh",backgroundColor:"lightblue"}}>
         What are we doing today?</div>
        <div className='card-container' style={{display:"flex" }}>
<CardComponent 
          url='/forms/start-punishment'
          title ="Punishment"
          descriptions ="Log an infraction and initiate a punishment."/>

<CardComponent 
          url='/forms/ftc-closure'
          title ="Review Assignments"
          descriptions ="Review Student Assigment"/>

<CardComponent 
          url='/'
          title ="Open Reports"
          descriptions ="See Reports of Infraction Stats"/>

<CardComponent 
          url='/'
          title ="Other Link"
          descriptions ="We can add other things here"/>
  
</div>

    
    {data.length > 0 && <TableComponent list={data} status={"OPEN"} />}
    {data.length > 0 && <TableComponent list={data} status={"CLOSED"} />}


  
  

    

    </div>
  );
};

export default Dashboard;

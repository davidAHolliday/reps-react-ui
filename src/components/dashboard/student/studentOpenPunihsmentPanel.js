import react, {useState,useEffect} from 'react'
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, getImageListItemBarUtilityClass, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import axios from "axios"
import Tooltip from '@mui/material/Tooltip';
import WarningIcon from '@mui/icons-material/Warning';
import AssignmentIcon from '@mui/icons-material/Assignment';

import { baseUrl } from '../../../utils/jsonData'

   const StudentOpenPunishmentPanel = ({handleStartAssignment}) => {

    const loggedInUser = sessionStorage.getItem("email")

    const [listOfPunishments, setListOfPunishments]= useState([])

    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("Authorization"),
    };
    
    const url = `${baseUrl}/punish/v1/punishments`;
  

    useEffect(() => {
      axios
        .get(url, { headers }) // Pass the headers option with the JWT token
        .then(function (response) {
          const data = response.data.sort((a, b) => {
            // Convert the timeCreated strings to Date objects for proper comparison
            const dateA = new Date(a.timeCreated);
            const dateB = new Date(b.timeCreated);
    
            // Compare the dates
            return   dateA - dateB; // Sort in descending order, change to dateA - dateB for ascending order
          });
    
          setListOfPunishments(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);

    //Temp Filter, we should filter in backend base on principal user



const handleAssignmentClick=(x)=>{
  handleStartAssignment(x)
  };




  const dateCreateFormat = (inputDate)=>{
    const date = new Date(inputDate);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-US',options);
  }


  const calculateImportance = (x) => {
    const currentDate = new Date();
    const creationDate = new Date(x.timeCreated);
  
    // Calculate the difference in milliseconds
    const timeDifference = currentDate - creationDate;
  
    // Calculate the difference in days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
  
    // Check if the date is more than 3 days old
    if (daysDifference > 5) {
      return(
        <>
        <WarningIcon color={"error"}  />
              <div>ISS </div>

        </>


      ) 
    }
    else if (daysDifference > 3){
      return(<>
      <WarningIcon color={"warning"} />
      <div>Lunch Detention</div>
      </>

      ) 
      

    }
   
   
  
    // Return null if the date is not more than 3 days old
    return null;
  };
  
  
	  const data = listOfPunishments.filter(user=> user.student.studentEmail === loggedInUser).filter(punish => (punish.status === "OPEN" || punish.status=== "PENDING"));
      
    const hasScroll = data.length > 10;

    return (
        <>
                 { console.log(listOfPunishments)}

         <div style={{backgroundColor:"rgb(25, 118, 210)",marginTop:"10px", marginBlock:"5px"}}>
   <Typography color="white" variant="h6" style={{ flexGrow: 1, outline:"1px solid  white",padding:
"5px"}}>
   Assignments To Complete
        </Typography>
        </div>
   
    <TableContainer component={Paper} style={{ maxHeight: hasScroll ? '400px' : 'auto', overflowY: hasScroll ? 'scroll' : 'visible' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
             
            </TableCell>
          
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
              Infraction Name
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
              Description 
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' ,width:"5%" }}>
             Level
            </TableCell>
            {/* <TableCell variant="head" style={{ fontWeight: 'bold' }}>
             Status
            </TableCell> */}
			<TableCell variant="head" style={{ fontWeight: 'bold' }}>
             Created By
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
             Created On
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
            Consequence if not Completed by Tomorrow
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>




          {data.length > 0 ? (
            data.map((x, key) =>
          
            
             (

            
            
<TableRow key={key}>
<TableCell style={{ textAlign: 'center' }}>
  <Tooltip title= {x.status==="PENDING"? "Waiting For Teacher To Approve":"Click to view assignment"}>
    {x.infraction.infractionName === "Failure to Complete Work" ? <AssignmentIcon/> : x.status === "PENDING" ? <Typography color="orange">Pending</Typography>:
    <Button size="small" color='success' variant="contained" onClick={()=>handleAssignmentClick(x)}>Start Assignment</Button>}
 </Tooltip>
  </TableCell>
  <TableCell>{x.infraction.infractionName}</TableCell>
  <TableCell>{x.infraction.infractionDescription[1]}</TableCell>
  <TableCell>{x.infraction.infractionLevel}</TableCell>
  {/* <TableCell>{x.status}</TableCell> */}
  <TableCell>{x.teacherEmail}</TableCell>

  <TableCell >
<div style={{display:"flex"}}>   {dateCreateFormat(x.timeCreated)}</div>

    </TableCell>
    <TableCell >
<div style={{display:"flex"}}>  {x.status==="PENDING" ? "": calculateImportance(x)}</div>

    </TableCell>

</TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="5">Great Job, No Assignments are due.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    </>
    )
    }

    export default StudentOpenPunishmentPanel;



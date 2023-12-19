import react, {useState,useEffect} from 'react'
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, getImageListItemBarUtilityClass } from '@mui/material';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContactsIcon from '@mui/icons-material/Contacts';
import VisibilityIcon from '@mui/icons-material/Visibility';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import axios from "axios"
import Tooltip from '@mui/material/Tooltip';

import { baseUrl } from '../../../utils/jsonData'

   const StudentOpenPunishmentPanel = () => {

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
          setListOfPunishments(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);

    //Temp Filter, we should filter in backend base on principal user

const handleAssignmentClick=(x)=>{
  window.location.href = 
  <a href = {"/infractionAssignments/" + `${x.infraction.infractionName}` + "/" + `${x.infraction.infractionLevel}`}></a>


}


  const dateCreateFormat = (inputDate)=>{
    const date = new Date(inputDate);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-US',options);

  }
	  const data = listOfPunishments.filter(user=> user.student.studentEmail === loggedInUser).filter(punish => punish.status === "OPEN");
      
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
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
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
         
          </TableRow>
        </TableHead>
        <TableBody>




          {data.length > 0 ? (
            data.map((x, key) =>
          
            
             (

            
            
<TableRow key={key}>
  <TableCell>
  <Tooltip title="Click to view assignment">
    <OpenInNewIcon color="primary" onClick={()=>handleAssignmentClick(x)}/>
 </Tooltip>
  </TableCell>
  <TableCell>{x.infraction.infractionName}</TableCell>
  <TableCell>{x.infraction.infractionDescription}</TableCell>
  <TableCell>{x.infraction.infractionLevel}</TableCell>
  {/* <TableCell>{x.status}</TableCell> */}
  <TableCell>{x.teacherEmail}</TableCell>
  <TableCell>{dateCreateFormat(x.timeCreated)}</TableCell>
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
    )
    }

    export default StudentOpenPunishmentPanel;



import react, {useState,useEffect} from 'react'
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, getImageListItemBarUtilityClass } from '@mui/material';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContactsIcon from '@mui/icons-material/Contacts';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from "axios"
import { baseUrl } from '../../../utils/jsonData'

   const ShoutOutWidget = () => {

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

    const dateCreateFormat = (inputDate)=>{
      const date = new Date(inputDate);
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return date.toLocaleDateString('en-US',options);
  
    }
	  const data = listOfPunishments.filter(user=> user.student.studentEmail === loggedInUser).filter(punish => punish.status === "SO" || punish.status ==="CFR");
      
    const hasScroll = data.length > 2;

    return (
        <>
         <div >
        </div>
   
    <TableContainer component={Paper} style={{ height: hasScroll ? '200px' : 'auto', overflowY: hasScroll ? 'scroll' : 'visible' }}>
      <Table>
        <TableHead>
          <TableRow>
          
          
          <TableCell variant="head" style={{ fontWeight: 'bold' }}>
             Created On
            </TableCell>
         
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
              Shout Outs 
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
             Created By
            </TableCell>

          </TableRow>
        </TableHead>
        <TableBody>




          {data.length > 0 ? (
            data.map((x, key) => (
<TableRow key={key}>
<TableCell>{dateCreateFormat(x.timeCreated)}</TableCell>

  <TableCell>{x.infraction.infractionDescription}</TableCell>
  <TableCell>{x.teacherEmail}</TableCell>
</TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="5">No Shout Out Yet, but im sure its coming!.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    </>
    )
    }

    export default ShoutOutWidget;



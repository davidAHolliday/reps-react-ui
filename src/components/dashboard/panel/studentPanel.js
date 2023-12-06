import react, {useState,useEffect} from 'react'
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContactsIcon from '@mui/icons-material/Contacts';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from "axios"
import { baseUrl } from '../../../utils/jsonData'

   const StudentPanel = () => {


	const [listOfStudents, setListOfStudents]= useState([])

    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("Authorization"),
    };
    
    const url = `${baseUrl}/student/v1/allStudents`;
    

    useEffect(() => {
      axios
        .get(url, { headers }) // Pass the headers option with the JWT token
        .then(function (response) {
          setListOfStudents(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);

	const data = listOfStudents

    const hasScroll = data.length > 10;
    return (
        <>
         <div style={{backgroundColor:"rgb(25, 118, 210)",marginTop:"10px", marginBlock:"5px"}}>
   <Typography color="white" variant="h6" style={{ flexGrow: 1, outline:"1px solid  white",padding:
"5px"}}>
   Students
        </Typography>
        </div>
   
    <TableContainer component={Paper} style={{ maxHeight: hasScroll ? '400px' : 'auto', overflowY: hasScroll ? 'scroll' : 'visible' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
              Name
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
             Email
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
              Grade
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
              Phone Number
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
             Actions
            </TableCell>
         
          </TableRow>
        </TableHead>
        <TableBody>




          {data.length > 0 ? (
            data.map((x, key) => (
<TableRow key={key}>
  <TableCell>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <AccountCircleIcon
        style={{
          fontSize: '2rem',  // Adjust the size as needed
          color: 'rgb(25, 118, 210)', // Change the color to blue
        }}
      />
      <span>{x.firstName} {x.lastName}</span>
    </div>
  </TableCell>
  <TableCell>{x.studentEmail}</TableCell>
  <TableCell>{x.grade}</TableCell>
  <TableCell>{x.studentPhoneNumber}</TableCell>
  <TableCell>

      <ContactsIcon color="primary" /> {/* Use a suitable color for the Contact icon */}

      <VisibilityIcon color="primary" /> {/* Use a suitable color for the View icon */}

  </TableCell>
</TableRow>

            ))
          ) : (
            <TableRow>
              <TableCell colSpan="5">No open assignments found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TableRow>
      <TableCell colSpan="5"><button>Add New Student</button></TableCell>
      </TableRow>
    </TableContainer>
    </>
    )
    }


    export default StudentPanel;



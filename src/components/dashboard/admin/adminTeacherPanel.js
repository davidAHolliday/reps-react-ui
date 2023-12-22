import react, {useState,useEffect} from 'react'
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper,Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContactsIcon from '@mui/icons-material/Contacts';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from "axios"
import { baseUrl } from '../../../utils/jsonData'
import StudentProfile from '../../StudentProfile';
import AddTeacherForm from './addTeacherForm';

   const AdminTeacherPanel = () => {


	const [listOfStudents, setListOfStudents]= useState([])
  const [studentDisplay, setStudentDisplay] = useState(false);
  const [studentEmail, setStudentEmail] = useState("");
  const [studentName, setStudentName] = useState("");
  const [addTeacherDisplay,setAddTeacherDisplay] = useState(true);

    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("Authorization"),
    };
    
    const url = `${baseUrl}/users/v1/users`;
    

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

    const data = listOfStudents.filter((student) => 
    Array.isArray(student.roles) && student.roles.some((role) => role.role === "TEACHER")
  );
  


    const hasScroll = data.length > 10;
    return (
        <>
         <div style={{backgroundColor:"rgb(25, 118, 210)",marginTop:"10px", marginBlock:"5px"}}>
   <Typography color="white" variant="h6" style={{ flexGrow: 1, outline:"1px solid  white",padding:
"5px"}}>
   Teachers
        </Typography>
        </div>
   
        <TableContainer component={Paper} style={{ maxHeight: hasScroll ? '720px' : 'auto', overflowY: hasScroll ? 'scroll' : 'visible' }}>
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
              Role
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
              Phone Number
            </TableCell>
            {/* <TableCell variant="head" style={{ fontWeight: 'bold' }}>
             Actions
            </TableCell> */}
         
          </TableRow>
        </TableHead>
        <TableBody>


{console.log(data)}

          {data.length > 0 ? (
            data.map((x, key) => (
<TableRow key={key} onClick={() => {setStudentDisplay(true); setStudentEmail(x.username); setStudentName(x.firstName);}}>
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
  <TableCell>{x.username}</TableCell>
  <TableCell>
  {Array.isArray(x.roles) ? x.roles.map((roleObj, index) => (
    <span key={index}>{roleObj.role} {index < x.roles.length - 1 ? ',' : ''} </span>
  )) : 'No roles available'}
</TableCell>  
<TableCell>555-555-5555</TableCell>
  {/* <TableCell>

      <ContactsIcon color="primary" /> 

      <VisibilityIcon color="primary" /> 

  </TableCell> */}
</TableRow>

            ))
          ) : (
            <TableRow>
              <TableCell colSpan="5">No open assignments found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
   
    </TableContainer>
    {studentDisplay && <StudentProfile studentEmail={studentEmail} studentName={studentName}/>}


    </>
    )
    }


    export default AdminTeacherPanel;



import react, {useState,useEffect} from 'react'
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper,Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from "axios"
import { baseUrl } from '../../../utils/jsonData'
import StudentProfile from '../../StudentProfile';

   const AdminTeacherPanel = () => {


	const [data, setData]= useState([])
  const [studentDisplay, setStudentDisplay] = useState(false);
  const [studentEmail, setStudentEmail] = useState("");
  const [studentName, setStudentName] = useState("");

    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("Authorization"),
    };
    
    const url = `${baseUrl}/employees/v1/employees/TEACHER`;
    

    useEffect(() => {
      axios
        .get(url, { headers }) // Pass the headers option with the JWT token
        .then(function (response) {
          setData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);




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
  <TableCell>{x.email}</TableCell>
  <TableCell>{String(x.roles.map(x=>x.role))}</TableCell>

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



import react, {useState,useEffect} from 'react'
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from "axios"
import { baseUrl } from '../../../../utils/jsonData'
import StudentProfile from '../../../StudentProfile';

   const TeacherStudentPanel = () => {


	const [listOfStudents, setListOfStudents]= useState([])
  const [studentDisplay, setStudentDisplay] = useState(false);
  const [studentEmail, setStudentEmail] = useState("");
  const [studentName, setStudentName] = useState("");

    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("Authorization"),
    };
    

//Using punihsments to find asscoiated teachers
    // const url = `${baseUrl}/student/v1/allStudents`;
    const url = `${baseUrl}/punish/v1/punishments`;


    useEffect(() => {
      axios
        .get(url, { headers }) // Pass the headers option with the JWT token
        .then(function (response) {
          //Figure out how we are going to return only students associated with teacher.
          // Maybe only pulling up students with active and closed punishments
          const data = response.data.filter(x=> x.teacherEmail === sessionStorage.getItem("email"));
          console.log("find me",data)
          setListOfStudents(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);


  const uniqueMap = new Map();

  const data = listOfStudents.filter(item => {
    const studentId = item.student.studentIdNumber;
    
    // If the studentIdNumber is not in the map, add it and return true to keep the item
    if (!uniqueMap.has(studentId)) {
        uniqueMap.set(studentId, true);
        return true;
    }
    
    // If the studentIdNumber is already in the map, return false to filter out the duplicate item
    return false;
});

    const hasScroll = data.length > 10;
    return (
        <>
         <div style={{backgroundColor:"rgb(25, 118, 210)",marginTop:"10px", marginBlock:"5px"}}>
   <Typography color="white" variant="h6" style={{ flexGrow: 1, outline:"1px solid  white",padding:
"5px"}}>
   Students associated to teacher
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
            {/* <TableCell variant="head" style={{ fontWeight: 'bold' }}>
             Actions
            </TableCell> */}
         
          </TableRow>
        </TableHead>
        <TableBody>




          {data.length > 0 ? (
            data.map((x, key) => (
<TableRow key={key} onClick={() => {setStudentDisplay(true); setStudentEmail(x.studentEmail); setStudentName(x.firstName);}}>
  <TableCell>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <AccountCircleIcon
        style={{
          fontSize: '2rem',  // Adjust the size as needed
          color: 'rgb(25, 118, 210)', // Change the color to blue
        }}
      />
      <span>{x.student.firstName} {x.student.lastName}</span>
    </div>
  </TableCell>
  <TableCell>{x.student.studentEmail}</TableCell>
  <TableCell>{x.student.AccountCircleIcongrade}</TableCell>
  <TableCell>{x.student.studentPhoneNumber}</TableCell>
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
      {/* <TableRow>
      <TableCell colSpan="5"><button>Add New Student</button></TableCell>
      </TableRow> */}
    </TableContainer>
    {studentDisplay && <StudentProfile studentEmail={studentEmail} studentName={studentName}/>}
    </>
    )
    }


    export default TeacherStudentPanel;



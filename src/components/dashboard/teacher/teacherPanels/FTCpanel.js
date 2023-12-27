import react, {useState,useEffect} from 'react'
import * as React from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from "axios"
import { baseUrl } from '../../../../utils/jsonData'
import StudentProfile from '../../../StudentProfile';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



   const TeacherFTCPanel = () => {
    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    



	const [listOfStudents, setListOfStudents]= useState([])
  const [studentDisplay, setStudentDisplay] = useState(false);
  const [studentEmail, setStudentEmail] = useState("");
  const [studentName, setStudentName] = useState("");
  const [warningToast,setWarningToast] = useState(true)
  const [loading, setLoading] = useState(false) 

    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("Authorization"),
    };
    

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setWarningToast(false);
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
          console.log(response.data)
          const data = response.data.filter(x=> x.teacherEmail === sessionStorage.getItem("email")
          && x.infraction.infractionName === "Failure to Complete Work"
          && x.status === "CFR");
          setListOfStudents(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, [warningToast]);




const data = listOfStudents;
    const hasScroll = data.length > 10;


    const handleFTCClose = (obj) =>{
      const url = `${baseUrl}/punish/v1/close/${obj.punishmentId}`;
      axios
      .post(url,[], { headers }) // Pass the headers option with the JWT token
      .then(function (response) {
        console.log(response)
        setWarningToast(true)
        setLoading(true)
        setTimeout(()=>{setWarningToast(false)}
        ,2000)
      })
      .catch(function (error) {
        console.log(error);
      });
  };


    
    return (
        <>
         <div style={{backgroundColor:"rgb(25, 118, 210)",marginTop:"10px", marginBlock:"5px"}}>
   <Typography color="white" variant="h6" style={{ flexGrow: 1, outline:"1px solid  white",padding:
"5px"}}>
   Assignments FTC
        </Typography>
        </div>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={warningToast} autoHideDuration={6000} onClose={handleClose}>
  <Alert Close={handleClose} severity="success" sx={{ width: '100%' }}>
    Assignment has been marked Complete
  </Alert>
</Snackbar>
   
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
              Description of Work
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
             Action
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
  <TableCell>{x.student.grade}</TableCell>
  <TableCell>{x.infraction.infractionDescription[1]}</TableCell>
  <TableCell><button onClick={()=>{handleFTCClose(x)}}>Mark complete</button></TableCell>
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
    </>
    )
    }


    export default TeacherFTCPanel;



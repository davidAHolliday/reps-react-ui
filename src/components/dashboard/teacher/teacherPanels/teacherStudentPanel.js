import react, {useState,useEffect,useRef} from 'react'
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from "axios"
import { baseUrl } from '../../../../utils/jsonData'
import StudentProfile from '../../../StudentProfile';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Select from "react-select";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { IncidentByTypePieChart } from './incidentsByType';


   const TeacherStudentPanel = () => {


	const [listOfStudents, setListOfStudents]= useState([])
  const [studentDisplay, setStudentDisplay] = useState(false);
  const [studentEmail, setStudentEmail] = useState("");
  const [studentData, setStudentData] = useState("");
  const [studentProfileModal,setStudentProfileModal] = useState(false)
  const [studentName, setStudentName] = useState("")
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("Authorization"),
    };

    const admin = sessionStorage.getItem("role")=== "ADMIN";

    
//get
    const url = `${baseUrl}/student/v1/allStudents`;
    useEffect(() => {
      axios
        .get(url, { headers }) // Pass the headers option with the JWT token
        .then(function (response) {
          //Figure out how we are going to return only students associated with teacher.
          // Maybe only pulling up students with active and closed punishments
          // if(admin){
          //   const data = response.data;
          //   setListOfStudents(data);


          // }else{
          //   const data = response.data.filter(x=> x.teacherEmail === sessionStorage.getItem("email"));
          //   setListOfStudents(data);

          // }
          const data = response.data
          setListOfStudents(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);



console.log(listOfStudents)



const fetchStudentData = (studentEmail) =>{
  const studentUrl= `${baseUrl}/punish/v1/student/punishments/${studentEmail}`;
  axios
  .get(studentUrl, { headers }) // Pass the headers option with the JWT token
  .then(function (response) {
    //Figure out how we are going to return only students associated with teacher.
    // Maybe only pulling up students with active and closed punishments
    const data = response.data;
    setStudentData(data);
    setStudentDisplay(true);  

  })
  .catch(function (error) {
    console.log(error);
  });
}

const handleSearchChange = (e) => {
  setSearchQuery(e.target.value);
};

useEffect(() => {
  // Filter the data based on the search query
  const filteredRecords = listOfStudents.filter(student => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();

    return fullName.includes(searchQuery.toLowerCase());
  });
  setFilteredData(filteredRecords);
}, [listOfStudents, searchQuery]);
   


  // const uniqueMap = new Map();

  // const data = listOfStudents.filter(item => {
  //   const studentId = item.student.studentIdNumber;
  //   let unique = [];

  //   listOfStudents.forEach(punishment => {
  //     // Check if the student is in unique
  //     const existingStudent = unique.find(item =>
  //       item.student.studentIdNumber === punishment.student.studentIdNumber);

  //     // If not found, push to unique
  //     if(!existingStudent) {
  //       unique.push(punishment);
  //     }
  //   });

//     // If the studentIdNumber is not in the map, add it and return true to keep the item
//     if (!uniqueMap.has(studentId)) {
//         uniqueMap.set(studentId, true);
//         return true;
//     }
    
//     // If the studentIdNumber is already in the map, return false to filter out the duplicate item
//     return false;
// });

const handleProfileClick = (x) =>{
  setStudentName(x.firstName);
  fetchStudentData(x.studentEmail)
}

const pdfRef = useRef();

const generatePDF = (studentData) => {
  const pdf = new jsPDF();
    // Add logo
    const logoWidth = 50; // Adjust the width of the logo as needed
    const logoHeight = 50; // Adjust the height of the logo as needed
    const logoX = 130; // Adjust the X coordinate of the logo as needed
    const logoY = 15; // Adjust the Y coordinate of the logo as needed
    
//https://medium.com/dont-leave-me-out-in-the-code/5-steps-to-create-a-pdf-in-react-using-jspdf-1af182b56cee
//Resource for adding image and how pdf text works
    var image = new Image();
    image.src = "/burke-logo.png";
    pdf.addImage(image, 'PNG', logoX,logoY , logoWidth, logoHeight);

  // Add student details section
  pdf.setFontSize(12)
  pdf.rect(15,15,180,50)
  pdf.text(`${studentData[0].student.firstName} ${studentData[0].student.lastName}`, 20, 20);
  pdf.text(`Email: ${studentData[0].student.studentEmail}`, 20, 30);
  pdf.text(`Phone: ${studentData[0].student.studentPhoneNumber}`, 20, 40);
  pdf.text(`Grade: ${studentData[0].student.grade}`, 20, 50);
  pdf.text(`Address: ${studentData[0].student.address}`, 20, 60);

  // Add punishment details table
  pdf.autoTable({
    startY: 70, // Adjust the Y-coordinate as needed
    head: [['Status', 'Description', 'Date', 'Infraction']],
    body: studentData.map((student) => [
      student.status,
      student.infraction.infractionDescription,
      student.timeCreated,
      student.infraction.infractionName,
    ]),
  });

  // Save or open the PDF
  pdf.save('student_report.pdf');
};

console.log(studentData)

    const hasScroll = listOfStudents.length > 10;

    return (
        <>
        {studentDisplay && studentData.length == 0 && <div style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  top: 300,
  left: 0,
  width: '100%',
  height: '25%',
}} className="modal-overlay">
  <div style={{
    height: '80%',
    width: '80%',
    position: 'relative',
    backgroundColor: 'white',  // Adjust background color as needed
    padding: '20px',          // Adjust padding as needed
    borderRadius: '8px',      // Add border radius as needed
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Add box shadow as needed
  }} className="modal-content">
      <div className='modal-header'>
        <h1>Student has No punishments</h1>
        </div>
        <div style={{padding:"10px"}} className='modal-buttons'>
        <button onClick={() => { setStudentDisplay(false) }}>Cancel</button>
        <button onClick={()=>{generatePDF(studentData)}}style={{backgroundColor:"#CF9FFF"}} >Print</button>

      </div>
        </div>
        </div>
        
        
        
        
        }
       {(studentDisplay && studentData.length > 0) && (


<div style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
}} className="modal-overlay">
  <div style={{
    height: '80%',
    width: '80%',
    position: 'relative',
    backgroundColor: 'white',  // Adjust background color as needed
    padding: '20px',          // Adjust padding as needed
    borderRadius: '8px',      // Add border radius as needed
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Add box shadow as needed
  }} className="modal-content">
      <div className='modal-header'>
        <div style={{display:"flex", flexDirection:"row"}}>
            <div className='box-left'>

              <div className='student-info-box'>
                <div style={{display:"flex",backgroundColor:""}}className='icon'>
                <AccountBoxIcon style={{fontSize:"100px"}}/>
                </div>
              <h4 style={{ textAlign: "left" }}>{studentData[0].student.firstName} {studentData[0].student.lastName}</h4>
                <div className='details-box'>
                  <div style={{ textAlign: "left" }}>Email: {studentData[0].student.studentEmail}</div>
                  <div style={{ textAlign: "left" }}>Phone: {studentData[0].student.studentPhoneNumber}</div>
                  <div style={{ textAlign: "left" }}>Grade: {studentData[0].student.grade}</div>
                  <div style={{ textAlign: "left" }}>Address: {studentData[0].student.address}</div>
                 </div>
            </div>
            </div>

            <div style={{color:"white",   marginLeft: "auto" }} className='box-right'>
        <IncidentByTypePieChart data={studentData[0].student}/>

            </div>
 
      
      </div>
      </div>
    <div style={{height:"320px"}}className='modal-body-student'>
  <TableContainer style={{height:"300px",backgroundColor:"white" }}>
    <Table stickyHeader>
    <TableHead>
      <TableRow>
        <TableCell style={{ width: "25%" }}>
          Status
        </TableCell>
        <TableCell style={{ width: "25%" }}>
          Description
        </TableCell>
        <TableCell style={{ width: "25%" }}>
          Date
        </TableCell>
        <TableCell style={{ width: "25%" }}>
          Infraction
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody >
      {studentData.map((student, index) => (
        <TableRow style={{ background: index % 2 === 0 ? "lightgrey" : "white" }} key={index}>
          <TableCell style={{ width: "25%" }}>
            {student.status}
          </TableCell>
          <TableCell style={{ width: "25%" }}>
            {student.infraction.infractionDescription}
          </TableCell>
          <TableCell style={{ width: "25%" }}>
            {student.timeCreated}
          </TableCell>
          <TableCell style={{ width: "25%" }}>
            {student.infraction.infractionName}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
    </Table>
  </TableContainer>
</div>


      <div style={{padding:"10px"}} className='modal-buttons'>
        <button onClick={() => { setStudentDisplay(false) }}>Cancel</button>
        <button onClick={()=>{generatePDF(studentData)}}style={{backgroundColor:"#CF9FFF"}} >Print</button>

      </div>
    </div>
  </div>
)}

         <div style={{backgroundColor:"rgb(25, 118, 210)",marginTop:"10px", marginBlock:"5px"}}>
   <Typography color="white" variant="h6" style={{ flexGrow: 1, outline:"1px solid  white",padding:
"5px"}}>
   Students Overview
        </Typography>
        </div>

    <TableContainer component={Paper} style={{ maxHeight: hasScroll ? '400px' : 'auto', overflowY: hasScroll ? 'scroll' : 'visible' }}>
      <Table>
        <TableHead>
        <TableRow>
        <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
      />
        </TableRow>
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

          {filteredData.length > 0 ? (
            
            filteredData.map((x, key) => (
<TableRow key={key} onClick={() => {handleProfileClick(x)}}>
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
  <TableCell>{x.AccountCircleIcongrade}</TableCell>
  <TableCell>{x.studentPhoneNumber}</TableCell>
 
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


    export default TeacherStudentPanel;



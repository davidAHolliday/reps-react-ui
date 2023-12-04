import react from 'react'
import { useState,useEffect } from 'react';
import Typography from '@mui/material/Typography';
import axios from "axios";
import Select from "react-select";
import { baseUrl } from '../../../utils/jsonData';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { redirect, useNavigate } from 'react-router-dom';


const defaultTheme = createTheme();


   const CreatePunishmentPanel = () => {
    const[teacherEmail,setTeacherEmail]= useState("");
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [infraction, setInfraction] = useState('');
    const [offenseDescription,setOffenseDescription] = useState("");
    const [infractionPeriod, setInfractionPeriod] = useState("");
    const [errorDisplay, setErrorDisplay] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successDisplay, setSuccessDisplay] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [listOfStudents, setListOfStudents] = useState([]);
  
  
  
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  
    const tardyDescription = "Description of Behavior/Event. This will be sent directly to the student and guardian so be sure to provide accurate and objective facts."
    const cellPhoneDescription = "Description of Behavior/Event. This will be sent directly to the student and guardian so be sure to provide accurate and objective facts."
    const disruptiveBehavioralDescription = "Description of Behavior/Event. This will be sent directly to the student and guardian so be sure to provide accurate and objective facts."
    const HorseplayDescription = "Description of Behavior/Event. This will be sent directly to the student and guardian so be sure to provide accurate and objective facts."
    const failureToCompleteWorkDescription = "Provide a brief description of the missing assignment (Name of assignment in Powerschool, link to the assignment if possible, the impact it is having on the students grade and the possible points they can regain upon completion.)"
    const dressCodeDescription = "Description of Behavior/Event. This will be sent directly to the student and guardian so be sure to provide accurate and objective facts."
    const positiveBehaviorDescription = "Needs Text"
    const failureToCompleteWorkTitle = "Failure to complete Work"
    const otherTitle = "For all offenses other than positive behavior shout out and failure to complete work."
    const behaviorShoutTitle = "Shout Comment"
    const [selectedOptions, setSelectedOptions] = useState();
    const [infractionPeriodSelectedOptions, setInfractionPeriodSelectedOptions] = useState();
    const [infractionSelectedOptions, setInfractionSelectedOptions] = useState();

    
    
    const infractionPeriodSelectOptions =[
      {value:"block1", label:"Block 1"},
      {value:"block2", label:"Block 2"},
      {value:"block3", label:"Block 3"},
      {value:"block4", label:"Block 4"},
      {value:"period1", label:"Period 1"},
      {value:"period2", label:"Period 2"},
      {value:"period3", label:"Period 3"},
      {value:"period4", label:"Period 4"},
      {value:"period5", label:"Period 5"},
      {value:"period6", label:"Period 6"},
      {value:"period7", label:"Period 7"},
      {value:"period8", label:"Period 8"},
      {value:"period9", label:"Period 9"},


    ]

    const infractionSelectOptions =[
      {value:"positiveBehavior", label:"Positive Behavioral Shout Out!"},
      {value:"behavioralConcern", label:"Behaviral Concern"},

    ]
  
  
  
  
  
  
  
  
    const resetForm = () => {
      setTeacherEmail("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setInfraction("");
      setOffenseDescription("");
      setInfractionPeriod("");
      setSelectedOptions("")
    };
    
    
    const descriptions = {
      "Failure to Complete Work": "Please write a description of the missing assignment, when it was due, and a link to the assignment if one is available. Please also explain how the missing assignment is effecting the student's grade and how many points they can earn upon completion.",
      "Positive Behavior Shout Out!": "Thank you for choosing to shout out a successful student! Please write a description of the action that earned a shout out along with the student's name and anyone else who was involved.",
    };
  
    const titles = {
      "Failure to Complete Work": "Failure to Complete Work",
      "Positive Behavior Shout Out!": "Positive Behavior Shout Out! ",
    };
  
//Select Dropdown Styles

    
  
    const getDescription = (selectedOption) =>{
      return descriptions[selectedOption] ||  "Description of Behavior/Event. This will be sent directly to the student and guardian so be sure to provide accurate and objective facts."
  
    }
  
    const getTitle = (selectedOption) =>{
      return titles[selectedOption] ||  "For all offenses other than positive behavior shout out and failure to complete work."
    }
  
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("Authorization"),
    };
    
    const url = `${baseUrl}/student/v1/allStudents`; // Replace with your actual API endpoint
    
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
  
      const selectOptions = listOfStudents.map(student => ({
          value: student.studentEmail, // Use a unique value for each option
          label: `${student.firstName} ${student.lastName} - ${student.studentEmail}`, // Display student's full name as the label
          firstName: student.firstName,
          lastName: student.lastName
          
        }));
      
        // Handle the selection change
  
      function findStudentByEmail(email) {
          const foundStudent = listOfStudents.find(student => student.studentEmail === email);
          return foundStudent || null; // Returns the found student or null if not found
        }
  
      function handleSelect(data) {
      setSelectedOptions(data);
      setFirstName(data.firstName);
      setLastName(data.lastName)
      setEmail(data.value)
        }
  
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (!emailPattern.test(email)) {
          setErrorDisplay(true);
          setErrorMessage('Please enter a valid email address');
          return; // Do not proceed with submission
        }
  
      const foundStudent = findStudentByEmail(email);
  
      if(foundStudent){
          var payload = {
              "firstName" :firstName ,
              "lastName": lastName,
              "studentEmail": email,
              "infractionName": infraction,
              "infractionPeriod":infractionPeriod ,
              "infractionDescription" : offenseDescription,
              "teacherEmail": teacherEmail
              }
            }
  
      //         axios.post(`${baseUrl}/punish/v1/startPunish/form`,payload,
      //          {headers: headers}
  
      //         )
      //         .then(function (res){
      //          setSuccessDisplay(true)
      //          setSuccessMessage(res.status === 202 ? "Punishment Created":"error")
      //          setTimeout(()=>{
      //              setSuccessDisplay(false)
      //          },3000)
      //          resetForm();
      //          console.log(res)
      //      })
      //         .catch(function (error){
      //          console.log(error)
      //          const errorMessage = error.response.status === 500 ? "Bad Request": "Other Error";
      //          setErrorDisplay(true)
      //          setErrorMessage(errorMessage)
      //          setTimeout(()=>{
      //              setErrorDisplay(false)
      //          },2000)
      //      });
      // }else{
      //     setErrorDisplay(true)
      //     setErrorMessage("Student Not Found in System")
      //     setTimeout(()=>{
      //         setErrorDisplay(false)
      //     },2000)
  
      // }
    }

    return (
        <>
         <div style={{backgroundColor:"rgb(25, 118, 210)",marginTop:"10px", marginBlock:"5px"}}>
          <Typography color="white" variant="h6" style={{ flexGrow: 1, outline:"1px solid  white",padding:
"5px"}}>
   Create New Punishement
        </Typography>
        </div>

        <div className="page-container">
      <div className="lrKTG">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="M7eMe">REPS Teacher Managed Referral</div>
             <h5> This form will be used to provide automated assignments based on the behavior described in this form. The offense number will be looked up automatically and will include offenses from other class. A list of the offenses and their assignments can be viewed{' '}
 After completing this form, the student and their guardian will be informed of the incident and given a restorative assignment to complete to gain insight on the negative effects of the behavior. REPS Discipline Management System will also send follow-up emails if additional steps are needed. These emails are designed to be copied and pasted directly into Review 360 when necessary. </h5>
   
            <div className="md0UAd" aria-hidden="true" dir="auto">
              * Indicates required question
            </div>
            {successDisplay && <span style={{background:"green"}}> {successMessage}</span>}
            {errorDisplay && <span style={{background:"pink"}}> {errorMessage}</span>}
            


            <ThemeProvider theme={defaultTheme}>
      <Container component="main" >

        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width:"100%"
          }}
        >
        
          <Typography component="h1" variant="h5">
           Create New Punishment
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          
       
            <label htmlFor="selectStudent">Select Student *</label>
             
                <Select
                name="selectStudent"
                options={selectOptions}
                placeholder="Select Student"
                value={selectedOptions}
                onChange={handleSelect}
                isSearchable={true}
  
              />
              
              <TextField
              margin="normal"
              required
              fullWidth
              id="teacherEmail"
              label="Teachers Email"
              name="teacherEmail"
              autoComplete="email"
              autoFocus
              InputLabelProps={{
                sx: {  "&.Mui-focused": { color: "white", marginTop:"-10px" } },
              }}
    
            />

        
<Select
                name="infractionPeriod"
                options={infractionPeriodSelectOptions}
                placeholder="Choose Period"
                value={infractionPeriodSelectedOptions}
                onChange={handleSelect}
                isSearchable={true}
  
              />
              
<div style={{marginTop:"10px"}}>
<Select
      
      name="infraction"
      options={infractionSelectOptions}
      placeholder="Choose Infraction Type"
      value={infractionSelectedOptions}
      onChange={handleSelect}
      isSearchable={true}
  
              />
  
</div>



<div className='question-container-text-area'>
              <label htmlFor="offenseDescription">
              {infraction === "Failure to Complete Work" ||
                infraction === "Positive Behavior Shout Out!" ||
                infraction === "Behavioral Concern"
                  ? getTitle(infraction)
                  : "For all offenses other than positive behavior shout out and failure to complete work"} *</label>
              <h5>
                {infraction === "Failure to Complete Work" ||
                infraction === "Positive Behavior Shout Out!" ||
                infraction === "Behavioral Concern"
                  ? getDescription(infraction)
                  : "Description of Behavior/Event. This will be sent directly to the student and guardian so be sure to provide accurate and objective facts."}
              </h5>
              </div>
                  
<TextField
              margin="normal"
              required
              fullWidth
              id="offenseDescription"
              label="Please Type Short Description of Infraction"
              name="offenseDescripstion"
              autoFocus
              InputLabelProps={{
                sx: {  "&.Mui-focused": { color: "white", marginTop:"-10px" } },
              }}
    
            />

      
            <br/>



          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
           Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
   </form>
   </div>
    </div>
    </div>
  
    </>
    )
    
  }
  export default CreatePunishmentPanel;
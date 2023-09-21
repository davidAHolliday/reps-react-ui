import React, { useEffect, useState } from 'react';
import axios from "axios";

function MyForm() {
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
  const [listOfStudents, setListOfStudents] = useState({});

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

  const descriptions = {
    "Failure to Complete Work": "Description for Failure to Complete Work option",
    "Positive Behavior Shout Out!": "Description for Positive Behavior Shout Out! option",
  };

  const titles = {
    "Failure to Complete Work": "Failure to Complete Work",
    "Positive Behavior Shout Out!": "Positive Behavior Shout Out! ",
  };


  const getDescription = (selectedOption) =>{
    return descriptions[selectedOption] ||  "Description of Behavior/Event. This will be sent directly to the student and guardian so be sure to provide accurate and objective facts."

  }

  const getTitle = (selectedOption) =>{
    return titles[selectedOption] ||  "For all offenses other than positive behavior shout out and failure to complete work."
  }


useEffect(()=>{
        axios.get("https://repsdms.ue.r.appspot.com/student/v1/allStudents")
        .then(function(response){
            setListOfStudents(response.data)

        }).catch(function (error){
            console.log(error)
        })

    },[email])

    console.log("array")
    console.log(listOfStudents)

    function findStudentByEmail(email) {
        const foundStudent = listOfStudents.find(student => student.studentEmail === email);
        return foundStudent || null; // Returns the found student or null if not found
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

            axios.post("https://repsdms.ue.r.appspot.com/punish/v1/startPunish/form",payload
            )
            .then(function (res){
             setSuccessDisplay(true)
             setSuccessMessage(res.status === 202 ? "Punishement Created":"error")
             setTimeout(()=>{
                 setSuccessDisplay(false)
             },2000)
             console.log(res)
         })
            .catch(function (error){
             console.log(error)
             const errorMessage = error.response.status === 500 ? "Bad Request": "Other Error";
             setErrorDisplay(true)
             setErrorMessage(errorMessage)
             setTimeout(()=>{
                 setErrorDisplay(false)
             },2000)
         });
    }
    setErrorDisplay(true)
    setErrorMessage("Student Not Found in System")
    setTimeout(()=>{
        setErrorDisplay(false)
    },2000)

   
  };

  return (
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
            <div className='question-container'>
              <label htmlFor="teacherEmail">Teacher's Email *</label>
              <input
                type="text"
                id="teacherEmail"
                name="teacherEmail"
                value={teacherEmail}
                onChange={(e) => setTeacherEmail(e.target.value)}
                required
              />
            </div>
            <div className='question-container'>
              <label htmlFor="firstName">Student's First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className='question-container'>
              <label htmlFor="lastName">Student's Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className='question-container'>
              <label htmlFor="email">Student's Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)}}
                required
              />
            </div>
            <div className='question-container'>
              <label htmlFor="infractionPeriod">Infraction Period *</label>
              <input
                type="text"
                id="infractionPeriod"
                name="infractionPeriod"
                value={infractionPeriod}
                onChange={(e) => setInfractionPeriod(e.target.value)}
                required
              />
            </div>
            <div className='question-container'>
              <label htmlFor="infraction">Name of the Infraction or Positive Behavior Shout Out *</label>
              <select
                id="infraction"
                name="infraction"
                value={infraction}
                onChange={(e) => setInfraction(e.target.value)}
                required
              >
                <option value="">Choose</option>
                <option value="Tardy">Tardy</option>
                <option value="Unauthorized Device/Cell Phone">Unauthorized Device/Cell Phone</option>
                <option value="Disruptive Behavior">Disruptive Behavior</option>
                <option value="Horseplay">Horseplay</option>
                <option value="Failure to Complete Work">Failure to Complete Work</option>
                <option value="Dress Code">Dress Code</option>
                <option value="Positive Behavior Shout Out!">Positive Behavior Shout Out!</option>
              </select>
            </div>

            <div className='question-container-text-area'>
              <label htmlFor="offenseDescription">
              {infraction === "Failure to Complete Work" ||
                infraction === "Positive Behavior Shout Out!"
                  ? getTitle(infraction)
                  : "For all offenses other than positive behavior shout out and failure to complete work"} *</label>
              <h5>
                {infraction === "Failure to Complete Work" ||
                infraction === "Positive Behavior Shout Out!"
                  ? getDescription(infraction)
                  : "Description of Behavior/Event. This will be sent directly to the student and guardian so be sure to provide accurate and objective facts."}
              </h5>
              <input
                type="text"
                id="offenseDescription"
                name="offenseDescription"
                value={offenseDescription}
                onChange={(e) => setOffenseDescription(e.target.value)}
                required
              />
            </div>
            <button type="submit">Next</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MyForm;

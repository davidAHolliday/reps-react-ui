import React, { useEffect, useState } from 'react';
import axios from "axios";
import EssayFactory from './ViolationContents/EssayFormat';
import RetryQuestionFormat from './ViolationContents/RetryQuestionFormat';
import { baseUrl, essayData } from '../utils/jsonData';
import { useParams } from 'react-router-dom';



function ViolationPage(props) {
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [sectionNumber, setSectionNumber] = useState(1); //what section fo form are we on
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [listOfStudents, setListOfStudents] = useState({});
  const [email, setEmail] = useState();
  const [userValidated, setUserValidated] = useState(false);

  const { param1 } = useParams();
  const essay = essayData[param1]


  const headers = {
    Authorization: "Bearer " + sessionStorage.getItem("Authorization"),
  };
  
  
  useEffect(() => {
    axios.get(`${baseUrl}/student/v1/allStudents`,{headers})
      .then(function (response) {
        setListOfStudents(response.data);
  
        const foundStudent = response.data.find(student => student.studentEmail === email);
  
        if (foundStudent) {
          setUserValidated(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [email]);
  







const saveAnswerAndProgress = () =>{
  if(userValidated){
    if(selectedAnswer === "correct"){
      window.alert("this message is correct")
      console.log(sectionNumber)
      setSectionNumber((prev) => prev + 2);
      console.log(sectionNumber)
  
    }else{
      window.alert("this message is wrong")
      setSectionNumber((prev) => prev + 1);
    }
  

  }else{
    window.alert("Email Not Registered in Reps DMS System")
  }

}

const textCorrectlyCopied = (selectedAnswer) =>{
  if(selectedAnswer === "correct"){
    window.alert("this message is correct")
    console.log(sectionNumber)
    setSectionNumber((prev) => prev + 1);
    console.log(sectionNumber)
}
}

  const handleRadioChange = (e) =>{
    setSelectedAnswer(e.target.value);
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    
        var payload = {
            "studentEmail" :email ,
            "infractionName": essay.infractionName,
            "infractionLevel": essay.level
            }
        

            axios.post(`${baseUrl}/punish/v1/punishId/close`,payload,{headers:headers}
            // axios.post("http://localhost:8080/punish/v1/startPunish/form",payload

            )
            .then(function (res){
              console.log(res)
              window.alert(`You Work Has been Recorded for  ${payload.studentEmail}`)

            //  setSuccessDisplay(true)
            //  setSuccessMessage(res.status === 202 ? "Punishement Created":"error")
            //  setTimeout(()=>{
            //      setSuccessDisplay(false)
            //  },3000)
            //  resetForm();
            //  console.log(res)
         })
            .catch(function (error){
              console.log(error)

            //  console.log(error)
            //  const errorMessage = error.response.status === 500 ? "Bad Request": "Other Error";
            //  setErrorDisplay(true)
            //  setErrorMessage(errorMessage)
            //  setTimeout(()=>{
            //      setErrorDisplay(false)
            //  },2000)
         });
   
  };




  return (
    <div className="page-container">
      <div className="lrKTG">
        <div className="form-container" style={{width:"100%"}}>
          <form onSubmit={handleSubmit}>
            <h1 className="instructions">{essay.infractionName} Violation Level:{essay.level}</h1>
                {sectionNumber == 1 &&<div className='question-container'>
              <label htmlFor="email">Enter Your Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>}
            <hr></hr>
   
{sectionNumber ===1 && <EssayFactory essay={essay['Question 1']} handleRadioChange={handleRadioChange} sectionName={"Question 1"} />}
{sectionNumber ===2 && <RetryQuestionFormat essay={essay['Question 1']} saveAnswerAndProgress={textCorrectlyCopied} sectionName={"Retry Question 1"}/>}
{sectionNumber ===3 && <EssayFactory essay={essay['Question 2']} handleRadioChange={handleRadioChange} sectionName={"Question 2"} />}
{sectionNumber ===4 && <RetryQuestionFormat essay={essay['Question 2']} saveAnswerAndProgress={textCorrectlyCopied} sectionName={"Retry Question 2"}/>}
{sectionNumber ===5 && <EssayFactory essay={essay['Question 3']} handleRadioChange={handleRadioChange}sectionName={"Question 3"} />}
{sectionNumber ===6 && <RetryQuestionFormat essay={essay['Question 3']} saveAnswerAndProgress={textCorrectlyCopied} sectionName={"Retry Question 3"}/>}
{sectionNumber ===7 && <EssayFactory essay={essay['Question 4']} handleRadioChange={handleRadioChange} sectionName={"Question 4"}/>}
{sectionNumber ===8 && <RetryQuestionFormat essay={essay['Question 4']} saveAnswerAndProgress={textCorrectlyCopied} sectionName={"Retry Question 4"}/>}
{sectionNumber ===9 ?  <div> <h1>Congratuations! You have Completed the Assignment </h1><br/>
<h3>Hit Submit to Record Your Response for {email} </h3>

<button  onClick={()=> handleSubmit()} type="submit">Submit</button>
</div> :
<button type='button' onClick={() => saveAnswerAndProgress()}>Submit</button>}

         </form>
        </div>
      </div>
    </div>
  );
}

export default ViolationPage;

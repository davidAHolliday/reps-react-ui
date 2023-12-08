import { useEffect, useState } from 'react';
import axios from 'axios';
import EssayFactory from './ViolationContents/EssayFormat';
import RetryQuestionFormat from './ViolationContents/RetryQuestionFormat';
import { baseUrl, essayData } from '../utils/jsonData';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import OpenEndedFormat from './ViolationContents/OpenEndedFormat';
import MultipleChoiceFormat from './ViolationContents/MultipleChoiceFormat';
import { Container } from '@mui/material';




 export default function ViolationPage(props) {
  const [sectionNumber, setSectionNumber] = useState(1); //what section fo form are we on
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [email, setEmail] = useState('');
  const [studentAnswers, setStudentAnswers] = useState([])

  const { param1, param2 } = useParams();
  console.log(param1)
  console.log(param2)

  console.log(essayData)

  const essay =  Object.values(essayData).filter(
    essay =>
      essay.infractionName === param1 &&  
       essay.level === parseInt(param2) 
  )[0]; // Assuming there is only one matching essay, change this logic if needed

  const loggedInUser = sessionStorage.getItem("email")
   

const saveAnswerAndProgress = () =>{
  if(loggedInUser){
    if(selectedAnswer === "correct"){
      window.alert("Congratulations! That is correct!")
      console.log(sectionNumber)
      setSectionNumber((prev) => prev + 2);
      console.log(sectionNumber)
  
    }else{
      window.alert("Sorry, that is incorrect")
      setSectionNumber((prev) => prev + 1);
    }
  

  }else{
    window.alert("Email Not Registered in Reps DMS System")
  }

}



const textCorrectlyCopied = (selectedAnswer) =>{
  if(selectedAnswer === "correct"){
    window.alert("Congratulations! That is correct!")
    console.log(sectionNumber)
    setSectionNumber((prev) => prev + 1);
    console.log(sectionNumber)
}

}

const openEndedQuestionAnswered = (selectedAnswer) =>{
 console.log(selectedAnswer)
    setSectionNumber((prev) => prev + 1);
    console.log(sectionNumber)
    setStudentAnswers((prev) => [...prev, selectedAnswer]);

}

console.log(studentAnswers)



const handleRadioChange = (e) =>{
  setSelectedAnswer(e.target.value);
}


const handleSubmit = () => {

  var payload = {
      "studentEmail" :loggedInUser ,
      "infractionName": essay.infractionName,
      "studentAnswer": studentAnswers
      }
  

      
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("Authorization"),
    };
    
    const url = `${baseUrl}/punish/v1/punishId/close`;
  

      axios.post(url,payload, { headers })
      .then(function (res){
        console.log(res)
        window.alert(`You Work Has been Recorded for ${payload.studentEmail}`)
    
        window.opener = null;
        window.open("", "_self");
        window.close();


    })
      .catch(function (error){
        console.log(error)

  
  });

  }
  


  

if(essay.level < 3) {
return (
  <Container className="">
<a href="/dashboard/student">
  <button>Go Home</button>
</a>
    <div className="lrKTG">
      <div className="form-container" style={{width:"100%"}}>
        <form>
          <h1 className="instructions">{essay.infractionName} Violation Level:{essay.level}</h1>
              {sectionNumber === 1 &&<div className='question-container'>
            <h3>  Student: {sessionStorage.getItem("userName")} - {loggedInUser} </h3>

            </div>}
          <hr></hr>
    
          {sectionNumber ===1 && <EssayFactory essay={essay['Question 1']}
saveAnswerAndProgress={saveAnswerAndProgress}
handleRadioChange={handleRadioChange} sectionName={"Question 1"} />}

{sectionNumber ===2 && <RetryQuestionFormat essay={essay['Question 1']} 
saveAnswerAndProgress={textCorrectlyCopied} sectionName={"Retry Question 1"}/>}

{sectionNumber ===3 && <EssayFactory essay={essay['Question 2']} 
saveAnswerAndProgress={saveAnswerAndProgress}
handleRadioChange={handleRadioChange} sectionName={"Question 2"} />}

{sectionNumber ===4 && <RetryQuestionFormat essay={essay['Question 2']} 
saveAnswerAndProgress={textCorrectlyCopied} 
sectionName={"Retry Question 2"}/>}

{sectionNumber ===5 && <EssayFactory essay={essay['Question 3']} 
saveAnswerAndProgress={saveAnswerAndProgress}
handleRadioChange={handleRadioChange}sectionName={"Question 3"} />}

{sectionNumber ===6 && <RetryQuestionFormat 
essay={essay['Question 3']} 
saveAnswerAndProgress={textCorrectlyCopied} 
sectionName={"Retry Question 3"}/>}

{sectionNumber ===7 && <EssayFactory essay={essay['Question 4']}
saveAnswerAndProgress={saveAnswerAndProgress}
 handleRadioChange={handleRadioChange} sectionName={"Question 4"}/>}
 
{sectionNumber ===8 && <RetryQuestionFormat essay={essay['Question 4']} 
saveAnswerAndProgress={textCorrectlyCopied} sectionName={"Retry Question 4"}/>}

{sectionNumber ===9 &&  <div> <h1>Congratuations! You have Completed the Assignment </h1><br/>
<h3>Hit Submit to Record Your Response for {email} </h3>
<button  onClick={()=> handleSubmit()} type="submit">Submit</button>

</div>}

        </form>
      </div>
    </div>
  </Container>
);
} else {
  return( 
    <div className="page-container">
    <div className="lrKTG">
      <div className="form-container" style={{width:"100%"}}>
        <form onSubmit={handleSubmit}>
        <h1 className="instructions">{essay.infractionName} Violation Level:{essay.level}</h1>
              {sectionNumber === 1 &&<div className='question-container'>
            <label htmlFor="selectStudent">Select Student *</label>
            <h3>  Student {sessionStorage.getItem("userName")} - {loggedInUser} </h3>

            </div>}
          <hr></hr>
          {console.log(essay)}
 
{sectionNumber ===1 && <EssayFactory essay={essay['Question 1']}
saveAnswerAndProgress={saveAnswerAndProgress}
handleRadioChange={handleRadioChange} sectionName={"Question 1"} />}

{sectionNumber ===2 && <RetryQuestionFormat essay={essay['Question 1']} 
saveAnswerAndProgress={textCorrectlyCopied} sectionName={"Retry Question 1"}/>}

{sectionNumber ===3 && <EssayFactory essay={essay['Question 2']} 
saveAnswerAndProgress={saveAnswerAndProgress}
handleRadioChange={handleRadioChange} sectionName={"Question 2"} />}

{sectionNumber ===4 && <RetryQuestionFormat essay={essay['Question 2']} 
saveAnswerAndProgress={textCorrectlyCopied} 
sectionName={"Retry Question 2"}/>}

{sectionNumber ===5 && <EssayFactory essay={essay['Question 3']} 
saveAnswerAndProgress={saveAnswerAndProgress}
handleRadioChange={handleRadioChange}sectionName={"Question 3"} />}

{sectionNumber ===6 && <RetryQuestionFormat 
essay={essay['Question 3']} 
saveAnswerAndProgress={textCorrectlyCopied} 
sectionName={"Retry Question 3"}/>}


{sectionNumber ===7 && <OpenEndedFormat question={essay['exploratory-questions']['openEndedExplanation']} saveAnswerAndProgress={openEndedQuestionAnswered} sectionName={"Open Ended Explaination"}/>}
{sectionNumber ===8 && <MultipleChoiceFormat question={essay['exploratory-questions']['emotionalRegulation-radio']} saveAnswerAndProgress={openEndedQuestionAnswered} sectionName={"Emotional Regulation"}/>}
{sectionNumber ===9 && <OpenEndedFormat question={essay['exploratory-questions']['emotionalRegulation-openEnded']} saveAnswerAndProgress={openEndedQuestionAnswered} sectionName={"Academic"}/>}
{sectionNumber ===10 && <MultipleChoiceFormat question={essay['exploratory-questions']['academic-radio']} saveAnswerAndProgress={openEndedQuestionAnswered} sectionName={"Academic"}/>}
{sectionNumber ===11 && <OpenEndedFormat question={essay['exploratory-questions']['academic-openEnded']} saveAnswerAndProgress={openEndedQuestionAnswered} sectionName={"Academic Response - Peer Presure"}/>}
{sectionNumber ===12 && <MultipleChoiceFormat question={essay['exploratory-questions']['activities-radio']} saveAnswerAndProgress={openEndedQuestionAnswered} sectionName={"Activites"}/>}
{sectionNumber ===13 && <OpenEndedFormat question={essay['exploratory-questions']['emotionalCoping']} saveAnswerAndProgress={openEndedQuestionAnswered} sectionName={"Emotional Coping Free Response"}/>}


{sectionNumber ===14 &&  <div> <h1>Congratuations! You have Completed the Assignment </h1><br/>
<h3>Hit Submit to Record Your Response for {email} </h3>
<button  onClick={()=> handleSubmit()} type="button">Submit</button>
</div>}

       </form>
      </div>
    </div>
  </div>
);}
  }

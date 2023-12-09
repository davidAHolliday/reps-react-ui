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
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [email, setEmail] = useState('');
  const [studentAnswers, setStudentAnswers] = useState([])
  const [mapIndex, setMapIndex] = useState(0)

  const { param1, param2 } = useParams();

  const essay =  Object.values(essayData).filter(
    essay =>
      essay.infractionName === param1 &&  
       essay.level === parseInt(param2) 
  )[0]; // Assuming there is only one matching essay, change this logic if needed


  // I need to mapOut the section each json record


  const listOfPossibleSections = [
    "Question 1", "Retry Question 1", 
    "Question 2", "Retry Question 2", 
    "Question 3", "Retry Question 3", 
    "openEndedExplanation",
    "emotionalRegulation-openEnded",
    "academic-openEnded",
    "emotionalCoping",
    "emotionalRegulation-radio",
    "academic-radio",
    "activities-radio",
    "Submit"
  ]
  
  const filterSections = (sections, jsonData) => {
    return sections.filter(section => {
      if (jsonData[section]) {
        return true;
      }
  
      // Check for subsections (assuming they follow a pattern like "Retry", "openEnded", "radio", etc.)
      const subsections = Object.keys(jsonData).filter(key => key.includes(section));
      return subsections.length > 0;
    });
  };
  

  const sectionMap = filterSections(listOfPossibleSections, essayData['disruptivebehavior-3']);

  console.log(sectionMap)


  const loggedInUser = sessionStorage.getItem("email")
   

const saveAnswerAndProgress = () =>{
  if(loggedInUser){
    if(selectedAnswer === "correct"){
      window.alert("Congratulations! That is correct!")
      setMapIndex((prev) => prev + 2);
  
    }else{
      window.alert("Sorry, that is incorrect")
      setMapIndex((prev) => prev + 1);
    }
  

  }else{
    window.alert("Email Not Registered in Reps DMS System")
  }

}



const textCorrectlyCopied = (selectedAnswer) =>{
  if(selectedAnswer === "correct"){
    window.alert("Congratulations! That is correct!")
    setMapIndex((prev) => prev + 1);
}

}




const openEndedQuestionAnswered = (selectedAnswer) =>{
 console.log(selectedAnswer)
    setMapIndex((prev) => prev + 1);
    setStudentAnswers((prev) => [...prev, selectedAnswer]);
 
}

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


// stadnard 4 questions

// const sectionMap = [
//   "Question 1", "Retry Question 1", 
//   "Question 2", "Retry Question 2", 
//   "Question 3", "Retry Question 3",
//   "Question 4", "Retry Question 4",
//   "Submit"

// ]

//Sample for dress code only 2 questions


//Sample for level 3



  const conditionalRender = () => {
    const currentSection = sectionMap[mapIndex]
    console.log(currentSection, mapIndex)

//If Retry Question Present Render
    if (currentSection.includes("Retry Question")){
      console.log("retry quewstion")
      return(
        <RetryQuestionFormat
        essay={essay[currentSection.replace("Retry ", "")]}
        saveAnswerAndProgress={textCorrectlyCopied}
        sectionName={sectionMap[mapIndex]}
        />

      );

    }
    //If Question Present Render

    else if(currentSection.includes("Question")) {
      return(
      <EssayFactory
      essay={essay[sectionMap[mapIndex]]}
      saveAnswerAndProgress={saveAnswerAndProgress}
      handleRadioChange={handleRadioChange}
      sectionName={sectionMap[mapIndex]}
    />
      )
    }
    else if (currentSection.includes("Submit")){
      return(
        <div> 
          <h1>Congratuations! You have Completed the Assignment </h1><br/>
        <h3>Hit Submit to Record Your Response for {email} </h3>
        <button  onClick={()=> handleSubmit()} type="button">Submit</button>
        </div>
      )
    }
    //check for exploratory questions
    else if(currentSection.includes("openEndedExplanation")){
      return(
      <OpenEndedFormat question={essay['exploratory-questions']['openEndedExplanation']} saveAnswerAndProgress={openEndedQuestionAnswered} sectionName={"Open Ended Explaination"}/>
      )
    }
    else if (currentSection.includes('emotionalRegulation-openEnded')){
      return (
 <OpenEndedFormat question={essay['exploratory-questions']['emotionalRegulation-openEnded']} saveAnswerAndProgress={openEndedQuestionAnswered} sectionName={"Academic"}/>
      )
    }
    else if (currentSection.includes("academic-openEnded")){
      return(
    <OpenEndedFormat question={essay['exploratory-questions']['academic-openEnded']} saveAnswerAndProgress={openEndedQuestionAnswered} sectionName={"Academic Response - Peer Presure"}/>
      )

    }
    else if(currentSection.includes("emotionalCoping")){
      return(
 <OpenEndedFormat question={essay['exploratory-questions']['emotionalCoping']} saveAnswerAndProgress={openEndedQuestionAnswered} sectionName={"Emotional Coping Free Response"}/>
      )
    }
    else if(currentSection.includes("emotionalRegulation-radio")){
      return(
     <MultipleChoiceFormat question={essay['exploratory-questions']['emotionalRegulation-radio']} saveAnswerAndProgress={openEndedQuestionAnswered} sectionName={"Emotional Regulation"}/>
      )
    }
    else if(currentSection.includes("academic-radio")){
      return (
     <MultipleChoiceFormat question={essay['exploratory-questions']['academic-radio']} saveAnswerAndProgress={openEndedQuestionAnswered} sectionName={"Academic"}/>
      )
    }
    else if( currentSection.includes("activities-radio")){
      return(

      <MultipleChoiceFormat question={essay['exploratory-questions']['activities-radio']} saveAnswerAndProgress={openEndedQuestionAnswered} sectionName={"Activites"}/>
      )
    }else{

    }
  }
 

  
  return( 
    <div className="page-container">

    <div className="lrKTG">
    <a href="/dashboard/student">
  <button>Go Home</button>
</a>
      <div className="form-container" style={{width:"100%"}}>
        <form onSubmit={handleSubmit}>
        <h1 className="instructions">{essay.infractionName} Violation Level:{essay.level}</h1>
          <hr></hr>
 <div>
 {conditionalRender()}
 </div>


{/* {sectionNumber ===2 && <RetryQuestionFormat essay={essay['Question 1']} 
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
sectionName={"Retry Question 3"}/>} */}

{/* 
{sectionNumber ===7 && <OpenEndedFormat question={essay['exploratory-questions']['openEndedExplanation']} saveAnswerAndProgress={openEndedQuestionAnswered} sectionName={"Open Ended Explaination"}/>}
{sectionNumber ===8 && <MultipleChoiceFormat question={essay['exploratory-questions']['emotionalRegulation-radio']} saveAnswerAndProgress={openEndedQuestionAnswered} sectionName={"Emotional Regulation"}/>}
{sectionNumber ===9 && <OpenEndedFormat question={essay['exploratory-questions']['emotionalRegulation-openEnded']} saveAnswerAndProgress={openEndedQuestionAnswered} sectionName={"Academic"}/>}
{sectionNumber ===10 && <MultipleChoiceFormat question={essay['exploratory-questions']['academic-radio']} saveAnswerAndProgress={openEndedQuestionAnswered} sectionName={"Academic"}/>}
{sectionNumber ===11 && <OpenEndedFormat question={essay['exploratory-questions']['academic-openEnded']} saveAnswerAndProgress={openEndedQuestionAnswered} sectionName={"Academic Response - Peer Presure"}/>}
{sectionNumber ===12 && <MultipleChoiceFormat question={essay['exploratory-questions']['activities-radio']} saveAnswerAndProgress={openEndedQuestionAnswered} sectionName={"Activites"}/>}
{sectionNumber ===13 && <OpenEndedFormat question={essay['exploratory-questions']['emotionalCoping']} saveAnswerAndProgress={openEndedQuestionAnswered} sectionName={"Emotional Coping Free Response"}/>} */}


{/* {sectionNumber ===14 &&  <div> <h1>Congratuations! You have Completed the Assignment </h1><br/>
<h3>Hit Submit to Record Your Response for {email} </h3>
<button  onClick={()=> handleSubmit()} type="button">Submit</button>
</div>} */}

       </form>
      </div>
    </div>
  </div>
);
  }

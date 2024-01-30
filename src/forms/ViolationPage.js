import { useEffect, useState } from 'react';
import axios from 'axios';
import EssayFactory from './ViolationContents/EssayFormat';
import RetryQuestionFormat from './ViolationContents/RetryQuestionFormat';
import { baseUrl } from '../utils/jsonData';
import { useParams } from 'react-router-dom';
import OpenEndedFormat from './ViolationContents/OpenEndedFormat';
import MultipleChoiceFormat from './ViolationContents/MultipleChoiceFormat';




 export default function ViolationPage(props) {
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [studentAnswers, setStudentAnswers] = useState([])
  const [mapIndex, setMapIndex] = useState(0)
  const [infractionData,setInfractionData] = useState([])
  const [dataWithArray, setDataWithArray] = useState([])
  const [essay,setEssay] = useState()
  
  //Grabs Params to Decide what Json Object to use
  // const { param1, param2 } = useParams();

  // // Decode URL-encoded parameters
  // const decodedParam1 = decodeURIComponent(param1);
  // const decodedParam2 = decodeURIComponent(param2);



useState(()=>{
  const headers = {
    Authorization: "Bearer " + sessionStorage.getItem("Authorization"),
  };
  

const url =`${baseUrl}/assignments/v1/`
axios.get(url,{headers})
.then(response => {
console.log(response.data);
setDataWithArray(response.data)
const essay = response.data.filter(
  essay =>
    essay.infractionName === props.data.infraction.infractionName &&
    essay.level == parseInt(props.data.infraction.infractionLevel)
);
setEssay(essay[0])
})
.catch(error => {
console.error(error);
});

},[])
  




  useEffect(()=>{
    setInfractionData(essay)


  },[])



const loggedInUser = sessionStorage.getItem("email")

const saveAnswerAndProgress = () =>{
  if(loggedInUser){
    console.log("selectedAnswer in saveAnswerAndProgress:", selectedAnswer);


    if (selectedAnswer === "true") {
      window.alert("Congratulations! That is correct!")
        setMapIndex((prev) => prev + 2);
        setSelectedAnswer(null)

      }else{
        window.alert("Sorry, that is incorrect")
        setMapIndex((prev) => prev + 1);
      }
  
    
    }

  else{
    window.alert("Email Not Registered in Reps DMS System")
  }

}


const textCorrectlyCopied = (selectedAnswer) =>{
  if(selectedAnswer === "true"){
    window.alert("Congratulations! That is correct!")
    setMapIndex((prev) => prev + 1);
}

}


const openEndedQuestionAnswered = (selectedAnswer) =>{
  console.log(selectedAnswer)
  if(selectedAnswer.answer === "agree"){
    setMapIndex((prev) => prev + 1);
    setStudentAnswers((prev) => [...prev, selectedAnswer]);



  }else if(selectedAnswer.answer === "disagree" || selectedAnswer.answer === "neutral"){
    console.log(selectedAnswer)
    setMapIndex((prev) => prev + 2);
    setStudentAnswers((prev) => [...prev, selectedAnswer]);

  }else{
    console.log(selectedAnswer)
    setMapIndex((prev) => prev + 1);
    setStudentAnswers((prev) => [...prev, selectedAnswer]);

  }

 
}

const handleRadioChange = (e) =>{
  setSelectedAnswer(e.target.value);
  
}

const handleSubmit = () => {

  const formattedInfraction = (essay.infractionName==="Unauthorized Device Cell Phone") ? "Unauthorized Device/Cell Phone":essay.infractionName;

  var payload = {
      "studentEmail" :loggedInUser ,
      "infractionName": formattedInfraction,
      "studentAnswer": studentAnswers
      }
  

    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("Authorization"),
    };
    
    const url = `${baseUrl}/punish/v1/punishId/close`;
  

      axios.post(url,payload, { headers })
      .then(function (res){
        window.alert(`You Work Has been Recorded for ${payload.studentEmail}`)
        window.location.href = "/dashboard/student";



    })
      .catch(function (error){
        console.log(error)

  
  });
}

return( 
 essay &&  (<>

    <div className="">
    <div className="">
      <div className="form-container-violation" style={{width:"100%"}}>
        <form onSubmit={handleSubmit}>
        <h1 className="instructions">
                {essay && essay.infractionName} Violation Level:{' '}
                {essay && essay.level}
              </h1>          <hr></hr>


 <div>
 {essay && essay.questions && essay.questions.map((data, index) => {
  return(
    <>
    {(data.type==="reading" && mapIndex === index) &&<EssayFactory
          essay={data}
          saveAnswerAndProgress={saveAnswerAndProgress}
          handleRadioChange={handleRadioChange}
        />}
    
    {(data.type==="retryQuestion" && mapIndex === index) &&<RetryQuestionFormat
          essay={data}
          saveAnswerAndProgress={textCorrectlyCopied}
          handleRadioChange={handleRadioChange}
        />}
                
      {(data.type ==="exploratory-open-ended" && mapIndex === index) &&
        <OpenEndedFormat
        question={data}
        saveAnswerAndProgress={openEndedQuestionAnswered}
      />
}          

               {(data.type ==="exploratory-radio" && mapIndex === index) &&
               <>
         <MultipleChoiceFormat
         data={data}
         saveAnswerAndProgress={openEndedQuestionAnswered}
         sectionName={"tbd"}
       />
       </>
}    
     
    </>
  )

 })}


{essay && essay.questions && mapIndex === essay.questions.length  && (

<div>
<h1>Congratulations! You have Completed the Assignment </h1><br />
<h3>Hit Submit to Record Your Response for {loggedInUser} </h3>
<button onClick={() => handleSubmit()} type="button">Submit</button>
</div>

)}
 </div>


       </form>
      </div>
    </div>
  </div>
  </>))
  }

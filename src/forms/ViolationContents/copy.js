import { useState, react } from "react";



const Copy1 = (props) =>{
  const [copyText, setCopyText] = useState("")

  const compareText = "A study by Hirschfield and Gasper (2011) found a significant negative relationship between tardiness and academic performance. Persistent tardiness often translates into missed quizzes, tests, or class participation points, ultimately affecting students' final grades. Additionally, the stress and anxiety resulting from trying to catch up on missed content and assignments can further impede students' academic progress, creating a vicious cycle of poor performance."


  const checkWork = () =>{
    console.log(compareText.length)
    console.log(copyText.length)
    if(compareText.localeCompare(copyText)==0){
      window.alert("text matches")
      props.saveAnswerAndProgress("correct")
    }else{
      window.alert("doesnt not match try again")
    }

  }
    return(
        
        <div className='section'>                
         <hr></hr>
         <div className='question-container'>
           <h5>Copy the following passage down exactly, if it is not written down exactly you will need to retry this question: *</h5>
           <div>
           <img
        src="https://lh3.googleusercontent.com/03wsLfk6KbiDxMFk-iJ6c7nzbdO64C8za5Ti72LPyHIytEKTDT5rJJWmKygopxyl7T_q4kzjE4Sj2XbsQrQt6BOobRTtKj8P6WOafQH-Aj5gB4R-XuAGe9mynvsVuIqWSg=w740"
        alt="Academic Impact"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
        
           </div>
           <textarea
  style={{ height: 70 }}
  id="copyText"
  name="copyText"
  value={copyText}
  onChange={(e) => setCopyText(e.target.value)}
  required
></textarea>
         </div>
  <button type="button" onClick={()=>checkWork()}>Check Work</button>
         </div>
   
    )
}

 export default Copy1
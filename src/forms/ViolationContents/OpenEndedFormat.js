import {React, useState} from "react";


  function OpenEndedFormat({question, saveAnswerAndProgress, sectionName}) {
    console.log(question)
      
      const [value, setValue] = useState("")
    
    
    
      const submitAnswer = () =>{
        var payload = {question:sectionName, answer:value}
        saveAnswerAndProgress(payload)
    
       
      }
   
          return(
<div>
        <h4 style={{background:"green",color:"white"}}>{sectionName}</h4>
        
             <hr></hr>
             <div className='question-container'>
               <h5> {question}*</h5>
               <div>
          
               </div>
               <textarea
      style={{ height: 70 }}
      id="value"
      name="value"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      required
    ></textarea>
             </div>
      <button type="button" onClick={()=>submitAnswer()}>Check Work</button>
             </div>
  
        )
      } 
    
  
  
  export default OpenEndedFormat;
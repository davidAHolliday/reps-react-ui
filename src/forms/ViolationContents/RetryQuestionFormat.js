import {React, useState} from "react";


  function RetryQuestionFormat({essay, saveAnswerAndProgress, sectionName}) {
      const [copyText, setCopyText] = useState("")
    
    
    
      const checkWork = () =>{
        const compareText  = essay.retryQuestion["textToCompare"]
        console.log(compareText)
        if(compareText.localeCompare(copyText)==0){
          window.alert("Correct")
          saveAnswerAndProgress("correct")
        }else{
          window.alert("Try Again, Text Must Math Exactly")
        }
    
      }
        return(
            
<div>
        <h4 style={{background:"green",color:"white"}}>{sectionName}</h4>
        
             <hr></hr>
             <div className='question-container'>
               <h5>Copy the following passage down exactly, if it is not written down exactly you will need to retry this question: *</h5>
               <div>
          
            <div >
               <img
            src={essay.retryQuestion["imageUrl"]}
            alt="Academic Impact"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          </div>
            
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
  
  
  export default RetryQuestionFormat;
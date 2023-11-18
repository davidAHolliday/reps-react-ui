import {React, useState} from "react";


  function RetryQuestionFormat({essay, saveAnswerAndProgress, sectionName}) {
      const [copyText, setCopyText] = useState("")
    
    
    
      const checkWork = () =>{
        const compareText  = essay.retryQuestion["textToCompare"]
        console.log(compareText)
        if(compareText.localeCompare(copyText)===0){
          window.alert("Correct")
          saveAnswerAndProgress("correct")
        }else{
          window.alert("Try Again, Text Must Match Exactly")
        }
    
      }
   
        return (
          <div>
            <h4 className="section-header">{sectionName}</h4>
            <hr />
            <div className="question-container">
              <h5 className="question-text">Copy the following passage down exactly, if it is not written down exactly you will need to retry this question: *</h5>
              <div className="image-container">
                {essay.retryQuestion["imageUrl"] !== "" ? (
                  <img
                    src={essay.retryQuestion["imageUrl"]}
                    alt="Academic Impact"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                ) : (
                  <p>{essay.retryQuestion["imageTextAlt"]}</p>
                )}
              </div>
              <textarea
                id="copyText"
                name="copyText"
                value={copyText}
                onChange={(e) => setCopyText(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="button-container">
              <button type="button" onClick={() => checkWork()}>Check Work</button>
            </div>
          </div>
        );
      
    }
  
  
  export default RetryQuestionFormat;
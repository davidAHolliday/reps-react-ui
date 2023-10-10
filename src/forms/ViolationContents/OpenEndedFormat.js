import {React, useState} from "react";


  function OpenEndedFormat({essay, saveAnswerAndProgress, sectionName}) {
    const [answer, setAnswer] = useState();

        return(
            
<div>
        <h4 style={{background:"green",color:"white"}}>{sectionName}</h4>
        
             <hr></hr>
             <div className='question-container'>
               <h5>Copy the following passage down exactly, if it is not written down exactly you will need to retry this question: *</h5>
               <div>
          
            <div >
              {essay.retryQuestion["imageUrl"] !=="" ? <img
            src={essay.retryQuestion["imageUrl"]}
            alt="Academic Impact"
            style={{ maxWidth: '100%', height: 'auto' }}
          />: <p>{essay.retryQuestion["imageTextAlt"]}</p>}
          </div>
            
               </div>
               <textarea
      style={{ height: 70 }}
      id="copyText"
      name="copyText"
      value={answer}
      onChange={(e) => setAnswer(e.target.value)}
      required
    ></textarea>
             </div>
      <button type="button" onClick={(e)=>(e)}>Check Work</button>
             </div>
  
        )
    }
  
  
  export default OpenEndedFormat;
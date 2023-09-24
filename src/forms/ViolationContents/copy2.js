import { useState, react } from "react";



const Copy2 = (props) =>{
  const [copyText, setCopyText] = useState("")

  const compareText = "Tardiness disrupts the learning environment, affecting both the late student and their peers. When students arrive late to class, it interrupts the flow of instruction and disturbs the concentration of their fellow classmates. As stated by Rumberger and Losen (2017), latecomers not only miss crucial information and announcements but also create a distraction that hampers the overall learning experience. Consistently missing instructional time due to tardiness can impede students' comprehension of the curriculum, leading to gaps in knowledge and understanding."


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
        src="https://lh5.googleusercontent.com/qQXLs297z776WQ_K7IGHSBQ--EbLRU4T6sINDGRtoOPPfmpyNbSAWZj3OR0RKmL2la_4r8GaFSjr2kGnhtXA4sckOQQEiMaTwSDxmY9t27imqIqAhlaStm6aInP3y8N9fg=w740"
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

 export default Copy2
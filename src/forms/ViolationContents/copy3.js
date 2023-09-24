import { useState, react } from "react";



const Copy3 = (props) =>{
  const [copyText, setCopyText] = useState("")

  const compareText = "Punctuality plays a pivotal role in shaping an individual's professional reputation. According to a study by Davis and Stark (2018), professionals who consistently demonstrate punctuality are viewed as reliable, trustworthy, and competent by their peers, superiors, and clients. Being punctual showcases a commitment to honoring obligations and demonstrates respect for others' time, leading to increased opportunities for career advancement and building strong professional relationships."


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
        src="https://lh3.googleusercontent.com/6hYLUzCoKspxcjD7qzn2CUtogvso0aS6VX6ShJxA7kS77HfO3HS3oq-vGF_xgCjoMTavNxE73LXYLZD4004f7Jz-EM-Bt7aUbFG_-dO-khfuamd46G4cIZwb0F1U9XdZ9Q=w740"
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

 export default Copy3
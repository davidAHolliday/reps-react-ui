import React from "react";

  function MutipleChoiceFormat({question, saveAnswerAndProgress,sectionName}) {
    const essayStyles = {
        fontFamily: 'Arial, sans-serif',
        fontSize: '18px',
        lineHeight: '1.6', // Increase line height for more space between lines
        color: '#333',
        textAlign: 'left', // Align text to the left',
      /* Add more CSS styles as needed */
    };

    const handleRadioChange = (value) =>{
      var payload = {question:sectionName, answer:value}
      saveAnswerAndProgress(payload)
  
     
    }
  
    return (
      <>
        <div className="essay-container">
          <div className="section-header" style={{ background: "green", color: "white" }}>
            {sectionName}
            <h4 className="question-header" style={{ color: "green", background: "#FDFD96" }}>{question}</h4>
          </div>
          <h1 className="section-name">{sectionName}</h1>
          <p className="question-text">{question}</p>
        </div>
        <div className="md0UAd" aria-hidden="true" dir="auto">
          * Indicates required question
        </div>
    
        <div className="radio-container">
         <div className="radio">
          <input
            type="radio"
            id={1}
            name="radioAnswer"
            value="agree"
            onChange={() => handleRadioChange("agree")}
          />
          <label style={{marginLeft:"10px",color:"black"}}htmlFor={1}>Agree</label>
          </div>
          <div className="radio">
          <input
            type="radio"
            id={2}
            name="radioAnswer"
            value="disagree"
            onChange={() => handleRadioChange("disagree")}
          />
          <label style={{marginLeft:"10px",color:"black"}} htmlFor={2}>Disagree</label>
    </div>
    <div className="radio">
          <input
            type="radio"
            id={3}
            name="radioAnswer"
            value="neutral"
            onChange={() => handleRadioChange("neutral")}
          />
          <label style={{marginLeft:"10px",color:"black"}} htmlFor={3}>Neutral</label>
          </div>
        </div>
      </>
    );
    
  }
  
  
  export default MutipleChoiceFormat;
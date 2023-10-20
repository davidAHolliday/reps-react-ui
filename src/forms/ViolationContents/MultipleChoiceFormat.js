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
        <div style={essayStyles}>
          <div style={{ background: "green", color: "white" }}>{sectionName}
            <h4 style={{ color: "green", background: "#FDFD96" }}>{question}</h4>
          </div>
          <h1>{sectionName}</h1>
          <p>{question}</p>
        </div>
        <div className="md0UAd" aria-hidden="true" dir="auto">
          * Indicates required question
        </div>
    
        <div>
          <input
            type="radio"
            id={1}
            name="radioAnswer"
            value="agree"
            onChange={() => handleRadioChange("agree")} // Pass the value "agree"
          />
          Agree
    
          <input
            type="radio"
            id={2}
            name="radioAnswer"
            value="disagree"
            onChange={() => handleRadioChange("disagree")} // Pass the value "disagree"
          />
          Disagree
    
          <input
            type="radio"
            id={3}
            name="radioAnswer"
            value="neutral"
            onChange={() => handleRadioChange("neutral")} // Pass the value "neutral"
          />
          Neutral
        </div>
      </>
    );
  }
  
  
  export default MutipleChoiceFormat;
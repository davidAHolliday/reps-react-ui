import React from "react";

  function EssayFactory({essay, handleRadioChange,sectionName,saveAnswerAndProgress}) {
    const essayStyles = {
        fontFamily: 'Arial, sans-serif',
        fontSize: '18px',
        lineHeight: '1.6', // Increase line height for more space between lines
        color: '#333',
        textAlign: 'left', // Align text to the left',
      /* Add more CSS styles as needed */
    };
  
    return (
        <>
        <div style={essayStyles}>
        <div style={{background:"green",color:"white"}}>{sectionName}
        <h4 style={{color:"green",background:"#FDFD96"}}>{essay.question}</h4>
        </div>
        <h1 >{essay.title}</h1>
        <p>{essay.body}</p>
        <h2>References</h2>
    
      </div>
        <div className="md0UAd" aria-hidden="true" dir="auto">
                        * Indicates required question
                      </div>
                           
          <hr></hr>
          <div className='question-container'style={{textAlign:"left"}}>
          <h4 style={{color:"green",background:"#FDFD96"}}>{essay.question}</h4>
            <div>
          {Object.keys(essay.radioAnswers).map((key) => (
            <label key={key}>
              <input
                type="radio"
                id={key}
                name="radioAnswer"
                value={essay.radioAnswers[key].value}
                onChange={handleRadioChange}
              />
              {essay.radioAnswers[key].label}
            </label>
          ))}
        </div>
      </div>
      <button type='button' onClick={() => saveAnswerAndProgress()}>Next</button>

          </>
    

    );
  }
  
  
  export default EssayFactory;
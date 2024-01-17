import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';

const MultiPageForm = () => {
  const [numOfQuestions, setNumberOfQuestions] = useState(1);
  const [payload, setPayload] = useState({
    infractionName: '',
    level: 1,
    questions: [
      {
        question: "",
        type: "",
        title: "",
        body: "",
        references: [],
        radioAnswers: {},
        textToCompare: ""
      }
    ]
  });

  const handleChange = (key, value) => {
    setPayload((prevPayload) => ({
      ...prevPayload,
      [key]: value,
    }));
  };

  const handleMappedChange = (key, value, questionIndex) => {
    setPayload((prevPayload) => {
      const newQuestions = [...prevPayload.questions];
      newQuestions[questionIndex] = { ...newQuestions[questionIndex], [key]: value };
      return { ...prevPayload, questions: newQuestions };
    });
  };


  const handleRefChange = (key, value, questionIndex, referenceIndex) => {
    setPayload((prevPayload) => {
      const newQuestions = [...prevPayload.questions];
  
      // Check if the key is 'references'
      if (key === 'references') {
        newQuestions[questionIndex].references[referenceIndex] = value;
      } else {
        // Handle other keys normally
        newQuestions[questionIndex] = { ...newQuestions[questionIndex], [key]: value };
      }
  
      return { ...prevPayload, questions: newQuestions };
    });
  };

  const addReference = (questionIndex) => {
    setPayload((prevPayload) => {
      const newQuestions = [...prevPayload.questions];
      const currentReferences = newQuestions[questionIndex]?.references || [];
  
      // Push a new reference to the currentReferences array
      currentReferences.push('');
  
      // Update the state with the new references array
      newQuestions[questionIndex].references = currentReferences;
  
      return { ...prevPayload, questions: newQuestions };
    });
  };
  const buildPayload = () => {
    // Concatenate references into a list of strings

    // Final payload to use as needed
    const finalPayload = {
      infractionName: payload.infractionName,
      level: payload.level,
      questions: payload.questions,
    };

    console.log(finalPayload);
    // You can use the finalPayload as needed (e.g., send it to an API)
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} style={{ padding: 20, margin: '20px 0' }}>
        <Typography variant="h5">Payload Builder</Typography>
        <form>
          <TextField
            label="Infraction Name"
            fullWidth
            required
            value={payload.infractionName}
            onChange={(e) => handleChange('infractionName', e.target.value)}
          />
          <TextField
            label="Level"
            type="number"
            fullWidth
            required
            value={payload.level}
            onChange={(e) => handleChange('level', parseInt(e.target.value))}
          />

          {/* Dynamic Questions */}
          {[...Array(numOfQuestions)].map((_, questionIndex) => (
            <div key={questionIndex}>
              <TextField
                label={`Question Text ${questionIndex + 1}`}
                multiline
                rows={4}
                fullWidth
                required
                value={payload.questions[questionIndex]?.question || ''}
                onChange={(e) => handleMappedChange('question', e.target.value, questionIndex)}
              />
              <TextField
                label={`Question Type ${questionIndex + 1}`}
                multiline
                rows={4}
                fullWidth
                required
                value={payload.questions[questionIndex]?.type || ''}
                onChange={(e) => handleMappedChange('type', e.target.value, questionIndex)}
              />
              {payload.questions[questionIndex]?.type === "reading" && (
                <>
                  <TextField
                    label={`Text Title ${questionIndex + 1}`}
                    multiline
                    rows={4}
                    fullWidth
                    required
                    value={payload.questions[questionIndex]?.title || ''}
                    onChange={(e) => handleMappedChange('title', e.target.value, questionIndex)}
                  />
                  <TextField
                    label={`Text Body ${questionIndex + 1}`}
                    multiline
                    rows={4}
                    fullWidth
                    required
                    value={payload.questions[questionIndex]?.body || ''}
                    onChange={(e) => handleMappedChange('body', e.target.value, questionIndex)}
                  />
                  {/* Add Reference button */}
                  <Button
                    variant="outlined"
                    onClick={() => addReference(questionIndex)}
                    style={{ margin: '10px 0' }}
                  >
                    Add Reference
                  </Button>

                  {console.log("LOG",payload.questions[questionIndex]?.references)}
                  {payload.questions[questionIndex]?.references.map((reference, referenceIndex) => (
                    <TextField
                      key={referenceIndex}
                      label={`Reference ${referenceIndex + 1}`}
                      multiline
                      rows={4}
                      fullWidth
                      required
                      value={reference}
                      onChange={(e) => handleRefChange('references', e.target.value, questionIndex, referenceIndex)}
                    />
                  ))}
                </>
              )}
            </div>
          ))}
          
          <Button variant="contained" color="primary" onClick={buildPayload}>
            Build Payload
          </Button>
        </form>
        <Button variant="outlined" onClick={() => setNumberOfQuestions((prev) => prev + 1)}>
          Add Question
        </Button>
      </Paper>
    </Container>
  );
};

export default MultiPageForm;

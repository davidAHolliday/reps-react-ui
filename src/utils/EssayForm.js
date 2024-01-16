import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, Grid } from '@mui/material';

const MultiPageForm = () => {
    const [payload, setPayload] = useState({
        infractionName: 'sample',
        level: 1,
        questions: [
            {
                question: 'sample question 1',
                title: "What does the fox say?",
                body: "Yeh eheh eye yep eyepe",
                references: {
                    "reference1": "Clark, S., & Baker, M. (2019). Mentoring and punctuality: The influence of mentors on high school students' arrival times. Journal of Youth Studies, 22(4), 524-539.",
                },
                radioAnswers: {
                    1: { "value": "incorrect", "label": "Roberts and Lee" },
                },
                retryQuestion: {
                    "textToCompare": "Distractions often contribute to students' tardiness. Recent research by Thompson and Harris (2021) highlights the importance of minimizing distractions, particularly those related to electronic devices and social media. High school students should practice self-discipline by limiting the time spent on social media platforms, video games, or other non-academic activities. Creating designated study areas free from distractions can also help students stay focused, complete tasks efficiently, and arrive at school on time."
                }
            },
            {
                question: 'sample question 2',
                title: "What does the fox say?",
                body: "Yeh eheh eye yep eyepe",
                references: {
                    "reference1": "Clark, S., & Baker, M. (2019). Mentoring and punctuality: The influence of mentors on high school students' arrival times. Journal of Youth Studies, 22(4), 524-539.",
                },
                radioAnswers: {
                    1: { "value": "incorrect", "label": "Roberts and Lee" },
                },
                retryQuestion: {
                    "textToCompare": "Distractions often contribute to students' tardiness. Recent research by Thompson and Harris (2021) highlights the importance of minimizing distractions, particularly those related to electronic devices and social media. High school students should practice self-discipline by limiting the time spent on social media platforms, video games, or other non-academic activities. Creating designated study areas free from distractions can also help students stay focused, complete tasks efficiently, and arrive at school on time."
                }
            }
        ]
    });


    const handleChange = (key, value) => {
        setPayload(prevPayload => ({
            ...prevPayload,
            [key]: value,
        }));
    };

    const buildPayload = () => {

        console.log(payload);
        // You can use the payload as needed (e.g., send it to an API)
    };

    return (
        <Container component="main" maxWidth="md">
            <Paper elevation={3} style={{ padding: 20, margin: '20px 0' }}>
                <Typography variant="h5">Payload Builder</Typography>
                <form>
                    {/* <TextField
                        label="Infraction Name"
                        fullWidth
                        required
                        value={payload.infractionName}
                        onChange={(e) => handleChange("infractionName", e.target.value)}
                    /> */}
                    {/* <TextField
                        label="Level"
                        type="number"
                        fullWidth
                        required
                        value={payload.level}
                        onChange={(e) => handleChange("level", parseInt(e.target.value))}
                    /> */}

                    {/* Question 1 */}
                    {/* <TextField
                        label="Question 1"
                        multiline
                        rows={4}
                        fullWidth
                        required
                        value={payload["Question 1"].question}
                        onChange={(e) => handleChange("Question 1", { question: e.target.value })}
                    /> */}
                    {/* Add other fields for Question 1 */}

                    {/* Question 2 */}
                    {/* <TextField
                        label="Question 2"
                        multiline
                        rows={4}
                        fullWidth
                        required
                        value={payload["Question 2"].question}
                        onChange={(e) => handleChange("Question 2", { question: e.target.value })}
                    /> */}
                    {/* Add other fields for Question 2 */}

                    {/* Question 3 */}
                    {/* <TextField
                        label="Question 3"
                        multiline
                        rows={4}
                        fullWidth
                        required
                        value={payload["Question 3"].question}
                        onChange={(e) => handleChange("Question 3", { question: e.target.value })}
                    /> */}
                    {/* Add other fields for Question 3 */}

                    {/* Question 4 */}
                    {/* <TextField
                        label="Question 4"
                        multiline
                        rows={4}
                        fullWidth
                        required
                        value={payload["Question 4"].question}
                        onChange={(e) => handleChange("Question 4", { question: e.target.value })}
                    /> */}
                    {/* Add other fields for Question 4 */}

                    <Button variant="contained" color="primary" onClick={buildPayload}>
                        Build Payload
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default MultiPageForm;
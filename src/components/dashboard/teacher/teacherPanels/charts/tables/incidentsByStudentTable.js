import React from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Typography } from '@mui/material';


const IncidentsByStudentTable = ({writeUps = []}) => {
  

  const uniqueStudents = {};
  const totalIncidents = writeUps.length;

//Get Unique Students Info
  writeUps.forEach(item => {
    const studentEmail = item.studentEmail;
    uniqueStudents[studentEmail] = (uniqueStudents[studentEmail] || 0) + 1;
  });

  
  const studentsWithIncidentsList = Object.entries(uniqueStudents).map(([studentEmail, incidents]) => {
    const {studentFirstName, studentLastName} = writeUps.find(item => item.studentEmail === studentEmail);

    return {
      studentEmail,
      studentFirstName,
      studentLastName,
      incidents,
      percent: ((incidents / totalIncidents) * 100).toFixed(2),
    };
  });
  
 studentsWithIncidentsList.sort((a, b) => b.incidents - a.incidents);

  return (
    <TableContainer component={Paper}>
       <Typography variant="h6" align="center" style={{ margin: '10px' }}>
        Write-up % By Student
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Write-ups</TableCell>
            <TableCell>Percent of Write-ups</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentsWithIncidentsList.map(({ studentEmail, studentFirstName, studentLastName, incidents, percent }, index) => (
            <TableRow key={index}>
              <TableCell>{studentFirstName} {studentLastName}</TableCell>
              <TableCell>{incidents}</TableCell>
              <TableCell>{percent}%</TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default IncidentsByStudentTable;

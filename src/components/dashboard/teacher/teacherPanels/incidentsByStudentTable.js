import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from "axios";
import { baseUrl } from '../../../../utils/jsonData';

// ... (other import statements)

const IncidentsByStudentTable = () => {
  const [studentsWithIncidents, setStudentsWithIncidents] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("Authorization"),
    };
    const url = `${baseUrl}/punish/v1/punishments`;
    axios.get(url, { headers })
    .then(response => {
      const filteredData = response.data.filter(item => item.teacherEmail === sessionStorage.getItem("email"));
      const uniqueStudents = {};
      const totalIncidents = filteredData.length;

      filteredData.forEach(item => {
        const studentId = item.student.studentIdNumber;
        uniqueStudents[studentId] = (uniqueStudents[studentId] || 0) + 1;
      });
        const studentsWithIncidentsList = Object.entries(uniqueStudents).map(([studentId, incidents]) => {
          const { firstName, lastName } = filteredData.find(item => item.student.studentIdNumber === studentId).student;
          return {
            studentId,
            firstName,
            lastName,
            incidents,
            percent: ((incidents / totalIncidents) * 100).toFixed(2),
          };
        });

        const sortedStudents = studentsWithIncidentsList.sort((a, b) => b.incidents - a.incidents);
        setStudentsWithIncidents(sortedStudents);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Incidents</TableCell>
            <TableCell>Percent of Incidents</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentsWithIncidents.map(({ studentId, firstName, lastName, incidents, percent }, index) => (
            <TableRow key={index}>
              <TableCell>{firstName} {lastName} {String(studentId).substring(0,5)}</TableCell>
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

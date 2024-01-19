import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { baseUrl } from "../../../../utils/jsonData";
import axios from "axios";

export const WorseClassTable = ({data = []}) =>{
  const [teacherData,setTeacherData] = useState([])
 


  const headers = {
    Authorization: "Bearer " + sessionStorage.getItem("Authorization"),
  };
  
  const url = `${baseUrl}/employees/v1/employees/TEACHER`;
  

  useEffect(() => {
    axios
      .get(url, { headers }) // Pass the headers option with the JWT token
      .then(function (response) {
        setTeacherData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);


  //This compoenet needs to sepearte the punsihemnt by block
  //then find the tacher with the most write up (negative)
  //and find count the write up



  const listOfBlocksWithWorseTeacherData = []
  const listOfBlocksWithWorstTeacherData = [];

  // Create an object to store the maximum write-up count for each block
  const maxWriteUpsByBlock = { block1: 0, block2: 0, block3: 0, block4: 0 };
  
  teacherData.forEach((teacher) => {
    const negWriteUpData = data.filter(item => item.infraction.infractionName !== "Positive Behavior Shout Out!" && item.teacherEmail === teacher.email);
  
    const block1 = negWriteUpData.filter(item => item.classPeriod === "block1").length;
    const block2 = negWriteUpData.filter(item => item.classPeriod === "block2").length;
    const block3 = negWriteUpData.filter(item => item.classPeriod === "block3").length;
    const block4 = negWriteUpData.filter(item => item.classPeriod === "block4").length;
  
    // Update the maximum write-up count for each block
    maxWriteUpsByBlock.block1 = Math.max(maxWriteUpsByBlock.block1, block1);
    maxWriteUpsByBlock.block2 = Math.max(maxWriteUpsByBlock.block2, block2);
    maxWriteUpsByBlock.block3 = Math.max(maxWriteUpsByBlock.block3, block3);
    maxWriteUpsByBlock.block4 = Math.max(maxWriteUpsByBlock.block4, block4);
  
    // Add teacher data to the list if they have the maximum write-up count in any block
    if (block1 === maxWriteUpsByBlock.block1 ||
        block2 === maxWriteUpsByBlock.block2 ||
        block3 === maxWriteUpsByBlock.block3 ||
        block4 === maxWriteUpsByBlock.block4) {
      listOfBlocksWithWorstTeacherData.push({
        teacherName: teacher.email.split("@")[0],
        blocks: { block1, block2, block3, block4 },
      });
    }
  });
  
  console.log(listOfBlocksWithWorstTeacherData);


  teacherData.map((teacher) => {
    
    const negWriteUpData = data.filter(item => item.infraction.infractionName !== "Positive Behavior Shout Out!" && item.teacherEmail === teacher.email);
    const block1 = negWriteUpData.filter(item => item.classPeriod === "block1").length;
    const block2 = negWriteUpData.filter(item => item.classPeriod === "block2").length;
    const block3 = negWriteUpData.filter(item => item.classPeriod === "block3").length;
    const block4 = negWriteUpData.filter(item => item.classPeriod === "block4").length;
  
     // Find the block with the maximum negative incidents
  const maxBlock = Math.max(block1, block2, block3, block4);

 const worseClassByIncident = 
 listOfBlocksWithWorseTeacherData.push({
  teacherName: teacher.email.split("@")[0],
  blocks: { block1, block2, block3, block4 },
  maxBlock: maxBlock, // Add the block with the maximum negative incidents
});
});

        
      




   return (
      <>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {/* Header Row */}
              <TableRow style={{ backgroundColor: '#2196F3', color: 'white' }}>
                <TableCell>School Average %</TableCell>
                {/* <TableCell>{`Pos:${schoolAvg.pos}% Neg: ${schoolAvg.neg}%`}</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Sub-Header Row */}
              <TableRow style={{ backgroundColor: '#64B5F6', color: 'white' }}>
                <TableCell>Most Positive Teacher Ratios</TableCell>
                <TableCell>Pos Ratios</TableCell>
              </TableRow>
    
              {/* {teachersWithIncidentsList
                .sort((a, b) => b.posRatio - a.posRatio)
                .slice(0, 5)
                .map((teacher) => (
                  <TableRow key={teacher.teacherName}>
                    <TableCell>{teacher.teacherName}</TableCell>
                    <TableCell>{teacher.posRatio}</TableCell>
                  </TableRow>
                ))} */}
    
              <TableRow style={{ backgroundColor: '#64B5F6', color: 'white' }}>
                <TableCell>Most Negative Teacher Ratios</TableCell>
                <TableCell>Neg Ratios</TableCell>
              </TableRow>
    
              {/* {teachersWithIncidentsList
                .sort((a, b) => b.negRatio - a.negRatio)
                .slice(0, 5)
                .map((teacher) => (
                  <TableRow key={teacher.teacherName}>
                    <TableCell>{teacher.teacherName}</TableCell>
                    <TableCell>{teacher.negRatio}</TableCell>
                  </TableRow>
                ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
    
   



    
}
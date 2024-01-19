import { Typography } from "@mui/material"
import React from "react"

export const BlankPlaceHolderWidget = ({data = []}) =>{
  const uniqueStudents = {};
  const totalIncidents = data.length;

//Get Unique Students Info
  data.forEach(item => {
    const studentId = item.student.studentIdNumber;
    uniqueStudents[studentId] = (uniqueStudents[studentId] || 0) + 1;
  });

  
  const studentsWithIncidentsList = Object.entries(uniqueStudents).map(([studentId, incidents]) => {
    const { firstName, lastName } = data.find(item => item.student.studentIdNumber === studentId).student;
    return {
      studentId,
      firstName,
      lastName,
      incidents,
      percent: ((incidents / totalIncidents) * 100).toFixed(2),
    };
  });
  
 studentsWithIncidentsList.sort((a, b) => b.incidents - a.incidents);




// 
    return(
        <>
         <Typography>Coming Soon</Typography>
         <div style={{height:"300px", width:"500px"}}></div>
    {/* <PieChart
      series={[
      
        
        { 
          data: 
          studentsWithIncidentsList.map((student,index)=>({
              id:index, value:student.percent,label:`${student.firstName} ${student.lastName} (${student.studentId.substring(0,5)})`
            })),
        
        
          arcLabel: (item) =>  `(${item.value})`,
          arcLabelMinAngle: 45,
          
        },
      ]}
      width={600}
      height={300}
      
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
        },
      }}
   
    
    /> */}
        </>
    )
   



    
}
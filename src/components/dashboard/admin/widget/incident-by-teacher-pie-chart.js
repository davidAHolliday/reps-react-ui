import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import axios from "axios";
import { baseUrl } from "../../../../utils/jsonData";

export const IncidentByTeacherPieChart = ({ data = [] }) => {
  const [teacherData,setTeacherData] = useState([])





  // Get Unique Teachers Info

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




//grab total indcidents
const totalIncidents = data.length;


//Grab teachers and extract emails


const teachersWithIncidentsList = []

teacherData.map((teacher) => {
  const filteredData = data.filter(item => item.teacherEmail === teacher.email);
  if(filteredData.length > 0){
     
teachersWithIncidentsList.push({
  teacherEmail: teacher.email,
  incidents: filteredData.length, // Use the length of filteredData as incidents
  percent: ((filteredData.length / totalIncidents) * 100).toFixed(2),
})
     
}
});


// Filter out undefined items before mapping


  return (
    <>
      <Typography>Incident By Staff Involved</Typography>
      <PieChart
        series={[
          {
            data: teachersWithIncidentsList.map((teacher, index) => ({
              id: index,
              value: parseFloat(teacher.percent),
              label: `${teacher.teacherEmail.split("@")[0]} (${teacher.incidents})`,
            })),
            arcLabel: (item) => `(${item.value}%)`,
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
      />
    </>
  );
};

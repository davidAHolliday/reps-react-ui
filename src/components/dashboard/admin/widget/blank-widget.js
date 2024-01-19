import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { baseUrl } from "../../../../utils/jsonData";
import axios from "axios";

export const BlankPlaceHolderWidget = ({data = []}) =>{
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



  const teachersWithIncidentsList = []



  teacherData.map((teacher) => {
    if (data) {
        const teacherIncidents = data.filter(item => item.teacherEmail === teacher.email);
        
        if (teacherIncidents.length > 0) {
            console.log(teacherIncidents, "teacher ind");

            // Iterate through each incident in teacherIncidents array
            teacherIncidents.forEach(incident => {
                if (incident.incidents) {
                    const posIncidents = incident.incidents.filter(inc => inc.infraction.infractionName === "Positive Behavior Shout Out");
                    const negIncidents = incident.incidents.filter(inc => inc.infraction.infractionName !== "Positive Behavior Shout Out");

                    teachersWithIncidentsList.push({
                      name: teacher[1].firstName ? `${teacher[1].firstName} ${teacher[1].lastName}` : "",
                      posRatio: ((posIncidents.length / teacherIncidents.incidents.length) * 100).toFixed(2),
                      negRatio: ((negIncidents.length / teacherIncidents.incidents.length) * 100).toFixed(2),
                    })
                    // Now you can use posIncidents and negIncidents as needed
                } else {
                    console.error(`Incidents data missing for teacher with email ${teacher.email}`);
                }
            });
        }
    }
});

       

       

console.log(teachersWithIncidentsList)





// 
    return(
        <>
       
       
    
         <TableContainer component={Paper}>
       {/* <Typography variant="h6" align="center" style={{ margin: '10px' }}>
        Write-up % By Student
      </Typography> */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>School Average %</TableCell>
            <TableCell>{"schoolAvg"}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
       <TableRow>
<TableCell> Most Positive Teacher Ratios</TableCell>  
<TableCell> Ratios</TableCell>   
</TableRow>

{teachersWithIncidentsList.map(teacher=>{
  return(
    <>
    {console.log("teacher ojb",teacher)}
    <TableRow>
  <TableCell> {teacher.name}</TableCell>
  <TableCell> {teacher.posRatio}</TableCell>
</TableRow>
    </>
  )
})}  

<TableRow>
  <TableCell> Teacher 2</TableCell>
  <TableCell> Ration 2</TableCell>
</TableRow><TableRow>
  <TableCell> Teacher 3</TableCell>
  <TableCell> Ration 3</TableCell>
</TableRow><TableRow>
  <TableCell> Teacher 4</TableCell>
  <TableCell> Ration 4</TableCell>
</TableRow>
<TableRow>
<TableCell> Most Negative Teacher Ratios</TableCell>     
<TableCell> Ratios</TableCell>   
</TableRow>
<TableRow>
  <TableCell> Teacher 1</TableCell>
  <TableCell> Ration 1</TableCell>
</TableRow>
<TableRow>
  <TableCell> Teacher 2</TableCell>
  <TableCell> Ration 2</TableCell>
</TableRow><TableRow>
  <TableCell> Teacher 3</TableCell>
  <TableCell> Ration 3</TableCell>
</TableRow><TableRow>
  <TableCell> Teacher 4</TableCell>
  <TableCell> Ration 4</TableCell>
</TableRow>


    
        </TableBody>
      </Table>
    </TableContainer>
        </>
    )
   



    
}
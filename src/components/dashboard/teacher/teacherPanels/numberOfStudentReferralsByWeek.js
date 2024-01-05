import { LineChart } from '@mui/x-charts/LineChart';
import { Typography } from '@mui/material';
import { extractDataByWeek, getCurrentWeekOfYear, getUniqueStudentIdFromList } from '../../global/helperFunctions';

export default function TotalStudentReferredByWeek({data = []}) {
  
const currentWeek = getCurrentWeekOfYear();

const yearAdj = (cw) =>{
  if(cw>0)
  return(cw)
if(cw <=0){
  return 52 + cw;
}
}

const displayDate = [
  {"Today":getUniqueStudentIdFromList(extractDataByWeek(yearAdj(currentWeek),data)).length},
  {"LW1" : getUniqueStudentIdFromList(extractDataByWeek(yearAdj(currentWeek-1),data)).length},
  {"LW2" : getUniqueStudentIdFromList(extractDataByWeek(yearAdj(currentWeek-2),data)).length},
  {"LW3" : getUniqueStudentIdFromList(extractDataByWeek(yearAdj(currentWeek-3),data)).length},
  {"LW4" : getUniqueStudentIdFromList(extractDataByWeek(yearAdj(currentWeek-4),data)).length},
  {"LW5" : getUniqueStudentIdFromList(extractDataByWeek(yearAdj(currentWeek-5),data)).length},
  {"LW6" : getUniqueStudentIdFromList(extractDataByWeek(yearAdj(currentWeek-6),data)).length},
  {"LW7" : getUniqueStudentIdFromList(extractDataByWeek(yearAdj(currentWeek-7),data)).length},
  {"LW8" : getUniqueStudentIdFromList(extractDataByWeek(yearAdj(currentWeek-8),data)).length},
  {"LW9" : getUniqueStudentIdFromList(extractDataByWeek(yearAdj(currentWeek-9),data)).length},

]

//This reverses the x axis
displayDate.reverse()




  // Convert the weekMap to the format suitable for LineChart
  const xAxisData = displayDate.map(obj => Object.keys(obj)[0]); // Extract the keys (labels)
  const seriesData = displayDate.map(obj => Object.values(obj)[0] || 0); // Extract the values associated with the keys
  


  return (
     data && (<>
      <Typography variant="h6" gutterBottom>
       Number of Students Receiving Refferals By Week
      </Typography>
      <LineChart
        xAxis={[{ 
          scaleType:'band', data: xAxisData, label:"Weeks"
       }]}

       yAxis={[ {label:"Number of Student Referred"}
      ]}
        
        series={[
          {
            data: seriesData, // Number of punishments
          },
        ]}
        width={350}
        height={200}
      />
    </>) 
  );
}

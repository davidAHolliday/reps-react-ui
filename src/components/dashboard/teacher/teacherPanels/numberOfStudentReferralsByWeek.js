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

const rangeWeeks = 10

const GenerateChartData = (currentWeek, rangeWeeks,data) => {
  const genData = [];
  
  for (let i = 0; i < rangeWeeks; i++) {
    const weekKey = `W${yearAdj(currentWeek-i)}`;
    const weekData = getUniqueStudentIdFromList(extractDataByWeek(yearAdj(currentWeek-i),data)).length; // Assuming findDataByWeek and yearAdj are defined elsewhere
    
    genData.push({
      [weekKey]: weekData
    });
  }

  return genData;
};


console.log(data)
const displayDate = GenerateChartData(currentWeek,rangeWeeks,data)

console.log(displayDate)
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
        width={400}
        height={200}
      />
    </>) 
  );
}

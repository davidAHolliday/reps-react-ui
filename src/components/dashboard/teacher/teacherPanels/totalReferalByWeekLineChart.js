import react, {useState,useEffect} from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import { Typography } from '@mui/material';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { baseUrl } from '../../../../utils/jsonData';
import axios from 'axios';



const getCurrentWeekOfYear = () => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const dayOfYear = (today - startOfYear) / 86400000; // 86400000 ms in a day
  return Math.ceil(dayOfYear / 7);
};

const getWeekNumber = (date) => {
  const oneJan = new Date(date.getFullYear(), 0, 1);
  const millisecondsInDay = 86400000; // 24 * 60 * 60 * 1000
  return Math.ceil((((date - oneJan) / millisecondsInDay) + oneJan.getDay() + 1) / 7);
};

export default function TotalReferalByWeek() {
  const [punishmentDataAssocTeacher, setPunishmentDataAssocTeacher] = useState([]);
  const [punishmentData,setPunishmentData] = useState([])
  const currentWeek = getCurrentWeekOfYear();

 


//Filters
const filterPunishementsByLoggedInUser= (data) =>{
  return data.filter(x=> x.teacherEmail === sessionStorage.getItem("email"));
}

const getStudentIdAssociatedToLoggedInUser = (data) => {
  const studentIdArray = [];
  const uniqueMap = new Map();

  data.forEach(item => {
    const studentId = item.student.studentIdNumber;

    // If the studentIdNumber is not in the map, add it to studentIdArray and set its value in the map to true
    if (!uniqueMap.has(studentId)) {
      uniqueMap.set(studentId, true);
      studentIdArray.push(studentId); // Add the studentId to the array
    }
  });

  return studentIdArray; // Return the array containing unique student IDs
}

//takes list of id number

  const getAllAssociatedPunishments = (data) => {
    
    return punishmentData.filter(punish => data.includes(punish.student.studentIdNumber));
  }



const headers = {
  Authorization: "Bearer " + sessionStorage.getItem("Authorization"),
};


const url = `${baseUrl}/punish/v1/punishments`;

//Get All Punishments
useEffect(() => {
  axios
    .get(url, { headers }) 
    .then(function (response) {
      setPunishmentData(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
    
 
}, []);


useEffect(()=>{
    //Set Punishment By Loggined In User
 const teachersStudents =  filterPunishementsByLoggedInUser(punishmentData)
 const listOfStudents = getStudentIdAssociatedToLoggedInUser(teachersStudents);
 const listOfAllAssociatedPunishments = getAllAssociatedPunishments(listOfStudents)
 console.log(listOfStudents)
 setPunishmentDataAssocTeacher(listOfAllAssociatedPunishments)
},[punishmentData])





//I got a list of punishments
// 

const findDataByWeek = (week) => {
  const thisWeek = punishmentDataAssocTeacher.filter(punish => {
    const date = new Date(punish.timeCreated);
    const weekNumber = getWeekNumber(date);

    return weekNumber === week; // Return true if date matches the week
  });

  return thisWeek; // Return the filtered array
}


const filterWeeklyDataByUniqueStudent = (data) =>{
  const uniqueMap = new Map();
  const lenStudent = data.filter(item => {
    const studentId = item.student.studentIdNumber;
    
    // If the studentIdNumber is not in the map, add it and return true to keep the item
    if (!uniqueMap.has(studentId)) {
        uniqueMap.set(studentId, true);
        return true;
    }
    // If the studentIdNumber is already in the map, return false to filter out the duplicate item
    return false;
});
return lenStudent.length
}


const accountForYearRollOver = (cw) =>{
  if(cw>0)
  return(cw)
if(cw <=0){
  return 52 + cw;
}
}


const displayDate = [
  {"Today" :findDataByWeek(accountForYearRollOver(currentWeek))},
  {"LW1" : findDataByWeek(accountForYearRollOver(currentWeek-1))},
  {"LW2" : findDataByWeek(accountForYearRollOver(currentWeek-2))},
  {"LW3" : findDataByWeek(accountForYearRollOver(currentWeek-3))},
  {"LW4" : findDataByWeek(accountForYearRollOver(currentWeek-4))},
  {"LW5" : findDataByWeek(accountForYearRollOver(currentWeek-5))},
  {"LW6" : findDataByWeek(accountForYearRollOver(currentWeek-6))},
  {"LW7" : findDataByWeek(accountForYearRollOver(currentWeek-7))},
  {"LW8" : findDataByWeek(accountForYearRollOver(currentWeek-8))},
  {"LW9" : findDataByWeek(accountForYearRollOver(currentWeek-9))},

]

//This reverses the x axis
displayDate.reverse()
console.log("final", displayDate)




    // Convert the weekMap to the format suitable for LineChart
    const xAxisData = displayDate.map(obj => Object.keys(obj)[0]); // Extract the keys (labels)
    const seriesData = displayDate.map(obj => Object.values(obj)[0] || 0); // Extract the values associated with the keys
    console.log('xAxisData:', xAxisData); // Debugging log
    console.log('seriesData:', seriesData); // Debugging log
  


  return (
     punishmentDataAssocTeacher && (<>
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
        height={350}
        margin={{
          left: 50,
          right:5,
          top:20,
          bottom: 70,
        }}
      />
    </>) 
  );
}

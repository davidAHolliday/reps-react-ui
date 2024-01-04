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

export default function ReferralByBehavior() {
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

const findDataByWeekAndByPunishment = (week, behavioral) => {
  // Filter data based on the behavioral infraction name
  const thisWeek = punishmentDataAssocTeacher.filter(punish => punish.infraction.infractionName === behavioral)
                      .filter(punish => {
                        const date = new Date(punish.timeCreated);
                        const weekNumber = getWeekNumber(date); // Assuming getWeekNumber is defined elsewhere in your code

                        return weekNumber === week; // Return true if date matches the week
                      });

  return thisWeek.length; // Return the filtered array
};


const accountForYearRollOver = (cw) =>{
  if(cw>0)
  return(cw)
if(cw <=0){
  return 52 + cw;
}
}




const getIncidentByBehavior = (behavioral) =>{
  const data = punishmentDataAssocTeacher.filter(item => item.infraction.infractionName === behavioral);
  return data.length
 }
 

//This reverses the x axis
// displayDate.reverse()
// console.log("final", displayDate)




//     // Convert the weekMap to the format suitable for LineChart
//     const xAxisData = displayDate.map(obj => Object.keys(obj)[0]); // Extract the keys (labels)
//     const seriesData = displayDate.map(obj => Object.values(obj)[0] || 0); // Extract the values associated with the keys
//     console.log('xAxisData:', xAxisData); // Debugging log
//     console.log('seriesData:', seriesData); // Debugging log
  



const tardyData = [
  findDataByWeekAndByPunishment(currentWeek,"Tardy"),
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-1),"Tardy"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-2),"Tardy"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-3),"Tardy"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-4),"Tardy"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-5),"Tardy"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-6),"Tardy"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-7),"Tardy"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-8),"Tardy"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-9),"Tardy"),  

];
const horseplayData =[
  findDataByWeekAndByPunishment(currentWeek,"Horseplay"),
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-1),"Horseplay"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-2),"Horseplay"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-3),"Horseplay"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-4),"Horseplay"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-5),"Horseplay"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-6),"Horseplay"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-7),"Horseplay"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-8),"Horseplay"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-9),"Horseplay"),  

];

const dressCodeData =[
  findDataByWeekAndByPunishment(currentWeek,"Dress Code"),
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-1),"Dress Code"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-2),"Dress Code"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-3),"Dress Code"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-4),"Dress Code"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-5),"Dress Code"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-6),"Dress Code"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-7),"Dress Code"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-8),"Dress Code"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-9),"Dress Code"),  

];

const UnauthorizedDevice =[
  findDataByWeekAndByPunishment(currentWeek,"Unauthorized Device/Cell Phone"),
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-1),"Unauthorized Device/Cell Phone"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-2),"Unauthorized Device/Cell Phone"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-3),"Unauthorized Device/Cell Phone"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-4),"Unauthorized Device/Cell Phone"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-5),"Unauthorized Device/Cell Phone"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-6),"Unauthorized Device/Cell Phone"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-7),"Unauthorized Device/Cell Phone"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-8),"Unauthorized Device/Cell Phone"),  
  findDataByWeekAndByPunishment(accountForYearRollOver(currentWeek-9),"Unauthorized Device/Cell Phone"),  

];





const xLabels = [
  
  'W9',
  'W8',
  'W7',
  'W6',
  'W5',
  'W4',
  'W3',
  'W3',
  'W2',
  'W1',
  'Current',
];


  return (
     punishmentDataAssocTeacher && (<>
      <Typography variant="h6" gutterBottom>
     TBD
      </Typography>
      <LineChart
      width={550}
      height={200}
      series={[
        { data: tardyData.reverse(), label: 'Tardy' },
        { data: dressCodeData.reverse(), label: 'Dress Code' },
        { data: horseplayData.reverse(), label: 'Horseplay' },
        { data: UnauthorizedDevice.reverse(), label: 'Unauthorized Device' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />
    </>) 
  );
}

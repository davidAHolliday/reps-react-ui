import React,{useState,useEffect} from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { baseUrl } from '../../../../utils/jsonData';
import { axisClasses } from '@mui/x-charts';

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


const TeacherInfractionOverPeriodBarChart = () => {
  const [punishmentDataAssocTeacher, setPunishmentDataAssocTeacher] = useState([]);
  const [punishmentData,setPunishmentData] = useState([])

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


const getIncidentByBehavior = (behavioral) =>{
 const data = punishmentData.filter(item => item.infraction.infractionName === behavioral);
 return data.length
}




const chartSetting = {
  yAxis: [
    {
  
    },
  ],

  width: 500,
  height: 200,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
      
    },
  },
};

const dataset = [
  {
    incidents: getIncidentByBehavior("Tardy"),
    behavior: 'Tardy',
  },
  {
    incidents: getIncidentByBehavior("Disruptive Behavior"),
    behavior: 'Disruptive Behavior',
  },
  {
    incidents: getIncidentByBehavior("Horseplay"),
    behavior: 'Horseplay',
  },
  {
    incidents: getIncidentByBehavior("Dress Code"),
    behavior: 'Dress Code',
  },
  {
    incidents: getIncidentByBehavior("Unauthorized Device/Cell Phone"),
    behavior: 'Unauthorized Device/Cell Phone',
  },
  {
    incidents: getIncidentByBehavior("Behavioral Concern"),
    behavior: 'Behavioral Concern',
  },
  {
    incidents: getIncidentByBehavior("Failure To Complete Work"),
    behavior: 'Failure To Complete Work',
  },
  
];

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Incidents Overview
      </Typography>
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: 'band', dataKey: 'behavior' }]}
        series={[{ dataKey: 'incidents', label: 'incidents' }]}
        {...chartSetting}
      />
    </div>
  );
};

export default TeacherInfractionOverPeriodBarChart;

import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import '../../admin/widget/CustomPieChart.css'
import { baseUrl } from '../../../../utils/jsonData';
import axios from 'axios';

export const IncidentByTypePieChart = ({ data = [] }) => {

  const [writeUps,setWriteUps] = useState([])

  // const filterData = data.filter()
  const totalIncidents = writeUps.length;
  
  const url = `${baseUrl}/punish/v1/punishments/${data.studentEmail}`;
  

  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("Authorization"),
    };

    axios
      .get(url, { headers }) // Pass the headers option with the JWT token
      .then(function (response) {
        setWriteUps(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);


  // Get Unique Students Info
  // writeUps.forEach(item => {
  //   const infractionName = item.punishment.Infraction.infractionName;
  //   uniqueStudents[infractionName] = (uniqueStudents[infractionName] || 0) + 1;
  // });
  const tardyList = writeUps.filter(punishment => punishment.infraction.infractionName === "Tardy");
  const disruptiveList = writeUps.filter(punishment => punishment.infraction.infractionName === "Disruptive Behavior");
  const cellList = writeUps.filter(punishment => punishment.infraction.infractionName === "Unauthorized Device/Cell Phone");
  const horseplayList = writeUps.filter(punishment => punishment.infraction.infractionName === "Horseplay");
  const dressCodeList = writeUps.filter(punishment => punishment.infraction.infractionName === "Dress Code");
  const ftcList = writeUps.filter(punishment => punishment.infraction.infractionName === "Failure To Complete Work");

  const refList = [];
  refList.push(tardyList);
  refList.push(disruptiveList);
  refList.push(cellList);
  refList.push(horseplayList);
  refList.push(dressCodeList);
  refList.push(ftcList);
  
  const listReturn = [{
     id: 0, value: ((tardyList.length/refList.length)*100).toFixed(2), label: 'Tardy'
    },
    {
      id: 1, value: ((disruptiveList.length/refList.length)*100).toFixed(2), label: 'Disruptive Behavior'
     },
     {
      id: 2, value: ((cellList.length/refList.length)*100).toFixed(2), label: 'Cell Phone'
     },
     {
      id: 3, value: ((horseplayList.length/refList.length)*100).toFixed(2), label: 'Horseplay'
     },
     {
      id: 4, value: ((dressCodeList.length/refList.length)*100).toFixed(2), label: 'Dress Code'
     },
     {
      id: 5, value: ((ftcList.length/refList.length)*100).toFixed(2), label: 'Failure to Complete Work'
     },
  ];
  

// const meetsTres = studentsWithIncidentsList.filter(ind=> parseFloat(ind.percent)>5.00).sort((a, b) => b.incidents - a.incidents);
// const otherNotMeetingTreshold = studentsWithIncidentsList.filter(ind=> parseFloat(ind.percent) <= 5.00).sort((a, b) => b.incidents - a.incidents);

// const modifiedList = [
//   ...meetsTres,
//   {
//     studentId: "001",
//     firstName: "Other",
//     lastName: "",
//     incidents: otherNotMeetingTreshold.reduce((acc, student) => {
//       return acc + student.incidents;
//     }, 0).toFixed(2),
//     percent: otherNotMeetingTreshold.reduce((acc, student) => {
//       return acc + parseFloat(student.percent);
//     }, 0).toFixed(2) // Closing parenthesis was added here
//   }
// ];



  // Custom styles for the scrollable container
  const scrollableContainerStyle = {
    maxHeight: '200px',
    overflowY: 'auto',
    paddingRight: '10px', // Adjust as needed to make room for the scrollbar
  };

  const generateLegendColor = (index) => {
    const colors = ['#02B2AF', '#2E96FF', '#B800D8', '#60009B', '#2731C8', '#03008D'];
    return colors[index % colors.length];
  };

  return (
    <>
      <Typography>Incident By Student (Week)</Typography>
      <div style={{ display: 'flex' }}>
        <PieChart
          series={[
            {
              data: listReturn,
              arcLabel: (item) => `${item.label} (${item.value}%)`,
              arcLabelMinAngle: 45,
            },
          ]}
         
          width={350}
          height={250}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: 'white',
              fontWeight: 'bold',
            },
          }}
          // Use slotProps.legend instead of legend prop
          slotProps={{ legend: { hidden: true } }}
          // slotProps={{
          //   legend:{

          //     vertical:'middle',horizontal:"right"}}}
          />
        {/* Scrollable container for labels */}
        <div className="legend">
      {listReturn.map((punishment, index) => (
        <div key={index} className="legend-item">
          <div className={`legend-color legend-color-${index + 1}`} style={{ backgroundColor: generateLegendColor(index) }}></div>
          <span>{`${punishment.label}`}</span>
        </div>
      ))}
    </div>
      </div>
    </>
  );
};
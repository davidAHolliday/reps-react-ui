import { Typography } from "@mui/material";
import React from "react";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

export const IncidentByTeacherPieChart = ({ data = [] }) => {
  const uniqueTeachers = {};
  const totalIncidents = data.length;

  // Get Unique Teachers Info
  data.forEach(item => {
    const teacherEmailId = item.teacherEmail;
    uniqueTeachers[teacherEmailId] = (uniqueTeachers[teacherEmailId] || 0) + 1;
  });

  console.log("unique", uniqueTeachers);

  const teachersWithIncidentsList = Object.entries(uniqueTeachers).map(([teacherEmailId, incidents]) => {
    const teacherData = data.find(item => item.teacherEmail === teacherEmailId);
    const teacherEmail = teacherData ? teacherData.teacherEmail : "";
    
    return {
      teacherEmail,
      incidents,
      percent: ((incidents / totalIncidents) * 100).toFixed(2),
    };
  });

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

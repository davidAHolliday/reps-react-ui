import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Typography from '@mui/material/Typography';



const TeacherInfractionOverPeriodBarChart = () => {
  // Validate and log the data structure

  // Log the data to inspect its structure

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Incidents Overview
      </Typography>
      <BarChart
  xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
  series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
  width={500}
  height={300}
/>
    </div>
  );
};

export default TeacherInfractionOverPeriodBarChart;

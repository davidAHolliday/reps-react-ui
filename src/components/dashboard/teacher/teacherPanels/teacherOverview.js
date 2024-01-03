import react, {useState,useEffect} from 'react'
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from "axios"
import { baseUrl } from '../../../../utils/jsonData'
import StudentProfile from '../../../StudentProfile';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import TeacherInfractionOverPeriodCarChart from './teacherInfractionPeriodBarChart';
import IncidentsByStudentTable from './incidentsByStudentTable';
import TotalReferalByWeek from './totalReferalByWeekLineChart';

   const TeacherOverviewPanel = () => {


	const [listOfStudents, setListOfStudents]= useState([])
  const [studentDisplay, setStudentDisplay] = useState(false);
  const [studentEmail, setStudentEmail] = useState("");
  const [studentName, setStudentName] = useState("");


  
  const size = {
    width: 500,
    height: 250,
  };

    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("Authorization"),
    };
    

//Using punihsments to find asscoiated teachers
    // const url = `${baseUrl}/student/v1/allStudents`;
    const url = `${baseUrl}/punish/v1/punishments`;


    useEffect(() => {
      axios
        .get(url, { headers }) // Pass the headers option with the JWT token
        .then(function (response) {
          //Figure out how we are going to return only students associated with teacher.
          // Maybe only pulling up students with active and closed punishments
          const data = response.data.filter(x=> x.teacherEmail === sessionStorage.getItem("email"));
          console.log("find me",data)
          setListOfStudents(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);




  const uniqueMap = new Map();

  const data = listOfStudents.filter(item => {
    const studentId = item.student.studentIdNumber;
    
    // If the studentIdNumber is not in the map, add it and return true to keep the item
    if (!uniqueMap.has(studentId)) {
        uniqueMap.set(studentId, true);
        return true;
    }
    
    // If the studentIdNumber is already in the map, return false to filter out the duplicate item
    return false;
});


    const hasScroll = data.length > 10;
    return (
        <>
         <div style={{backgroundColor:"rgb(25, 118, 210)",marginTop:"10px", marginBlock:"5px"}}>
   <Typography color="white" variant="h6" style={{ flexGrow: 1, outline:"1px solid  white",padding:
"5px"}}>
   Week At a Glance
        </Typography>
        </div>


  <div className='overview-row'>
    <div className='teacher-widget-half'>
    <div style={{marginTop:"50px"}}>
    <PieChart
      series={[
        
        { data: [
          { id: 0, value: 10, label: 'Behavioral' },
          { id: 1, value: 15, label: 'ShoutOut' },
          { id: 2, value: 20, label: 'Referals' },
        ],
          arcLabel: (item) =>  `(${item.value})`,
          arcLabelMinAngle: 45,
          
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
        },
      }}
      {...size}
    />


    </div>
    </div>
    <div className='teacher-widget-half'>
      <div className='infraction-bar-chart'>
<TeacherInfractionOverPeriodCarChart/>
      </div>


</div>

  </div>

  <div style={{backgroundColor:"rgb(25, 118, 210)",marginTop:"10px", marginBlock:"5px"}}>
   <Typography color="white" variant="h6" style={{ flexGrow: 1, outline:"1px solid  white",padding:
"5px"}}>
  Students of Concern
        </Typography>
        </div>


  <div className='overview-row'>
    <div className='teacher-widget-half'>
<div className='studentIncidentTable'>
  <IncidentsByStudentTable/>

</div>

    </div>
    <div className='teacher-widget-half'>


</div>

  </div>

  <div style={{backgroundColor:"rgb(25, 118, 210)",marginTop:"10px", marginBlock:"5px"}}>
   <Typography color="white" variant="h6" style={{ flexGrow: 1, outline:"1px solid  white",padding:
"5px"}}>
  Longitudinal Reports
        </Typography>
        </div>


  <div className='overview-row'>
    <div className='teacher-widget-third'>
      <TotalReferalByWeek/>


    </div>
    <div className='teacher-widget-third'>


</div>

<div className='teacher-widget-third'>


</div>

  </div>

  
    </>
    )
    }


    export default TeacherOverviewPanel;



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
import TotalReferalByWeek from './referralsByWeek';
import TotalStudentReferredByWeek from './numberOfStudentReferralsByWeek';
import Card from '@mui/material/Card';
import ReferralByBehavior from './referralsByBehavior';
import { fetchDataFromApi } from '../../global/helperFunctions';

   const TeacherOverviewPanel = () => {
	const [listOfStudents, setListOfStudents]= useState([])
  const [studentDisplay, setStudentDisplay] = useState(false);
  const [studentEmail, setStudentEmail] = useState("");
  const [studentName, setStudentName] = useState("");
  const [punishmentData,setPunishmentData] = useState([])
  
  
  
  
const url = `${baseUrl}/punish/v1/punishments`;

//Get All Punishments
useEffect(() => {
 
    fetchDataFromApi(url)
    .then(data => {
      setPunishmentData(data);
      console.log("fetchdata",data)
    })
    .catch(error =>{
        console.error('Error in fetching data:', error);
    });
    
 
}, []);


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
      <Card>
    <div style={{ textAlign:"center",marginTop:"10px"}}>
    <Typography>Parent Communcation</Typography>
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
      width={500}
      height={260}
      
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
        },
      }}
   
    
    />


    </div>
    </Card>
    </div>
    <div className='teacher-widget-half'>
      <div className='infraction-bar-chart'>
        <Card>
<TeacherInfractionOverPeriodCarChart/>
</Card>
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
  <Card>  <IncidentsByStudentTable data={punishmentData}/>
  </Card>


</div>

    </div>
    <div className='teacher-widget-half'>
<Card></Card>

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
    <Card>

      <TotalReferalByWeek data={punishmentData}/>
      </Card>



    </div>
    <div className='teacher-widget-third'>
      <Card>
<TotalStudentReferredByWeek data={punishmentData}/>
</Card>
</div>

<div className='teacher-widget-third'>
<Card>
<ReferralByBehavior data={punishmentData}/>
</Card>

</div>

  </div>

  
    </>
    )
    }


    export default TeacherOverviewPanel;



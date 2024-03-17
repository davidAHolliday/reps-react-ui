import  {useState,useEffect} from 'react'
import Typography from '@mui/material/Typography';
import IncidentsByStudentTable from './charts/tables/incidentsByStudentTable.js';
import TotalReferralByWeek from './charts/lineCharts/referralsByWeek.js';
import TotalStudentReferredByWeek from './charts/lineCharts/numberOfStudentReferralsByWeek.js';
import Card from '@mui/material/Card';
import ReferralByBehavior from './charts/lineCharts/referralsByBehavior.js';
import TeacherInfractionOverPeriodBarChart from './charts/barChart/teacherInfractionPeriodBarChart.js';
import { PieChartParentCommunication } from './charts/pieCharts/pieChartParentCommunication.js';
import RecentIncidents from './charts/tables/studentRecentIncidents.js';
import TeacherShoutOutWidget from './charts/tables/teacherShoutOutWidget.js';
import Button from '@mui/material/Button';
import "./teacher.css"


   const TeacherOverviewPanel = ({setPanelName,data = []}) => {
  const [openModal, setOpenModal] = useState({display:false,message:"",buttonType:""})


  const dataExcludeNonReferrals = data.punishmentResponse.filter((x)=>{return (x.infractionName !=="Positive Behavior Shout Out!")})
  const weeklyData = dataExcludeNonReferrals.filter((x) => {
     const currentDate = new Date();
     const itemDate = new Date(x.timeCreated);
     const sevenDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));
     return itemDate > sevenDaysAgo;
 });

 const weeklyDataIncSOBxConcern = data.punishmentResponse.filter((x) => {
    const currentDate = new Date();
    const itemDate = new Date(x.timeCreated);
    const sevenDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));
    return itemDate > sevenDaysAgo;
});

  useEffect(() => {
    const statusQuo = data.punishmentResponse.filter(x => x.status === "PENDING" && x.infractionLevel === "3");
    if(statusQuo.length > 0){
      setOpenModal({display:true, message:"Attention! You have level 3 punishments with student answers that must be reviewed before closing.You can go to the page to review these by clicking the \"Level Three\" Button or you may hit the \"Later\" button to take care of this at another time. You will receive notifications until the answers are reviewed as they are not Closed until you review. Thank you!", buttonType:"redirect"});
    }
  }, [data]);


    return (
        <>
    {openModal.display && <div className="modal-overlay">
  <div className="modal-content">
    <div className="modal-header">
      <h3 style={{whiteSpace:'normal', wordBreak: 'break-word'}}>{openModal.message}</h3>
    </div>
    <div className="modal-body">
    </div>
    <div className="modal-buttons">

    <button onClick={() => {
        setOpenModal({display:false,message:""})}}>Later</button>

      {openModal.buttonType==="redirect" && <Button
      type="redirect"
      onClick={() => {
        setOpenModal({display:false,message:""})
        setPanelName("levelThree")
      }}
      width='50%'
      variant="contained"
      sx={{ height: '100%' }} // Set explicit height
    >
    Level Three
    </Button>}
   </div>
  </div>
</div>}
                <div className='dashboard-row'>
        <Card variant="outlined">
        <TeacherShoutOutWidget data={data.punishmentResponse}/>
        </Card>
        </div>
          
        <div className="section-title">
   <h2 >
   Week At a Glance
        </h2>
        </div>
        



  <div className='dashboard-row'>
    <div className='teacher-widget-half'>
      {/* <Card> */}
    <div style={{ textAlign:"center",marginTop:"10px"}}>
<PieChartParentCommunication data={weeklyDataIncSOBxConcern}/>


    </div>
    {/* </Card> */}
    </div>
    <div className='teacher-widget-half'>
      <div className='infraction-bar-chart'>
        {/* <Card> */}
<TeacherInfractionOverPeriodBarChart data={weeklyData}/>
{/* </Card> */}
      </div>
  


</div>

  </div>
<div className='container'>
  <div className='section-title'>
   <h2  >
  Students of Concern
        </h2>
        </div>
        </div>


        <div className='dashboard-row'>
    <div className='teacher-widget-half'>
<div className='studentIncidentTable'>
{/* <Card style={{padding:"5px"}}> */}
    <IncidentsByStudentTable writeUps={data.writeUpResponse}/>
{/* </Card> */}


</div>

    </div>
    <div className='teacher-widget-half'>
{/* <Card style={{padding:"5px"}}> */}
<RecentIncidents data={data.punishmentResponse}/>
{/* </Card> */}

</div>

  </div>

  <div className='section-title'>
    <h2 >Longitudinal Reports</h2>
  </div>


  <div className='dashboard-row'>
    <div className='teacher-widget-third'>
    {/* <Card style={{padding:"5px"}}> */}

    { data ? <TotalReferralByWeek data={data.writeUpResponse}/> : <h1>loading</h1>}

      {/* </Card> */}



    </div>
    <div className='teacher-widget-third'>
    {/* <Card style={{padding:"5px"}}> */}
<TotalStudentReferredByWeek data={data.writeUpResponse}/>
{/* </Card> */}
</div>

<div className='teacher-widget-third'>
{/* <Card style={{padding:"5px"}}> */}
<ReferralByBehavior data={data.writeUpResponse}/>
{/* </Card> */}

</div>

  </div>

  
    </>
    )}
   


    export default TeacherOverviewPanel;



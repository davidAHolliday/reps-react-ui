import react, {useState,useEffect} from 'react'
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, getImageListItemBarUtilityClass } from '@mui/material';
import { dateCreateFormat } from '../../../../global/helperFunctions';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
  
const TeacherShoutOutWidget = ({data = []}) => {
    const [barOpen,setBarOpen] = useState(true)
  
    //We need to fix the cfr issues
	  const shoutOutData = data.filter(punish => punish.infraction.infractionName === "Positive Behavior Shout Out!");
      
    const hasScroll = shoutOutData.length > 2;

    shoutOutData.sort((a,b) => b.timeCreated - a.timeCreated ? 1 : -1)

    return (
!barOpen ?  


<div style={{backgroundColor:"white",width:"340vh",height:"30px"}}>
<div style={{ marginLeft:"20px",display:"flex",flexDirection:"row"}}>
<ArrowDropDownCircleIcon 
style={{ transform: 'rotate(0deg)', cursor: 'pointer' }}
onClick={() => setBarOpen(true)}
/> <h5 style={{marginLeft:"20px"}}>Positive Behavior</h5>  </div>

</div>

 :
        <>
       <div style={{backgroundColor:"white",width:"340vh",height:"30px"}}>
<div style={{ marginLeft:"20px",display:"flex",flexDirection:"row"}}>
<ArrowDropDownCircleIcon 
style={{ transform: 'rotate(180deg)', cursor: 'pointer' }}
onClick={() => setBarOpen(false)}
/> <h5 style={{marginLeft:"20px"}}>Positive Behavior</h5>  </div>

</div>




<TableContainer  style={{ width:"100%",height: hasScroll ? '200px' : 'auto', overflowY: hasScroll ? 'scroll' : 'visible' }}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell variant="head" style={{ fontWeight: 'bold', width: '20%' }}>
          Created On
        </TableCell>
        <TableCell variant="head" style={{ fontWeight: 'bold', width: '20%' }}>
          Student
        </TableCell>
        <TableCell variant="head" style={{ fontWeight: 'bold', width: '30%' }}>
          Shout Outs
        </TableCell>
        <TableCell variant="head" style={{ fontWeight: 'bold', width: '30%' }}>
          Created By
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {shoutOutData.length > 0 ? (
        shoutOutData.map((x, key) => (
          <TableRow key={key}>
            <TableCell style={{ width: '20%' }}>{dateCreateFormat(x.timeCreated)}</TableCell>
            <TableCell style={{ width: '20%' }}>{x.student.firstName} {x.student.lastName}</TableCell>
            <TableCell style={{ width: '30%', }}>
  {x.infraction.infractionDescription}
</TableCell>            
<TableCell style={{ width: '30%' }}>{x.teacherEmail}</TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan="4">No Shout Out Yet, but I'm sure it's coming!</TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</TableContainer>    </>
    )
    }

    export default TeacherShoutOutWidget;



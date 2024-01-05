import react, {useState,useEffect} from 'react'
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, getImageListItemBarUtilityClass } from '@mui/material';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContactsIcon from '@mui/icons-material/Contacts';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from "axios"
import { baseUrl } from '../../../../utils/jsonData';
import { dateCreateFormat } from '../../global/helperFunctions';

   const TeacherShoutOutWidget = ({data = []}) => {

  

    //We need to fix the cfr issues
	  const shoutOutData = data.filter(punish => punish.infraction.infractionName === "Positive Behavior Shout Out!");
      
    const hasScroll = shoutOutData.length > 2;

    return (
        <>
         <div >
        </div>
   
    <TableContainer component={Paper} style={{ height: hasScroll ? '200px' : 'auto', overflowY: hasScroll ? 'scroll' : 'visible' }}>
      <Table>
        <TableHead>
          <TableRow>
          
          
          <TableCell variant="head" style={{ fontWeight: 'bold' }}>
             Created On
            </TableCell>
         
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
              Shout Outs 
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
             Created By
            </TableCell>

          </TableRow>
        </TableHead>
        <TableBody>




          {shoutOutData.length > 0 ? (
            shoutOutData.map((x, key) => (
<TableRow key={key}>
<TableCell>{dateCreateFormat(x.timeCreated)}</TableCell>

  <TableCell>{x.infraction.infractionDescription}</TableCell>
  <TableCell>{x.teacherEmail}</TableCell>
</TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="5">No Shout Out Yet, but im sure its coming!.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    </>
    )
    }

    export default TeacherShoutOutWidget;



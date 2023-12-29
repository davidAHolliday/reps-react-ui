import  {useEffect,useState} from 'react'
import * as React from 'react';

import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from "axios"
import { baseUrl } from '../../../../utils/jsonData'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckBoxIcon from '@mui/icons-material/CheckBox';






    const TeacherPunishmentPanel = ({filter}) => {
      const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

      const [listOfPunishments, setListOfPunishments]= useState([])
      const [filterData, setFilterData] = useState();
      const [sort,setSort] = useState("");
      const [loadingPunihsmentId, setLoadingPunishmentId] = useState({id:null,buttonType:""});
      const [toast,setToast] = useState({visible:false,message:""})


  
      const headers = {
        Authorization: "Bearer " + sessionStorage.getItem("Authorization"),
      };
      
      const url = `${baseUrl}/punish/v1/punishments`;
      
  
  useEffect(()=>{
      setSort(filter)
      
  },[filter])
  
      useEffect(() => {
        axios
          .get(url, { headers }) // Pass the headers option with the JWT token
          .then(function (response) {
            const sortedData = response.data.sort((a, b) => new Date(a.timeCreated) - new Date(b.timeCreated));
            setListOfPunishments(sortedData);        })
          .catch(function (error) {
            console.log(error);
          });
      }, [ toast.visible]);


      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setToast({visible:false,message:""});
      };

      const handleClosePunishment = (obj) =>{
        setLoadingPunishmentId({id:obj.punishmentId,buttonType:"close"})
        const url = `${baseUrl}/punish/v1/close/${obj.punishmentId}`;
        axios
        .post(url,[], { headers }) // Pass the headers option with the JWT token
        .then(function (response) {
          console.log(response)
          setToast({visible:true,message:"Your Referral was closed"})

        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(()=>{
          setTimeout(()=>{
            setToast({visible:false,message:""})
            setLoadingPunishmentId({id:null,buttonType:""})

          },1000)
        }

        );
    };

    const handleDeletePunishment = (obj) =>{
      setLoadingPunishmentId({id:obj.punishmentId,buttonType:"delete"})
    
      const url = `${baseUrl}/punish/v1/delete`;
      axios
      .delete(url, { headers:headers,data:obj }) // Pass the headers option with the JWT token
      .then(function (response) {
        console.log(response)
    setToast({visible:true,message:"Your Referral was Deleted"})
    
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(()=>{
        setTimeout(()=>{
          setToast({visible:false,message:""})
          setLoadingPunishmentId({id:null,buttonType:""})
        },1000)
      }
        );
  };
  
  
      // if(sort == "ALL"){
      //   setFilterData(listOfPunishments);
    
  
      
   
    const data = (sort === "ALL")? listOfPunishments: listOfPunishments.filter((x)=> x.status === sort);
  
  
      const hasScroll = data.length > 10;
  
      const calculateDaysSince = (dateCreated) => {
        const currentDate = new Date();
        const createdDate = new Date(dateCreated);
      
        // Set both dates to UTC
        currentDate.setUTCHours(0, 0, 0, 0);
        createdDate.setUTCHours(0, 0, 0, 0);
      
        const timeDifference = currentDate - createdDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
        return daysDifference;
      };
      
      return (
          <>
                   { console.log(listOfPunishments)}
  
     <Typography color="white" variant="h6" style={{ flexGrow: 1, outline:"1px solid  white",padding:
  "5px"}}>
  
  
          </Typography>
          <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={toast.visible} autoHideDuration={6000} onClose={handleClose}>
  <Alert Close={handleClose} severity="success" sx={{ width: '100%' }}>
    {toast.message}
  </Alert>
</Snackbar>
          <TableContainer component={Paper} style={{ maxHeight: hasScroll ? '75vh' : 'auto', overflowY: hasScroll ? 'scroll' : 'visible' }}>
          <Table>
          <TableHead>
          <TableRow>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
              Name
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
             Referal Type
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
              Description
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
              Level
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
             Status
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
             Days Since
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
             Action
            </TableCell>
   
          </TableRow>
        </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data.map((x, key) => {
                  const days = calculateDaysSince(x.timeCreated);
  
                  return (
                    <TableRow
  
                      key={key}
                    >
                      <TableCell>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <AccountCircleIcon
                            style={{
                              fontSize: '2rem',  // Adjust the size as needed
                              color: 'rgb(25, 118, 210)', // Change the color to blue
                            }}
                          />
                          <span>{x.student.firstName} {x.student.lastName}</span>
                        </div>
                      </TableCell>
                      <TableCell>{x.infraction.infractionName}</TableCell>
                      <TableCell style={{width:"75px"}}>{x.infraction.infractionDescription}</TableCell>
                      <TableCell>{x.infraction.infractionLevel}</TableCell>
                      <TableCell>
  <div 
  className={`status-tag ${days >= 4 ? "tag-critical" : days >= 3 ? "tag-danger" : days >= 2 ? "tag-warning" : "tag-good"}`}
  >
    {x.status}
  </div>
</TableCell>

                      <TableCell>{days}</TableCell>
                      <TableCell>
  {x.status == "OPEN" ?  <><button style={{height:"45px", width:"100%",marginBottom:"5px"}} onClick={() => { handleClosePunishment(x) }}>
    {(loadingPunihsmentId.id === x.punishmentId && loadingPunihsmentId.buttonType==="close") ? (
      <CircularProgress style={{height:"20px", width:"20px"}} color="secondary" />
    ) : (
      <CheckBoxIcon/>
    )}
  </button>

  <button style={{height:"45px", width:"100%",backgroundColor:"red"}} onClick={() => { handleDeletePunishment(x) }}>
    {(loadingPunihsmentId.id === x.punishmentId && loadingPunihsmentId.buttonType==="delete") ? (
      <CircularProgress style={{height:"20px", width:"20px"}} color="secondary" />
    ) : (
      <DeleteForeverIcon/>
    )}
  </button></> : <> <button style={{height:"45px", width:"100%",backgroundColor:"red"}} onClick={() => { handleDeletePunishment(x) }}>
    {(loadingPunihsmentId.id === x.punishmentId && loadingPunihsmentId.buttonType==="delete") ? (
      <CircularProgress style={{height:"20px", width:"20px"}} color="secondary" />
    ) : (
      <DeleteForeverIcon/>
    )}
  </button></>}                      
 

</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan="5">No open assignments found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

export default TeacherPunishmentPanel;
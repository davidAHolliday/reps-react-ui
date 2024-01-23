import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import "./notification-bar.css"
export const NotificationBar = (props) => {

  const [data,setData] = useState([])
  // const [openModal, setOpenModal] = useState({display:false,message:"",buttonType:""})

  // const filterPunishmentByStatus = (props) => {
  //   return props.filter(x => x.status === "PENDING");
  // }

  // useEffect(() => {
  //   filterPunishmentByStatus(props)
  //   if(props.length > 0){
  //     setOpenModal({display:true, message:"Attention! You have level 3 punishments with student answers that must be reviewed before closing. Please hit the redirect button to go to the level 3 approval page or cancel to continue. You will receive notifications until the answers are reviewed as they are not Closed until you review. Thank you!", buttonType:"redirect"});
  //   }
  // }, [props]);

  useEffect(() => {
    const notificationData = [
      {
        index: 1,
        title: "Punishment",
        description: "New Punishment has been issued to a student"
      },
      {
        index: 2,
        title: "New Student",
        description: "New Student Registered"
      },
      {
        index: 3,
        title: "Punishment Closed",
        description: "Student Finished His Assignment, Review"
      },
      {
        index: 4,
        title: "Punishment Closed",
        description: "Student Finished His Assignment, Review"
      },
      {
        index: 5,
        title: "Punishment Closed",
        description: "Student Finished His Assignment, Review"
      }
    ];

    setData(notificationData);
  }, []); // The empty dependency array ensures this effect runs only once, on mount.



  const handleDismiss =(index) =>{
     // Filter out the notification with the specified index
  const updatedData = data.filter((notification) => notification.index !== index);
  
  // Update the state with the filtered data
  setData(updatedData);

  }

  return (
    <>
    {console.log(props + "These are the props!")}
    {openModal.display && <div className="modal-overlay">
  <div className="modal-content">
    <div className='modal-header'>
      <h3>{openModal.message}</h3>
    </div>
    <div className='modal-body'>
    </div>
    <div className='modal-buttons'>

      <button onClick={() => {
        setOpenModal({display:false,message:""})}}>Cancel</button>
      {openModal.buttonType==="redirect" && <Button
      type="redirect"
      onClick={() => {
        setOpenModal({display:false,message:""})}}
      width='50%'
      variant="contained"
      sx={{ height: '100%' }} // Set explicit height
    >
      Submit
    </Button>}
   </div>
  </div>
</div>}
    
<div className='notification-body'>
<div className="popup-container">
  {data.length === 0 ? (
    <div className="notification-card"> 
      <span className="dismiss-btn">×</span>
      <h3 className="notification-title">You are all caught up!!</h3>
    </div>
  ) : (
    data.map((notification) => (
      <div key={notification.index} className="notification-card"> 
        <span onClick={() => handleDismiss(notification.index)} className="dismiss-btn">×</span>
        <h3 className="notification-title">{notification.title}</h3>
        <p className="notification-description">{notification.description}</p> 
      </div>
    ))
  )}
</div>
</div>
</>

    
  );
};

export default NotificationBar;


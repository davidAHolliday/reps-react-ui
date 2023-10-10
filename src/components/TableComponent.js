import React from "react";

export const TableComponent = (props) =>{
    const { list } = props;

    const tableData = list.filter(
      (infraction) =>
        infraction.teacherEmail === sessionStorage.getItem("email") &&
        infraction.status === props.status
    );
return(
        
         <div style={{width:"100%"}}>
      <div style={{width:"100%",height:"8vh",backgroundColor:"white"}} className='notification-widget'></div>
       <div style={{width:"100%",height:"3vh",backgroundColor:"lightblue"}}>
        Students With Open Assigment</div>
        <table className="my-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Date Created</th>
      <th>Teacher</th>
      <th>Infraction Description</th>
      <th>Status</th>
      {/* <th>Action</th> */}
    </tr>
  </thead>
  <tbody>
  {tableData.length > 0 ? (
  tableData.map((x, key) => (
    <tr key={key}>
      <td>{x.student.firstName} {x.student.lastName}</td>
      <td>{x.timeCreated}</td>
      <td>{x.teacherEmail}</td>
      <td>{x.infraction.infractionDescription}</td>
      <td>{x.status}</td>
      {/* <td><button onClick={()=>{handleClose(x.punishmentId)}}>Mark Completed</button></td> */}
    </tr>
  ))
) : (
  <tr>
    <td colSpan="5">No open assignments found.</td>
  </tr>
)}
  </tbody>
</table>
        
      </div>
    )
}
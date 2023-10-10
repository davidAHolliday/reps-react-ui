import React from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

export const TableComponent = (props) => {
  const {title, list, status } = props;

  const tableData = list.filter(
    (infraction) =>
      infraction.teacherEmail === sessionStorage.getItem('email') &&
      infraction.status === status
  );

  const hasScroll = tableData.length > 10;


  return (
    <>
    <h1 style={{background:"grey", marginTop:"30px"}}>{title}</h1>
    <TableContainer component={Paper} style={{ maxHeight: hasScroll ? '400px' : 'auto', overflowY: hasScroll ? 'scroll' : 'visible' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
              Name
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
              Date Created
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
              Teacher
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
              Infraction Description
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.length > 0 ? (
            tableData.map((x, key) => (
              <TableRow key={key}>
                <TableCell>{x.student.firstName} {x.student.lastName}</TableCell>
                <TableCell>{x.timeCreated}</TableCell>
                <TableCell>{x.teacherEmail}</TableCell>
                <TableCell>{x.infraction.infractionDescription}</TableCell>
                <TableCell>{x.status}</TableCell>
              </TableRow>
            ))
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

export default TableComponent;


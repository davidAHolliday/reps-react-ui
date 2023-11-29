import react from 'react'
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContactsIcon from '@mui/icons-material/Contacts';
import VisibilityIcon from '@mui/icons-material/Visibility';

const data = [
	{
		"studentIdNumber": "49349",
		"firstName": "Asia Yvonne",
		"lastName": "Adams",
		"parentEmail": "erickaperez72@gmail.com",
		"studentEmail": "adaasi9349@ccsdschools.com",
		"guidanceEmail": "leilani_worrell@charleston.k12.sc.us ",
		"adminEmail": "alan_smith@charleston.k12.sc.us",
		"address": "123 Main St",
		"grade": "10",
		"parentPhoneNumber": "8562364720@tmomail.net",
		"studentPhoneNumber": "+9876543210"
	},
	{
		"studentIdNumber": "39715",
		"firstName": "Timothy ",
		"lastName": "Andrews",
		"parentEmail": "nestasyeye@gmail.com",
		"studentEmail": "andtim9715@ccsdschools.com",
		"guidanceEmail": "guidance@example.com",
		"adminEmail": "admin@example.com",
		"address": "123 Main St",
		"grade": "10",
		"parentPhoneNumber": "+18433458079",
		"studentPhoneNumber": "+9876543210"
	},
	{
		"studentIdNumber": "38937",
		"firstName": "Ge'Vion",
		"lastName": "Brown",
		"parentEmail": "ghanna859@gmail.com",
		"studentEmail": "brogev8937@ccsdschools.com",
		"guidanceEmail": "guidance@example.com",
		"adminEmail": "admin@example.com",
		"address": "123 Main St",
		"grade": "10",
		"parentPhoneNumber": "+18437279376",
		"studentPhoneNumber": "+9876543210"
	},
	{
		"studentIdNumber": "42925",
		"firstName": "Lamajai",
		"lastName": "Butler",
		"parentEmail": "zori123butler@yahoo.com",
		"studentEmail": "butlam2925@ccsdschools.com",
		"guidanceEmail": "guidance@example.com",
		"adminEmail": "admin@example.com",
		"address": "123 Main St",
		"grade": "10",
		"parentPhoneNumber": "+18434256604",
		"studentPhoneNumber": "+9876543210"
	},
	{
		"studentIdNumber": "26041",
		"firstName": "Darius",
		"lastName": "Govan",
		"parentEmail": "roperlatoya35@gmail.com",
		"studentEmail": "govdar6041@ccsdschools.com",
		"guidanceEmail": "guidance@example.com",
		"adminEmail": "admin@example.com",
		"address": "123 Main St",
		"grade": "10",
		"parentPhoneNumber": "+18438684583",
		"studentPhoneNumber": "+9876543210"
	},
	{
		"studentIdNumber": "49556",
		"firstName": "Quen'nairah",
		"lastName": "Grant",
		"parentEmail": "traceejackson929@gmail.com",
		"studentEmail": "graque9556@ccsdschools.com",
		"guidanceEmail": "guidance@example.com",
		"adminEmail": "admin@example.com",
		"address": "123 Main St",
		"grade": "10",
		"parentPhoneNumber": "+18435348266",
		"studentPhoneNumber": "+9876543210"
	},
	{
		"studentIdNumber": "25823",
		"firstName": "Kamarri",
		"lastName": "Joe",
		"parentEmail": "kentricelegare@yahoo.com",
		"studentEmail": "joekam5823@ccsdschools.com",
		"guidanceEmail": "guidance@example.com",
		"adminEmail": "admin@example.com",
		"address": "123 Main St",
		"grade": "10",
		"parentPhoneNumber": "+18436681090",
		"studentPhoneNumber": "+9876543210"
	},
	{
		"studentIdNumber": "39575",
		"firstName": "Zh'ri",
		"lastName": "Major-Evans",
		"parentEmail": "ishlamiaj@gmail.com",
		"studentEmail": "majzhr9575@ccsdschools.com",
		"guidanceEmail": "guidance@example.com",
		"adminEmail": "admin@example.com",
		"address": "123 Main St",
		"grade": "10",
		"parentPhoneNumber": "+18438649457",
		"studentPhoneNumber": "+9876543210"
	},
	{
		"studentIdNumber": "33659",
		"firstName": "Trinity",
		"lastName": "McGee",
		"parentEmail": "tynieced123@gmail.com",
		"studentEmail": "mcgtri3659@ccsdschools.com",
		"guidanceEmail": "guidance@example.com",
		"adminEmail": "admin@example.com",
		"address": "123 Main St",
		"grade": "10",
		"parentPhoneNumber": "+18432982650",
		"studentPhoneNumber": "+9876543210"
	},
	{
		"studentIdNumber": "39992",
		"firstName": "Johauna",
		"lastName": "Riley",
		"parentEmail": "nelson.vonetta@yahoo.com",
		"studentEmail": "riljoh9992@ccsdschools.com",
		"guidanceEmail": "guidance@example.com",
		"adminEmail": "admin@example.com",
		"address": "123 Main St",
		"grade": "10",
		"parentPhoneNumber": "+18435790933",
		"studentPhoneNumber": "+9876543210"
	},
	{
		"studentIdNumber": "34958",
		"firstName": "Treonna",
		"lastName": "Taylor",
		"parentEmail": "devannet@yahoo.com",
		"studentEmail": "TayTre4958@ccsdschools.com",
		"guidanceEmail": "guidance@example.com",
		"adminEmail": "admin@example.com",
		"address": "123 Main St",
		"grade": "10",
		"parentPhoneNumber": "+18434423570",
		"studentPhoneNumber": "+9876543210"
	}]




   const StudentPanel = () => {

    const hasScroll = data.length > 10;
    return (
        <>
         <div style={{backgroundColor:"rgb(25, 118, 210)",marginTop:"10px", marginBlock:"5px"}}>
   <Typography color="white" variant="h6" style={{ flexGrow: 1, outline:"1px solid  white",padding:
"5px"}}>
   Students
        </Typography>
        </div>
   
    <TableContainer component={Paper} style={{ maxHeight: hasScroll ? '400px' : 'auto', overflowY: hasScroll ? 'scroll' : 'visible' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
              Name
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
             Email
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
              Grade
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
              Phone Number
            </TableCell>
            <TableCell variant="head" style={{ fontWeight: 'bold' }}>
             Actions
            </TableCell>
         
          </TableRow>
        </TableHead>
        <TableBody>




          {data.length > 0 ? (
            data.map((x, key) => (
<TableRow key={key}>
  <TableCell>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <AccountCircleIcon
        style={{
          fontSize: '2rem',  // Adjust the size as needed
          color: 'rgb(25, 118, 210)', // Change the color to blue
        }}
      />
      <span>{x.firstName} {x.lastName}</span>
    </div>
  </TableCell>
  <TableCell>{x.studentEmail}</TableCell>
  <TableCell>{x.grade}</TableCell>
  <TableCell>{x.studentPhoneNumber}</TableCell>
  <TableCell>

      <ContactsIcon color="primary" /> {/* Use a suitable color for the Contact icon */}

      <VisibilityIcon color="primary" /> {/* Use a suitable color for the View icon */}

  </TableCell>
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
    )
    }


    export default StudentPanel;



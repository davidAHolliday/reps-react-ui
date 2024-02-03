import react, {useEffect,useState,useRef} from 'react'
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContactsIcon from '@mui/icons-material/Contacts';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from "axios"
import { baseUrl } from '../../../utils/jsonData'
import { Button } from '@mui/material';
import jsPDF from 'jspdf';






   const DetentionWidget = () => {

    const [listOfPunishments, setListOfPunishments]= useState([])
    const [filterData, setFilterData] = useState();
    const [sort,setSort] = useState("OPEN");

    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("Authorization"),
    };
    
    const url = `${baseUrl}/punish/v1/punishments`;
    

    useEffect(() => {
      axios
        .get(url, { headers }) // Pass the headers option with the JWT token
        .then(function (response) {
          const sortedData = response.data.sort((a, b) => new Date(a.timeCreated) - new Date(b.timeCreated));
          setListOfPunishments(sortedData);        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);

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
    

  const pdfRef = useRef();

const generatePDF = (studentData) => {
  const pdf = new jsPDF();
    // Add logo
    const logoWidth = 50; // Adjust the width of the logo as needed
    const logoHeight = 50; // Adjust the height of the logo as needed
    const logoX = 130; // Adjust the X coordinate of the logo as needed
    const logoY = 15; // Adjust the Y coordinate of the logo as needed
    
//https://medium.com/dont-leave-me-out-in-the-code/5-steps-to-create-a-pdf-in-react-using-jspdf-1af182b56cee


pdf.setFontSize(16);
pdf.text('Detention List', 105, 40, { align: 'center' }); // Adjust coordinates and styling as needed


  // Add punishment details table
  pdf.autoTable({
    startY: 70, // Adjust the Y-coordinate as needed
    head: [['Last Name', 'First Name', 'Infraction Period']],
    body: studentData.map((student) => [
      student.student.lastName,
      student.student.firstName,
      student.classPeriod,
    ]),
  });

  // Save or open the PDF
  pdf.save('detention_report.pdf');
};



  
  const data = listOfPunishments.filter((punishment) => {
    const days = calculateDaysSince(punishment.timeCreated);
    return (days > 1 && days <3) && punishment.status === "OPEN"; // This will filter out records that are NOT older than 3 days
  });

  // Use the olderThanThreeDays list for rendering instead of data

    const hasScroll = data.length > 10;

 
    return (
      <>
        <div style={{ backgroundColor: "rgb(25, 118, 210)", marginTop: "10px", marginBlock: "5px" }}>
          <Typography color="white" variant="h5" style={{ flexGrow: 1, outline: "1px solid white", padding: "5px" }}>
            Detention list
          </Typography>
        </div>
    
        <table className='widget-table'> {/* Added borderCollapse for proper styling */}
          <thead>
            <tr className="widget-table-tr"> {/* Moved the header row to thead */}
              <th>Name</th>
              <th>Inf Period</th>
            </tr>
          </thead>
    
          <tbody>
            {data.length > 0 ? (
              data.map((x, key) => {
                const days = calculateDaysSince(x.timeCreated);
                const rowBackgroundColor = key % 2 === 0 ? "#f2f2f2" : "white"; // Alternate colors

                return (
                  <tr key={key}
                  style={{ backgroundColor: rowBackgroundColor }}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontSize: '15pt', textAlign: 'center'}}>{x.student.firstName} {x.student.lastName}</span>
                      </div>
                    </td>
                    {/* <td>{x.infraction.infractionName}</td> */}
                    <td style={{ fontSize: '15pt', textAlign: 'center'}}>{x.classPeriod}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>No student is assigned Detention.</td>
              </tr>
            )}
          </tbody>
        </table>
        <button onClick={()=>{generatePDF(data)}}style={{backgroundColor:"#CF9FFF"}} >Print</button>
      </>
    );
            }
    
export default DetentionWidget;
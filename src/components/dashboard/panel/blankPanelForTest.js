import react, {useState,useEffect} from 'react'
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContactsIcon from '@mui/icons-material/Contacts';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from "axios"
import { baseUrl } from '../../../utils/jsonData'

   const BlankPanelForTest = () => {


	const [listOfStudents, setListOfStudents]= useState([])

    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("Authorization"),
    };
    
    

  



    return (
        <>

          
     <h1>SAMPLE STUDENT ONLY PANEL</h1>

    </>
    )
    }


    export default BlankPanelForTest;



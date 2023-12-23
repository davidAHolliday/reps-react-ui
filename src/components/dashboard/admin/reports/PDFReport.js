import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


const data = [
    {
      student: {
        firstName: 'John',
        lastName: 'Doe',
      },
      infraction: {
        infractionName: 'Late Arrival',
      },
      timeCreated: '2023-12-10T10:00:00Z', // This is a sample date in ISO format
    },
    {
      student: {
        firstName: 'Jane',
        lastName: 'Smith',
      },
      infraction: {
        infractionName: 'Skipping Class',
      },
      timeCreated: '2023-12-09T11:30:00Z', // Another sample date in ISO format
    },
    // Add more sample data as needed
  ];

  
const data2 = [
    {
      student: {
        firstName: 'David',
        lastName: 'Doe',
      },
      infraction: {
        infractionName: 'Late Arrival',
      },
      timeCreated: '2023-12-10T10:00:00Z', // This is a sample date in ISO format
    },
    {
      student: {
        firstName: 'Michael',
        lastName: 'Smith',
      },
      infraction: {
        infractionName: 'Skipping Class',
      },
      timeCreated: '2023-12-09T11:30:00Z', // Another sample date in ISO format
    },
    // Add more sample data as needed
  ];

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      padding: 20,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    header: {
      fontSize: 24,
      marginBottom: 20,
      textAlign: 'center',
      textDecoration: 'underline',
    },
    tableHeader: {
      flexDirection: 'row',
      borderBottomColor: '#000',
      borderBottomWidth: 1,
      alignItems: 'center',
    },
    columnHeader: {
      width: '33.33%',
      padding: 5,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    evenRow: {
      flexDirection: 'row',
      borderBottomColor: '#000',
      borderBottomWidth: 1,
      alignItems: 'center',
      paddingTop: 5,
      paddingBottom: 5,
      backgroundColor: '#f2f2f2',
    },
    oddRow: {
      flexDirection: 'row',
      borderBottomColor: '#000',
      borderBottomWidth: 1,
      alignItems: 'center',
      paddingTop: 5,
      paddingBottom: 5,
      backgroundColor: '#ffffff',
    },
    cell: {
      width: '33.33%',
      padding: 5,
      textAlign: 'center',
    },
  });



// Define the function outside the component
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

const PDFReport = () => (
    
    <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>ISS Report</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.columnHeader}>Name</Text>
          <Text style={styles.columnHeader}>Infraction</Text>
          <Text style={styles.columnHeader}>Past Due</Text>
        </View>
        {data.map((x, index) => (
          <View
            style={index % 2 === 0 ? styles.evenRow : styles.oddRow}
            key={index}
          >
            <View style={styles.cell}>
              <Text>{`${x.student.firstName} ${x.student.lastName}`}</Text>
            </View>
            <View style={styles.cell}>
              <Text>{x.infraction.infractionName}</Text>
            </View>
            <View style={styles.cell}>
              <Text>{calculateDaysSince(x.timeCreated)}</Text>
            </View>
          </View>
        ))}


        <View style={{ height: 30 }}></View> {/* This will create a space of 30 units between the two tables */}

        <View style={{ marginTop: 20 }}> {/* Add margin to the top of the second table */}

<Text style={styles.header}>Detention Report</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.columnHeader}>Name</Text>
          <Text style={styles.columnHeader}>Infraction</Text>
          <Text style={styles.columnHeader}>Past Due</Text>
        </View>
        {data2.map((x, index) => (
          <View
            style={index % 2 === 0 ? styles.evenRow : styles.oddRow}
            key={index}
          >
            <View style={styles.cell}>
              <Text>{`${x.student.firstName} ${x.student.lastName}`}</Text>
            </View>
            <View style={styles.cell}>
              <Text>{x.infraction.infractionName}</Text>
            </View>
            <View style={styles.cell}>
              <Text>{calculateDaysSince(x.timeCreated)}</Text>
            </View>
          </View>
        ))}
      </View>
      </View>
    </Page>
  </Document>

  
);

export default PDFReport;

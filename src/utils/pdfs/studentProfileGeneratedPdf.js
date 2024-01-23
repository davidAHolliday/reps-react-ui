import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PrintPDF = ({ studentData }) => {
  const pdfRef = useRef();

  const generatePDF = () => {
    const pdf = new jsPDF();

    // Add student details section
    pdf.text(`${studentData[0].student.firstName} ${studentData[0].student.lastName}`, 20, 20);
    pdf.text(`Email: ${studentData[0].student.studentEmail}`, 20, 30);
    pdf.text(`Phone: ${studentData[0].student.studentPhoneNumber}`, 20, 40);
    pdf.text(`Grade: ${studentData[0].student.grade}`, 20, 50);
    pdf.text(`Address: ${studentData[0].student.address}`, 20, 60);

    // Add punishment details table
    pdf.autoTable({
      startY: 70, // Adjust the Y-coordinate as needed
      head: [['Status', 'Description', 'Date', 'Infraction']],
      body: studentData.map((student) => [
        student.status,
        student.infraction.infractionDescription,
        student.timeCreated,
        student.infraction.infractionName,
      ]),
    });

    // Save or open the PDF
    pdf.save('student_report.pdf');
  };

  return (
    <div>
      {/* Your existing modal content */}
      {/* ... */}

      {/* Print button */}
      <button style={{ backgroundColor: "#CF9FFF" }} onClick={generatePDF}>
        Print
      </button>

      {/* Hidden div to store PDF content */}
      <div style={{ display: 'none' }}>
        <div ref={pdfRef}>
          {/* Add any additional content you want to include in the PDF */}
        </div>
      </div>
    </div>
  );
};

export default PrintPDF;

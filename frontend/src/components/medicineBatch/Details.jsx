import { useState, useEffect } from "react";
import axios from "../../config/axios";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

function MedicineBatchDetails() {
  const [batchDetails, setBatchDetails] = useState(null);
  const { batch_number } = useParams();
  useEffect(() => {
    fetchBatchDetails(batch_number);
  }, [batch_number]);

  const generatePdf = () => {
    const doc = new jsPDF();

    doc.text("Pharmacy Inventory Report", 10, 10);

    // Define table columns and rows
    const tableColumns = ["medicine_name", "batch_number", "expiration_date"];
    const tableRows = batchDetails
      ? [
          [
            batchDetails.medicine_name,
            batchDetails.batch_number,
            formatDate(batchDetails.expiration_date),
          ],
        ]
      : [];

    // Add table to PDF
    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: 20,
    });

    // Save the PDF
    doc.save("pharmacy-report.pdf");
  };

  const fetchBatchDetails = async (batch_number) => {
    try {
      const response = await axios.get(`/medicine-batches/${batch_number}`);
      setBatchDetails(response.data);
    } catch (error) {
      console.error("Error fetching batch details:", error);
    }
  };
  const formatDate = (date) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Medicine Batch Details</h1>
      {batchDetails && (
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-lg font-bold mb-2">
            Batch Number: {batchDetails.batch_number}
          </h2>
          <p className="mb-2">Medicine Name: {batchDetails.medicine_name}</p>
          <p className="mb-2">Quantity: {batchDetails.quantity}</p>
          <p className="mb-4">
            Received Date: {formatDate(batchDetails.date_received)}
          </p>
          <p className="mb-4">
            Expiry Date: {formatDate(batchDetails.expiration_date)}
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            onClick={generatePdf}
          >
            Generate PDF
          </button>
        </div>
      )}
    </div>
  );
}

export default MedicineBatchDetails;

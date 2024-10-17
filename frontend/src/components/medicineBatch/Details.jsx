import { useState, useEffect } from "react";
import axios from "../../config/axios";
import { useParams } from "react-router-dom";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

function MedicineBatchDetails() {
  const [batchDetails, setBatchDetails] = useState(null);
  const { batch_number } = useParams();
  useEffect(() => {
    fetchBatchDetails(batch_number);
  }, [batch_number]);

  // const generatePdf = () => {
  //   const doc = new jsPDF();

  //   doc.text("IMPORT MEDICINE FORM", 105, 10, { align: "center" });

  //   doc.text(
  //     "Importer Name: ......................................................................................",
  //     10,
  //     20
  //   );
  //   doc.text(
  //     "Received Name: ......................................................................................",
  //     10,
  //     30
  //   );
  //   const start = 50;

  //   doc.text("Batch ID: " + batchDetails.batch_number, 10, start);
  //   doc.text("Medicine Name: " + batchDetails.medicine_name, 10, start + 10);
  //   doc.text("Group Name: " + batchDetails.group_name, 10, start + 20);
  //   doc.text("Quantity: " + batchDetails.quantity, 10, start + 30);
  //   doc.text(
  //     "Received Date: " + formatDate(batchDetails.date_received),
  //     10,
  //     start + 40
  //   );
  //   doc.text(
  //     "Expiration Date: " + formatDate(batchDetails.expiration_date),
  //     10,
  //     start + 50
  //   );

  //   doc.text("Importer signature", 10, start + 70);
  //   doc.text("Receiver signature ", 130, start + 70);

  //   // // Add table to PDF
  //   // doc.autoTable({
  //   //   head: [tableColumns],
  //   //   body: tableRows,
  //   //   startY: 20,
  //   // });

  //   // Save the PDF
  //   doc.save("import-medicine.pdf");
  // };

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
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Chi tiết lô thuốc
      </h1>
      {batchDetails && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-2 text-gray-800">
            ID: {batchDetails.batch_number}
          </h2>
          <p className="mb-2 text-gray-600">
            Tên thuốc: {batchDetails.medicine_name}
          </p>
          <p className="mb-2 text-gray-600">
            Nhóm thuốc: {batchDetails.group_name}
          </p>
          <p className="mb-2 text-gray-600">
            Số lượng: {batchDetails.quantity} {batchDetails.medicine_unit}
          </p>
          <div className="h-[2px] my-4 bg-gray-600"></div>
          <p className="mb-2 text-gray-600">
            Giá nhập: {batchDetails.in_price} đồng
          </p>
          <p className="mb-2 text-gray-600">
            Giá bán: {batchDetails.out_price} đồng
          </p>
          <div className="h-[2px] my-4 bg-gray-600"></div>
          <p className="mb-2 text-gray-600">
            Ngày nhận: {formatDate(batchDetails.date_received)}
          </p>
          <p className="mb-2 text-gray-600">
            Ngày hết hạn: {formatDate(batchDetails.expiration_date)}
          </p>
          {/* <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            onClick={generatePdf}
          >
            In
          </button> */}
        </div>
      )}
    </div>
  );
}

export default MedicineBatchDetails;

import { useState, useEffect } from "react";
import axios from "../../config/axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

function Expired() {
  const [expiredData, setExpiredData] = useState([]);

  useEffect(() => {
    fetchExpiredData();
  }, []);

  const fetchExpiredData = () => {
    axios
      .get("/medicines/inventory/expired")
      .then((response) => {
        setExpiredData(response.data);
      })
      .catch((error) => console.error("Error fetching expired data:", error));
  };

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.addFont("arial-normal", "Arial", "normal");
    doc.setFont("Arial");

    doc.text("Expired Medicines", 10, 10);

    doc.autoTable({
      head: [["Medicine Name", "Quantity", "Expiration Date"]],
      body: expiredData.map((item) => [
        item.medicine_name,
        item.quantity,
        new Date(item.expiration_date).toLocaleDateString(),
      ]),
      startY: 20, // Start table from the 20th row
      theme: "grid", // Use grid theme
      styles: {
        font: "arial",
        fontSize: 10,
      },
    });

    doc.save("expired.pdf");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Thuốc hết hạn</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handlePrint}
      >
        In
      </button>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Tên thuốc</th>
            <th className="py-2 px-4 border-b text-center">Nhóm thuốc</th>
            <th className="py-2 px-4 border-b text-center">Số lượng</th>
            <th className="py-2 px-4 border-b text-center">Ngày hết hạn </th>
          </tr>
        </thead>
        <tbody>
          {expiredData.map((item, index) => (
            <tr key={index} className="">
              <td className="py-2 px-4 border-b text-center">
                {item.medicine_name}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {item.group_name}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {item.quantity}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {new Date(item.expiration_date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Expired;

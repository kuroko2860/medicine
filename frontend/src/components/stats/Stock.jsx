import { useState, useEffect } from "react";
import axios from "../../config/axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

function Stock() {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = () => {
    axios
      .get("/medicines/inventory/stock")
      .then((response) => {
        setStockData(response.data);
      })
      .catch((error) => console.error("Error fetching stock data:", error));
  };
  const handlePrint = () => {
    const doc = new jsPDF();

    doc.text("Stock Statistics", 10, 10);
    // Add table headers
    const tableHeaders = ["Medicine Name", "Group Name", "Quantity"];
    const tableData = stockData.map((item) => [
      item.medicine_name,
      item.group_name,
      item.total_quantity,
    ]);

    doc.autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: 20, // Start table from the 20th row
      theme: "grid", // Use grid theme
    });
    doc.save("stock.pdf");
  };

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-3xl font-bold mb-4">Thống kê tồn kho</h1>
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
          </tr>
        </thead>
        <tbody>
          {stockData.map((item, index) => (
            <tr key={index} className="">
              <td className="py-2 px-4 border-b text-center">
                {item.medicine_name}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {item.group_name}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {item.total_quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Stock;

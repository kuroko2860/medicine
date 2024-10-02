import { useState } from "react";
import axios from "../../config/axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

function ExpiredSoon() {
  const [expiredSoonData, setExpiredSoonData] = useState(null);
  const [month, setMonth] = useState(1);

  const fetchExpiredSoonData = () => {
    axios
      .get(`/medicines/inventory/expiring/${month}`)
      .then((response) => {
        setExpiredSoonData(response.data);
      })
      .catch((error) =>
        console.error("Error fetching expired soon data:", error)
      );
  };

  const handlePrint = () => {
    const doc = new jsPDF();

    doc.text("Expired Soon Medicines", 10, 10);

    doc.autoTable({
      head: [["Medicine Name", "Quantity", "Expiration Date"]],
      body: expiredSoonData.map((item) => [
        item.medicine_name,
        item.quantity,
        new Date(item.expiration_date).toLocaleDateString(),
      ]),
      startY: 20, // Start table from the 20th row
      theme: "grid", // Use grid theme
    });

    doc.save("expired-soon.pdf");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Thuốc sắp hết hạn</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handlePrint}
      >
        In
      </button>
      <div>
        <label className="block">
          Hết hạn sau số tháng
          <input
            type="number"
            onChange={(e) => setMonth(e.target.value)}
            value={month}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
          onClick={fetchExpiredSoonData}
        >
          Tìm kiếm
        </button>
      </div>

      {expiredSoonData && (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">Tên thuốc</th>
              <th className="py-2 px-4 border-b text-center">Nhóm thuốc</th>
              <th className="py-2 px-4 border-b text-center">Số lượng</th>
              <th className="py-2 px-4 border-b text-center">Ngày hết hạn</th>
            </tr>
          </thead>
          <tbody>
            {expiredSoonData.map((item, index) => (
              <tr key={index}>
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
      )}
    </div>
  );
}

export default ExpiredSoon;

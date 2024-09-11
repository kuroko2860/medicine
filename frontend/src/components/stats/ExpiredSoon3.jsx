import { useState, useEffect } from "react";
import axios from "../../config/axios";

function ExpiredSoon3() {
  const [expiredSoonData, setExpiredSoonData] = useState([]);

  useEffect(() => {
    fetchExpiredSoonData();
  }, []);

  const fetchExpiredSoonData = () => {
    axios
      .get("/medicines/inventory/expiring/3")
      .then((response) => {
        setExpiredSoonData(response.data);
      })
      .catch((error) =>
        console.error("Error fetching expired soon data:", error)
      );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Expired Soon Medicines</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Medicine Name</th>
            <th className="py-2 px-4 border-b text-center">Quantity</th>
            <th className="py-2 px-4 border-b text-center">Expiration Date</th>
          </tr>
        </thead>
        <tbody>
          {expiredSoonData.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b text-center">
                {item.medicine_name}
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

export default ExpiredSoon3;

import { useState, useEffect } from "react";
import axios from "../../config/axios";

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Expired Medicines</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Medicine Name</th>
            <th className="py-2 px-4 border-b text-center">Quantity</th>
            <th className="py-2 px-4 border-b text-center">Expiration Date</th>
          </tr>
        </thead>
        <tbody>
          {expiredData.map((item, index) => (
            <tr key={index} className="">
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

export default Expired;

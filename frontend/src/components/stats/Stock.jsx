import { useState, useEffect } from "react";
import axios from "../../config/axios";

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

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-3xl font-bold mb-4">Stock Statistics</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Medicine Name</th>
            <th className="py-2 px-4 border-b text-center">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((item, index) => (
            <tr key={index} className="">
              <td className="py-2 px-4 border-b text-center">
                {item.medicine_name}
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

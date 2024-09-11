import { useNavigate } from "react-router-dom";

function Stats() {
  const navigate = useNavigate();
  const handleStockClick = () => {
    // Logic to show stock of medicines
    // Import useNavigate hook at the top of the file

    // Navigate to the Stock page
    navigate("/stock");
  };

  const handleExpiredClick = () => {
    // Logic to show expired medicines
    // Navigate to the Expired page
    navigate("/expired");
  };

  const handleExpiringSoon1Click = () => {
    // Logic to show medicines expiring soon
    navigate("/expire-soon/1");
  };
  const handleExpiringSoon3Click = () => {
    // Logic to show medicines expiring soon
    navigate("/expire-soon/3");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Statistics</h1>
      <button
        onClick={handleStockClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4 "
      >
        View Stock
      </button>
      <button
        onClick={handleExpiredClick}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-4"
      >
        View Expired
      </button>
      <button
        onClick={handleExpiringSoon1Click}
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded m-4"
      >
        View Expiring Soon in 1 month
      </button>
      <button
        onClick={handleExpiringSoon3Click}
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded m-4"
      >
        View Expiring Soon in 3 month
      </button>
    </div>
  );
}

export default Stats;

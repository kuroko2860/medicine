import { useState, useEffect } from "react";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { Popup } from "reactjs-popup";
import AddMedicineBatchForm from "../components/medicineBatch/AddMedicineBatchForm";
import EditMedicineBatchForm from "../components/medicineBatch/EditMedicineBatchForm";

const MedicineBatchList = ({
  medicine_batches,
  onViewDetails,
  fetchMedicineBatches,
}) => {
  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="bg-gray-200 p-2 text-center">batch_number</th>
          <th className="bg-gray-200 p-2 text-center">medicine_name</th>
          <th className="bg-gray-200 p-2 text-center">quantity</th>
          <th className="bg-gray-200 p-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {medicine_batches.map((batch) => (
          <tr key={batch.id} className="bg-white shadow rounded p-4">
            <td className="p-2 text-center">{batch.batch_number}</td>
            <td className="p-2 text-center">{batch.medicine_name}</td>
            <td className="p-2 text-center">{batch.quantity}</td>
            <td className="p-2 text-center">
              <Popup
                trigger={
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                    Edit
                  </button>
                }
                modal
              >
                {(close) => (
                  <EditMedicineBatchForm
                    onClose={close}
                    batch={batch}
                    fetchMedicineBatches={fetchMedicineBatches}
                  />
                )}
              </Popup>

              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded m-2"
                onClick={() => onViewDetails(batch.batch_number)}
              >
                Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const MedicineBatch = () => {
  const [medicine_batches, setMedicineBatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMedicineBatches();
  }, []);

  const fetchMedicineBatches = () => {
    axios
      .get("/medicine-batches")
      .then((response) => setMedicineBatches(response.data))
      .catch((error) =>
        console.error("Error fetching medicine batches:", error)
      );
  };

  const handleViewDetails = (batchId) => {
    navigate(`${batchId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Medicine Batches</h1>
      <Popup
        trigger={
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add New Batch
          </button>
        }
        modal
      >
        {(close) => (
          <AddMedicineBatchForm
            onClose={close}
            fetchMedicineBatches={fetchMedicineBatches}
          />
        )}
      </Popup>

      <MedicineBatchList
        medicine_batches={medicine_batches}
        fetchMedicineBatches={fetchMedicineBatches}
        onViewDetails={handleViewDetails}
      />
    </div>
  );
};

export default MedicineBatch;

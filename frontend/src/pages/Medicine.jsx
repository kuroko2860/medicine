import { useState, useEffect } from "react";
import axios from "../config/axios";
import Popup from "reactjs-popup";
import AddMedicineForm from "../components/medicine/AddMedicineForm";
import EditMedicineForm from "../components/medicine/EditMedicineForm";

function Medicine() {
  const [medicines, setMedicines] = useState([]);
  const [medicine_groups, setMedicineGroups] = useState({});
  const [selected_group, setSelectedGroup] = useState(null);

  useEffect(() => {
    fetchMedicines();
    fetchMedicineGroups();
  }, []);

  const fetchMedicines = () => {
    axios
      .get("/medicines")
      .then((response) => setMedicines(response.data))
      .catch((error) => console.error("Error fetching medicines:", error));
  };

  const fetchMedicineGroups = () => {
    axios
      .get("/medicine-groups")
      .then((response) => {
        const groupsMap = response.data.reduce((map, group) => {
          map[group.id] = group.name;
          return map;
        }, {});
        setMedicineGroups(groupsMap);
      })
      .catch((error) =>
        console.error("Error fetching medicine groups:", error)
      );
  };

  const handleDelete = (medicine_id) => {
    axios
      .delete(`/medicines/${medicine_id}`)
      .then(() => {
        fetchMedicines();
      })
      .catch((error) => console.error("Error deleting medicine:", error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Medicines</h1>

      <Popup
        trigger={
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4">
            Add New Medicine
          </button>
        }
        modal
      >
        {(close) => (
          <AddMedicineForm
            onClose={close}
            medicine_groups={medicine_groups}
            fetchMedicines={fetchMedicines}
          />
        )}
      </Popup>

      <select
        value={selected_group}
        onChange={(e) => setSelectedGroup(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option value="">All Groups</option>
        {Object.entries(medicine_groups).map(([id, name]) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>

      <table className="min-w-full">
        <thead>
          <tr>
            <th className="bg-gray-200 p-2 text-center">Name</th>
            <th className="bg-gray-200 p-2 text-center">Group name</th>
            <th className="bg-gray-200 p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines
            .filter((medicine) =>
              selected_group ? medicine.group_id == selected_group : true
            )
            .map((medicine) => (
              <tr key={medicine.id} className="bg-gray-100">
                <td className="p-2 text-center">{medicine.name}</td>
                <td className="p-2 text-center">
                  {medicine_groups[medicine.group_id]}
                </td>
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
                      <EditMedicineForm
                        onClose={close}
                        medicine={medicine}
                        medicine_groups={medicine_groups}
                        fetchMedicines={fetchMedicines}
                      />
                    )}
                  </Popup>
                  <button
                    onClick={() => handleDelete(medicine.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded m-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Medicine;

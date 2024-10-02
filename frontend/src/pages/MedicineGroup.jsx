import { useState, useEffect } from "react";
import axios from "../config/axios";
import Popup from "reactjs-popup";
import AddMedicineGroupForm from "../components/medicineGroup/AddMedicineGroupForm";
import EditMedicineGroupForm from "../components/medicineGroup/EditMedicineGroupForm";
import { toast } from "react-toastify";

const MedicineGroupList = ({ medicineGroups, onDelete, fetchGroups }) => {
  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="bg-gray-200 p-2 text-center">Nhóm thuốc</th>
          <th className="bg-gray-200 p-2 text-center">Mô tả</th>
          <th className="bg-gray-200 p-2 text-center"></th>
        </tr>
      </thead>
      <tbody>
        {medicineGroups.map((group) => (
          <tr key={group.id} className="bg-gray-100">
            <td className="p-2 text-center">{group.name}</td>
            <td className="p-2 text-center">{group.description}</td>
            <td className="p-2 text-center">
              <Popup
                trigger={
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                    Sửa
                  </button>
                }
                modal
              >
                {(close) => (
                  <EditMedicineGroupForm
                    onClose={close}
                    group={group}
                    fetchGroups={fetchGroups}
                  />
                )}
              </Popup>

              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded m-2"
                onClick={() => onDelete(group.id)}
              >
                Xóa
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const MedicineGroup = () => {
  const [medicineGroups, setMedicineGroups] = useState([]);

  useEffect(() => {
    fetchMedicineGroups();
  }, []);

  const fetchMedicineGroups = () => {
    axios
      .get("/medicine-groups")
      .then((response) => setMedicineGroups(response.data))
      .catch((error) =>
        console.error("Error fetching medicine groups:", error)
      );
  };

  const handleDelete = (groupId) => {
    axios
      .delete(`/medicine-groups/${groupId}`)
      .then(() => {
        fetchMedicineGroups();
        toast.success("Medicine group deleted successfully");
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Nhóm thuốc</h1>
      <Popup
        trigger={
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            Tạo nhóm thuốc
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <AddMedicineGroupForm
            onClose={close}
            fetchGroups={fetchMedicineGroups}
          />
        )}
      </Popup>
      <MedicineGroupList
        medicineGroups={medicineGroups}
        onDelete={handleDelete}
        fetchGroups={fetchMedicineGroups}
      />
    </div>
  );
};

export default MedicineGroup;

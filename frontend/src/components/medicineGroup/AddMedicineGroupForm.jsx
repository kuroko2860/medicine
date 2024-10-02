import { useState } from "react";
import axios from "../../config/axios";
import { toast } from "react-toastify";

function AddMedicineGroupForm({ onClose, fetchGroups }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/medicine-groups", { name, description });
      onClose();
      fetchGroups();
      toast.success("Medicine group added successfully");
    } catch (error) {
      console.error("Error submitting medicine group:", error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white  p-12 shadow-2xl rounded"
    >
      <h2 className="text-2xl font-bold">Thêm nhóm thuốc mới</h2>
      <div className="flex flex-col">
        <label
          htmlFor="name"
          className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Tên
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="description"
          className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Mô tả
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        ></textarea>
      </div>

      <div className="flex justify-end space-x-2 mb-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Thêm
        </button>
      </div>
    </form>
  );
}

export default AddMedicineGroupForm;

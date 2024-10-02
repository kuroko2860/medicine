import { toast } from "react-toastify";
import axios from "../../config/axios";
import { useForm } from "react-hook-form";
const AddMedicineForm = ({ onClose, medicine_groups, fetchMedicines }) => {
  const { register, handleSubmit, errors = {} } = useForm();

  const onSubmit = async (data) => {
    try {
      const transformedData = {
        name: data.name,
        group_id: data.group_id,
        description: data.description,
      };
      await axios.post("/medicines", transformedData);
      onClose();
      fetchMedicines();
      toast.success("Medicine added successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white  p-12 shadow-2xl rounded"
    >
      <h2 className="text-2xl font-bold">Thêm thuốc mới</h2>
      <label className="block">
        Tên:
        <input
          type="text"
          {...register("name", { required: true })}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>
      <div className="text-red-500 text-sm">
        {errors.name && <span>Tên yêu cầu</span>}
      </div>
      <label className="block">
        Nhóm thuốc:
        <select
          {...register("group_id", { required: true })}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Chọn nhóm</option>
          {medicine_groups &&
            Object.entries(medicine_groups).map(([group_id, group_name]) => (
              <option key={group_id} value={group_id}>
                {group_name}
              </option>
            ))}
        </select>
      </label>
      <div className="text-red-500 text-sm">
        {errors.group_id && <span>Group is required</span>}
      </div>
      <label className="block">
        Mô tả:
        <textarea
          {...register("description", { required: true })}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>
      <div className="text-red-500 text-sm">
        {errors.description && <span>Description is required</span>}
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Thêm
      </button>
    </form>
  );
};

export default AddMedicineForm;

import axios from "../../config/axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function EditMedicineForm({
  onClose,
  medicine,
  medicine_groups,
  fetchMedicines,
}) {
  const {
    register,
    handleSubmit,
    errors = {},
  } = useForm({
    defaultValues: {
      name: medicine.name,
      group_id: medicine.group_id,
      description: medicine.description,
    },
  });

  const onSubmit = async (data) => {
    try {
      await axios.put(`/medicines/${medicine.id}`, data);
      onClose();
      fetchMedicines();
      toast.success("Medicine updated successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white  p-12 shadow-2xl rounded"
    >
      <h2 className="text-2xl font-bold">Sửa thuốc</h2>
      <label className="block">
        Tên
        <input
          type="text"
          {...register("name")}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.name && (
          <div className="text-red-500 text-sm">{errors.name.message}</div>
        )}
      </label>

      <label className="block">
        Nhóm thuốc:
        <select
          {...register("group_id", { required: true })}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Chọn nhóm</option>
          {medicine_groups &&
            Object.entries(medicine_groups).map(([group_id, group_name]) => (
              <option
                key={group_id}
                value={group_id}
                defaultValue={medicine.group_id == group_id}
              >
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
          {...register("description")}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.description && (
          <div className="text-red-500 text-sm">
            {errors.description.message}
          </div>
        )}
      </label>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Cập nhật
      </button>
    </form>
  );
}

export default EditMedicineForm;

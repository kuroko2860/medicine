import { useForm } from "react-hook-form";
import axiosInstance from "../../config/axios";
import { toast } from "react-toastify";

function EditMedicineGroupForm({ onClose, group, fetchGroups }) {
  const {
    register,
    handleSubmit,
    errors = {},
  } = useForm({
    defaultValues: {
      name: group.name,
      description: group.description,
    },
  });

  const onSubmit = (data) => {
    try {
      axiosInstance
        .put(`/medicine-groups/${group.id}`, data)
        .then((response) => {
          onClose();
          fetchGroups();
          console.log(response);
          toast.success("Medicine group updated successfully");
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white  p-12 shadow-2xl rounded"
    >
      <h2 className="text-2xl font-bold">Sửa nhóm thuốc</h2>
      <label className="block">
        Tên:
        <input
          type="text"
          {...register("name", { required: true })}
          defaultValue={group.name}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>
      <div className="text-red-500 text-sm">
        {errors.name && <span>Yêu cầu tên</span>}
      </div>
      <label className="block">
        Mô tả:
        <textarea
          {...register("description", { required: true })}
          defaultValue={group.description}
          className="block w-full min-h-[200px] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>
      <div className="text-red-500 text-sm">
        {errors.description && <span>Yêu cầu mô tả</span>}
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Gửi
      </button>
    </form>
  );
}

export default EditMedicineGroupForm;

import { useForm } from "react-hook-form";
import axiosInstance from "../../config/axios";

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
    axiosInstance.put(`/medicine-groups/${group.id}`, data).then((response) => {
      onClose();
      fetchGroups();
      console.log(response);
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white  p-12 shadow-2xl rounded"
    >
      <h2 className="text-2xl font-bold">Edit Medicine Group</h2>
      <label className="block">
        Name:
        <input
          type="text"
          {...register("name", { required: true })}
          defaultValue={group.name}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>
      <div className="text-red-500 text-sm">
        {errors.name && <span>Name is required</span>}
      </div>
      <label className="block">
        Description:
        <textarea
          {...register("description", { required: true })}
          defaultValue={group.description}
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
        Submit
      </button>
    </form>
  );
}

export default EditMedicineGroupForm;

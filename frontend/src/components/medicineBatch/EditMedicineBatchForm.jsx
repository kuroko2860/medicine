import { useForm } from "react-hook-form";
import axios from "../../config/axios";
import { toast } from "react-toastify";

function EditMedicineBatchForm({
  onClose,
  batch,
  medicineGroups,
  fetchMedicineBatches,
}) {
  const {
    register,
    handleSubmit,
    errors = {},
  } = useForm({
    defaultValues: {
      batch_number: batch.batch_number,
      medicine_name: batch.medicine_name,
      medicine_id: batch.medicine_id,
      group_name: batch.group_name,

      expiration_date: batch.expiration_date
        ? new Date(batch.expiration_date).toISOString().split("T")[0]
        : "",
      quantity: batch.quantity,
      date_received: batch.date_received
        ? new Date(batch.date_received).toISOString().split("T")[0]
        : "",
    },
  });

  const getDefaultValue = () => {
    for (const [key, value] of Object.entries(medicineGroups)) {
      if (value === batch.group_name) {
        return key;
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      await axios.put(`/medicine-batches/${batch.batch_number}`, data);
      onClose();
      fetchMedicineBatches();
      toast.success("Batch has been updated!");
    } catch (error) {
      console.error("Error submitting batch:", error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white  p-12 shadow-2xl rounded"
    >
      <h2 className="text-2xl font-bold">Sửa lô thuốc</h2>
      <label className="block">
        ID:
        <input
          type="text"
          {...register("batch_number", { required: true })}
          disabled
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.batch_number && (
          <div className="text-red-500 text-sm">Batch number is required</div>
        )}
      </label>

      <label className="block">
        Tên thuốc:
        <input
          type="text"
          {...register("medicine_name", { required: true })}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.medicine_name && (
          <div className="text-red-500 text-sm">Yêu cầu tên thuốc</div>
        )}
      </label>

      <label className="block">
        Nhóm thuốc:
        <select
          {...register("group_id", { required: true })}
          defaultValue={getDefaultValue()}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Chọn</option>
          {medicineGroups &&
            Object.entries(medicineGroups).map(([group_id, group_name]) => (
              <option
                key={group_id}
                value={group_id}
                // selected={batch.group_name == group_name}
                // defaultValue={batch.group_name == group_name}
              >
                {group_name}
              </option>
            ))}
        </select>
      </label>
      <div className="text-red-500 text-sm">
        {errors.group_id && <span>Yêu cầu chọn nhóm</span>}
      </div>

      <label className="block">
        Ngày hết hạn:
        <input
          type="date"
          {...register("expiration_date", { required: true })}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.expiration_date && (
          <div className="text-red-500 text-sm">Yêu cầu chọn ngày hết hạn</div>
        )}
      </label>

      <label className="block">
        Số lượng:
        <input
          type="number"
          {...register("quantity", { required: true })}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.quantity && (
          <div className="text-red-500 text-sm">Yêu cầu sô lượng</div>
        )}
      </label>

      <label className="block">
        Ngày nhận:
        <input
          type="date"
          {...register("date_received", { required: true })}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.date_received && (
          <div className="text-red-500 text-sm">Yêu cầu ngày nhận</div>
        )}
      </label>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Gửi
      </button>
    </form>
  );
}

export default EditMedicineBatchForm;

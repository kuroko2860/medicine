import { useForm } from "react-hook-form";
import axios from "../../config/axios";
import { toast } from "react-toastify";

function AddMedicineBatchForm({
  onClose,
  medicineGroups,
  fetchMedicineBatches,
}) {
  const { register, handleSubmit, errors = {} } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("/medicine-batches", data);
      onClose();
      fetchMedicineBatches();
      toast.success("Medicine batch added successfully");
    } catch (error) {
      console.error("Error submitting medicine batch:", error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white  p-12 shadow-2xl rounded"
    >
      <h2 className="text-2xl font-bold">Thêm lô thuốc</h2>
      <div className="flex flex-col">
        <label
          className="mb-2 text-sm font-medium text-gray-700"
          htmlFor="batch_number"
        >
          ID:
        </label>
        <input
          type="text"
          id="batch_number"
          {...register("batch_number", { required: true })}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.batch_number && <div className="text-red-500">ID yêu cầu</div>}
      </div>

      <div className="flex flex-col">
        <label
          className="mb-2 text-sm font-medium text-gray-700"
          htmlFor="medicine_name"
        >
          Tên thuốc:
        </label>
        <input
          type="text"
          id="medicine_name"
          {...register("medicine_name", { required: true })}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.medicine_name && (
          <div className="text-red-500">Yêu cầu tên</div>
        )}
      </div>

      <div className="flex flex-col">
        <label className="block">
          Nhóm thuốc:
          <select
            {...register("group_id", { required: true })}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Chọn nhóm</option>
            {medicineGroups &&
              Object.entries(medicineGroups).map(([group_id, group_name]) => (
                <option key={group_id} value={group_id}>
                  {group_name}
                </option>
              ))}
          </select>
        </label>
      </div>

      <div className="flex flex-col">
        <label
          className="mb-2 text-sm font-medium text-gray-700"
          htmlFor="date_received"
        >
          Ngày nhận:
        </label>
        <input
          type="date"
          id="date_received"
          {...register("date_received", { required: true })}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.date_received && (
          <div className="text-red-500">Yêu cầu ngày nhận</div>
        )}
      </div>

      <div className="flex flex-col">
        <label
          className="mb-2 text-sm font-medium text-gray-700"
          htmlFor="expiration_date"
        >
          Ngày hết hạn:
        </label>
        <input
          type="date"
          id="expiration_date"
          {...register("expiration_date", { required: true })}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.expiration_date && (
          <div className="text-red-500">Yêu cầu ngày hết hạn</div>
        )}
      </div>

      <div className="flex flex-col">
        <label
          className="mb-2 text-sm font-medium text-gray-700"
          htmlFor="quantity"
        >
          Số lượng:
        </label>
        <input
          type="number"
          id="quantity"
          {...register("quantity", { required: true })}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.quantity && (
          <div className="text-red-500">Yêu cầu số lượng</div>
        )}
      </div>
      {/* <div className="flex flex-col">
        <label
          className="mb-2 text-sm font-medium text-gray-700"
          htmlFor="medicine_unit"
        >
          Đơn vị thuốc:
        </label>
        <input
          type="text"
          id="medicine_unit"
          {...register("medicine_unit", { required: true })}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.medicine_unit && (
          <div className="text-red-500">Yêu cầu đơn vị thuốc</div>
        )}
      </div> */}

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Thêm
      </button>
    </form>
  );
}

export default AddMedicineBatchForm;

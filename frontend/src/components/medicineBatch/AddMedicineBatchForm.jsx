import { useForm } from "react-hook-form";
import axios from "../../config/axios";

function AddMedicineBatchForm({ onClose, fetchMedicineBatches }) {
  const { register, handleSubmit, errors = {} } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("/medicine-batches", data);
      onClose();
      fetchMedicineBatches();
    } catch (error) {
      console.error("Error submitting medicine batch:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white  p-12 shadow-2xl rounded"
    >
      <h2 className="text-2xl font-bold">Add New Medicine Batch</h2>
      <div className="flex flex-col">
        <label
          className="mb-2 text-sm font-medium text-gray-700"
          htmlFor="batch_number"
        >
          Batch number:
        </label>
        <input
          type="text"
          id="batch_number"
          {...register("batch_number", { required: true })}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.batch_number && (
          <div className="text-red-500">Batch number is required</div>
        )}
      </div>

      <div className="flex flex-col">
        <label
          className="mb-2 text-sm font-medium text-gray-700"
          htmlFor="medicine_name"
        >
          Medicine name:
        </label>
        <input
          type="text"
          id="medicine_name"
          {...register("medicine_name", { required: true })}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.medicine_name && (
          <div className="text-red-500">Medicine name is required</div>
        )}
      </div>

      <div className="flex flex-col">
        <label
          className="mb-2 text-sm font-medium text-gray-700"
          htmlFor="medicine_group"
        >
          Medicine group:
        </label>
        <input
          type="text"
          id="medicine_group"
          {...register("medicine_group", { required: true })}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.medicine_group && (
          <div className="text-red-500">Medicine group is required</div>
        )}
      </div>

      <div className="flex flex-col">
        <label
          className="mb-2 text-sm font-medium text-gray-700"
          htmlFor="date_received"
        >
          Date received:
        </label>
        <input
          type="date"
          id="date_received"
          {...register("date_received", { required: true })}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.date_received && (
          <div className="text-red-500">Date received is required</div>
        )}
      </div>

      <div className="flex flex-col">
        <label
          className="mb-2 text-sm font-medium text-gray-700"
          htmlFor="expiration_date"
        >
          Expiration date:
        </label>
        <input
          type="date"
          id="expiration_date"
          {...register("expiration_date", { required: true })}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.expiration_date && (
          <div className="text-red-500">Expiration date is required</div>
        )}
      </div>

      <div className="flex flex-col">
        <label
          className="mb-2 text-sm font-medium text-gray-700"
          htmlFor="quantity"
        >
          Quantity:
        </label>
        <input
          type="number"
          id="quantity"
          {...register("quantity", { required: true })}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.quantity && (
          <div className="text-red-500">Quantity is required</div>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add
      </button>
    </form>
  );
}

export default AddMedicineBatchForm;

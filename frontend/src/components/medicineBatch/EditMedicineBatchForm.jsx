import { useForm } from "react-hook-form";
import axios from "../../config/axios";
import { toast } from "react-toastify";

function EditMedicineBatchForm({ onClose, batch, fetchMedicineBatches }) {
  const {
    register,
    handleSubmit,
    errors = {},
  } = useForm({
    defaultValues: {
      batch_number: batch.batch_number,
      medicine_name: batch.medicine_name,
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

  const onSubmit = async (data) => {
    try {
      await axios.put(`/medicine-batches/${batch.batch_number}`, data);
      onClose();
      fetchMedicineBatches();
      toast.success("Batch has been updated!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error submitting batch:", error);
      toast.error("Batch already exists!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white  p-12 shadow-2xl rounded"
    >
      <h2 className="text-2xl font-bold">Edit Batch</h2>
      <label className="block">
        Batch Number:
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
        Medicine:
        <input
          type="text"
          {...register("medicine_name", { required: true })}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.medicine_name && (
          <div className="text-red-500 text-sm">Medicine is required</div>
        )}
      </label>

      <label className="block">
        Group:
        <input
          type="text"
          {...register("group_name", { required: true })}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.group_name && (
          <div className="text-red-500 text-sm">Group is required</div>
        )}
      </label>

      <label className="block">
        Expiration Date:
        <input
          type="date"
          {...register("expiration_date", { required: true })}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.expiration_date && (
          <div className="text-red-500 text-sm">
            Expiration date is required
          </div>
        )}
      </label>

      <label className="block">
        Quantity:
        <input
          type="number"
          {...register("quantity", { required: true })}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.quantity && (
          <div className="text-red-500 text-sm">Quantity is required</div>
        )}
      </label>

      <label className="block">
        Date Received:
        <input
          type="date"
          {...register("date_received", { required: true })}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.date_received && (
          <div className="text-red-500 text-sm">Date received is required</div>
        )}
      </label>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Update
      </button>
    </form>
  );
}

export default EditMedicineBatchForm;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { Transactions } from "../../types/transactions";

export function AddTransactions() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Transactions>();

  const paymentModeOptions = [
    { value: "cash", label: "Cash" },
    { value: "bank transfer", label: "Bank Transfer" },
    { value: "cheque", label: "Cheque" },
    { value: "other", label: "Other" },
  ];

  const onSubmit = async (data: Transactions) => {
    setIsSubmitting(true);
    setServerError(null);
    console.log(data);

    try {
      const response = await axios.post(
        "https://mjrk.vercel.app/api/createledger",
        data,
      );
      if (response.status !== 201) {
        throw new Error(`Server returned status ${response.status}`);
      }
      toast.success("Transaction added successfully!");
      navigate("/dashboard/transactions");
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        setServerError(
          error.response.data.error || "An unknown server error occurred.",
        );
      } else if (error.message) {
        setServerError(error.message);
      } else {
        setServerError("An unexpected error occurred.");
      }
      console.error("Error adding transaction:", error);
      toast.error("Failed to add transaction. See details below.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8"> {/* Increased max-width and padding */}
      <button
        onClick={() => navigate("/dashboard/transactions")}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8" {/* Increased margin */}
      >
        <ArrowLeft className="w-6 h-6 mr-3" /> {/* Increased icon size and margin */}
        Back to Transactions
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8"> {/* Enhanced container styling */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Add New Transaction
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8"> {/* Increased spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Increased gap */}

            {/* Customer Code */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Customer Code *
              </label>
              <input
                {...register("customerCode", { required: true })}
                type="text"
                className="w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.customerCode && (
                <p className="text-red-500">Customer code is required</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Description *
              </label>
              <textarea
                {...register("description", { required: true })}
                className="w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={2}
              />
              {errors.description && (
                <p className="text-red-500">Description is required</p>
              )}
            </div>

            {/* Transaction Type */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Transaction Type *
              </label>
              <select
                {...register("transactionType", { required: true })}
                className="w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
              {errors.transactionType && (
                <p className="text-red-500">Transaction type is required</p>
              )}
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Amount *
              </label>
              <input
                {...register("amount", { required: true, valueAsNumber: true })}
                type="number"
                className="w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.amount && (
                <p className="text-red-500">Amount is required</p>
              )}
            </div>

            {/* Payment Mode */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Payment Mode *
              </label>
              <select
                {...register("paymentMode", { required: true })}
                className="w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {paymentModeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.paymentMode && (
                <p className="text-red-500">Payment Mode is required</p>
              )}
            </div>

            {/* Reference Number */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Reference Number
              </label>
              <input
                {...register("referenceNumber")}
                type="text"
                className="w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {serverError && (
            <p className="mt-4 text-lg text-red-500">{serverError}</p>
          )}

          <div className="flex justify-end space-x-6 pt-8 border-t mt-8"> {/* Increased spacing */}
            <button
              type="button"
              onClick={() => reset()}
              className="px-6 py-3 text-lg border rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Adding..." : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

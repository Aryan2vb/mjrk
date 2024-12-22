import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Customer } from "../../types/customer";

export const CustomerDetailsForm = ({
  customer,
  onClose,
  navigate,
}: {
  customer: Customer;
  onClose: () => void;
  navigate: any;
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Customer>({
    defaultValues: {
      ...customer,
      // Format the date properly for the input field
      dateOfBirth: new Date(customer.dateOfBirth).toISOString().split("T")[0],
    },
  });

  const onSubmit = async (data: Customer) => {
    setIsSaving(true);
    try {
      const response = await axios.put(
        `https://mjrk.vercel.app/api/updatecustomer/${customer._id}`,
        data,
      );

      if (response.data) {
        toast.success("Customer updated successfully");
        onClose();
        window.location.reload(); // Refresh to show updated data
      }
    } catch (error: any) {
      console.error("Error updating customer:", error);
      toast.error(
        "Failed to update customer: " +
          (error.response?.data?.message || error.message),
      );
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    // Set initial values
    setValue("accountType", customer.accountType);
    setValue("gender", customer.gender);
    setValue("status", customer.status);
    setValue(
      "dateOfBirth",
      new Date(customer.dateOfBirth).toISOString().split("T")[0],
    );
  }, [customer, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Rest of your form JSX remains the same */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Customer Code - Disabled */}
        <div>
          <Input
            label="Customer Code"
            defaultValue={customer.customerCode}
            disabled
            className="bg-gray-100"
          />
        </div>

        <Input
          label="Full Name"
          {...register("fullName", { required: true })}
          error={errors.fullName?.message}
        />
        <Input label="Father's Name" {...register("fathersName")} />
        <Input label="Address" {...register("address")} />
        <Input label="Primary Contact" {...register("contactNumber")} />
        <Input label="Secondary Contact" {...register("contactNumber2")} />
        <Input label="Facebook ID" {...register("facebookId")} />
        <Input label="Caste" {...register("caste")} />
        <Input
          label="Opening Balance"
          type="number"
          {...register("openingAccountBalance")}
          disabled
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Account Type
          </label>
          <select
            {...register("accountType")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="Savings">Savings</option>
            <option value="Current">Current</option>
            <option value="Fixed Deposit">Fixed Deposit</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            {...register("gender")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <Input label="Date of Birth" type="date" {...register("dateOfBirth")} />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            {...register("status")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>

        <div className="col-span-full">
          <Input label="Note" {...register("note")} />
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

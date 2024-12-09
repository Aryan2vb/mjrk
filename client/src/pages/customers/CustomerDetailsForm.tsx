import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Customer } from "../../types/customer";
import { format } from "date-fns";

export const CustomerDetailsForm = ({
  customer,
  onClose,
  navigate,
}: {
  customer: Customer;
  onClose: () => void;
  navigate: useNavigate;
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm<Customer>({
    defaultValues: customer,
  });

  const onSubmit = async (data: Customer) => {
    setIsSaving(true);
    try {
      // Format the date using date-fns.  Customize the format string as needed.
      const formattedDateOfBirth = data.dateOfBirth
        ? format(new Date(data.dateOfBirth), "yyyy-MM-dd") // Adjust format as per your backend needs. 'yyyy-MM-dd' is a common and generally safe option.
        : null; // Handle cases where dateOfBirth might be null or undefined

      const updatedData = { ...data, dateOfBirth: formattedDateOfBirth };

      await axios.put(`/api/updatecustomer/${customer._id}`, updatedData);
      toast.success("Customer updated successfully!");
      onClose();
      navigate("/dashboard/customers");
    } catch (error: any) {
      //Improved error handling - check for specific error codes or messages for better feedback
      if (error.response) {
        if (error.response.status === 400) {
          //Example: Handle bad request errors
          toast.error(
            "Failed to update customer: " + error.response.data.message,
          ); // Access more specific error details from the response.
        } else {
          toast.error(
            `Failed to update customer: ${error.response.status} ${error.response.statusText}`,
          );
        }
      } else if (error.request) {
        //Request made but no response
        toast.error("Failed to update customer: Network error.");
      } else {
        //Something happened in setting up the request itself.
        toast.error("Failed to update customer: " + error.message);
      }
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    setValue("accountType", customer.accountType);
    setValue("gender", customer.gender);
    setValue("status", customer.status);
    //Set dateOfBirth, handling potential null values.
    setValue(
      "dateOfBirth",
      customer.dateOfBirth ? new Date(customer.dateOfBirth) : null,
    );
  }, [customer, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Input
          label="Full Name"
          {...register("fullName", { required: true })}
          error={errors.fullName?.message}
        />
        <Input label="Father's Name" {...register("fathersName")} />
        <Input
          label="Address"
          {...register("address")}
          as="textarea"
          rows={3}
        />
        <Input label="Primary Contact" {...register("contactNumber")} />
        <Input label="Secondary Contact" {...register("contactNumber2")} />
        <Input label="Facebook ID" {...register("facebookId")} />
        <Input label="Caste" {...register("caste")} />
        <Input
          label="Opening Balance"
          type="number"
          {...register("openingAccountBalance")}
        />
        <Input
          label="Account Type"
          {...register("accountType")}
          as="select"
          options={[
            { value: "Savings", label: "Savings" },
            { value: "Current", label: "Current" },
            { value: "Fixed Deposit", label: "Fixed Deposit" },
          ]}
        />
        <Input
          label="Gender"
          {...register("gender")}
          as="select"
          options={[
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
            { value: "Other", label: "Other" },
          ]}
        />
        <Input label="Date of Birth" type="date" {...register("dateOfBirth")} />
        <Input
          label="Status"
          {...register("status")}
          as="select"
          options={[
            { value: "Active", label: "Active" },
            { value: "Inactive", label: "Inactive" },
            { value: "Suspended", label: "Suspended" },
          ]}
        />
        <Input label="Note" {...register("note")} as="textarea" rows={3} />
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
        <button
          type="button"
          onClick={() => reset(customer)}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

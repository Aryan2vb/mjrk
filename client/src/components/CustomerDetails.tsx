import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, Save, Plus } from "lucide-react";
import { Customer } from "../types/customer";
import { Input } from "./ui/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

interface CustomerDetailsProps {
  customer: Customer;
  onClose: () => void;
}

export function CustomerDetails({ customer, onClose }: CustomerDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Customer>({
    defaultValues: {
      ...customer,
      dateOfBirth: new Date(customer.dateOfBirth).toISOString().split("T")[0],
    },
  });

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this customer?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await axios.delete(
        `https://mjrk.vercel.app/api/deletecustomer/${customer._id}`,
      );
      toast.success("Customer deleted successfully");
      navigate("/dashboard/customers");
    } catch (error) {
      toast.error("Failed to delete customer");
      console.error("Error deleting customer:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const onSubmit = async (data: Customer) => {
    setIsSaving(true);
    try {
      // Get only the changed fields by comparing with original customer data
      const changedFields: Partial<Customer> = {};

      Object.keys(data).forEach((key) => {
        // Skip these fields as they shouldn't be updated
        if (
          key === "_id" ||
          key === "customerCode" ||
          key === "dateOfRegistration"
        ) {
          return;
        }

        // Only include fields that have changed
        if (data[key] !== customer[key]) {
          changedFields[key] = data[key];
        }
      });

      // Don't make the API call if nothing has changed
      if (Object.keys(changedFields).length === 0) {
        toast.info("No changes to update");
        setIsEditing(false);
        return;
      }

      console.log("Updating fields:", changedFields); // Debug log

      const response = await axios.put(
        `https://mjrk.vercel.app/api/updatecustomer/${customer._id}`,
        changedFields,
      );

      if (response.data) {
        toast.success("Customer updated successfully");
        setIsEditing(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating customer:", error);
      toast.error("Failed to update customer");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section - Improved responsiveness */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center mb-6">
          <button
            onClick={onClose}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-lg font-medium">Back to Customers</span>
          </button>

          {/* Action Buttons - Stack on mobile, row on tablet/desktop */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {}}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-green-600 text-white rounded-lg
                hover:bg-green-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                text-sm font-medium"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Transaction
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-indigo-600 text-white rounded-lg
                hover:bg-indigo-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                text-sm font-medium"
            >
              <Save className="w-4 h-4 mr-2" />
              {isEditing ? "Cancel Edit" : "Edit Customer"}
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-red-600 text-white rounded-lg
                hover:bg-red-700 disabled:opacity-50 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                text-sm font-medium"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {isDeleting ? "Deleting..." : "Delete Customer"}
            </button>
          </div>
        </div>

        {/* Customer Details Card - Improved padding and spacing */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Customer Details
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                customer.status === "Active"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {customer.status}
            </span>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Form fields - Adjusted grid layout */}
                {/* Customer Code */}
                <div className="col-span-1">
                  <Input
                    label="Customer Code"
                    defaultValue={customer.customerCode}
                    disabled
                    className="bg-gray-100"
                  />
                </div>

                {/* Full Name */}
                <div className="col-span-1">
                  <Input
                    label="Full Name"
                    {...register("fullName")}
                    defaultValue={customer.fullName}
                    className="w-full"
                  />
                </div>

                {/* Father's Name */}
                <div>
                  <Input
                    label="Father's Name"
                    {...register("fathersName")}
                    defaultValue={customer.fathersName}
                  />
                </div>

                {/* Address */}
                <div>
                  <Input
                    label="Address"
                    {...register("address")}
                    defaultValue={customer.address}
                  />
                </div>

                {/* Primary Contact */}
                <div>
                  <Input
                    label="Primary Contact"
                    {...register("contactNumber")}
                    defaultValue={customer.contactNumber}
                  />
                </div>

                {/* Secondary Contact */}
                <div>
                  <Input
                    label="Secondary Contact"
                    {...register("contactNumber2")}
                    defaultValue={customer.contactNumber2}
                  />
                </div>

                {/* Facebook ID */}
                <div>
                  <Input
                    label="Facebook ID"
                    {...register("facebookId")}
                    defaultValue={customer.facebookId}
                  />
                </div>

                {/* Caste */}
                <div>
                  <Input
                    label="Caste"
                    {...register("caste")}
                    defaultValue={customer.caste}
                  />
                </div>

                {/* Opening Balance */}
                <div>
                  <Input
                    type="number"
                    label="Opening Balance"
                    {...register("openingAccountBalance")}
                    defaultValue={customer.openingAccountBalance}
                  />
                </div>

                {/* Account Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Type
                  </label>
                  <select
                    {...register("accountType")}
                    defaultValue={customer.accountType}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="Savings">Savings</option>
                    <option value="Current">Current</option>
                    <option value="Fixed Deposit">Fixed Deposit</option>
                  </select>
                </div>

                {/* Registration Date - Frozen */}
                <div>
                  <Input
                    type="date"
                    label="Date of Registration"
                    value={
                      new Date(customer.dateOfRegistration)
                        .toISOString()
                        .split("T")[0]
                    }
                    disabled
                    className="bg-gray-100"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    {...register("gender")}
                    defaultValue={customer.gender}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Date of Birth */}
                <div>
                  <Input
                    type="date"
                    label="Date of Birth"
                    {...register("dateOfBirth")}
                    defaultValue={
                      new Date(customer.dateOfBirth).toISOString().split("T")[0]
                    }
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    {...register("status")}
                    defaultValue={customer.status}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
                <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                  <Input
                    label="Note"
                    {...register("note")}
                    defaultValue={customer.note}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Form Buttons - Improved spacing */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 rounded-lg
                    text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 text-white rounded-lg
                    hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm font-medium"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          ) : (
            // View mode - Improved grid layout
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* DetailItems with responsive layout */}
              <DetailItem label="Customer ID" value={customer.customerCode} />
              <DetailItem label="Full Name" value={customer.fullName} />

              {/* Note */}
              <DetailItem label="Father's Name" value={customer.fathersName} />
              <DetailItem label="Address" value={customer.address} />
              <DetailItem
                label="Primary Contact"
                value={customer.contactNumber}
              />
              <DetailItem
                label="Secondary Contact"
                value={customer.contactNumber2 || "-"}
              />
              <DetailItem
                label="Facebook ID"
                value={customer.facebookId || "-"}
              />
              <DetailItem label="Caste" value={customer.caste || "-"} />
              <DetailItem
                label="Opening Balance"
                value={`₹${customer.openingAccountBalance.toLocaleString("en-IN")}`}
              />
              <DetailItem label="Account Type" value={customer.accountType} />
              <DetailItem
                label="Registration Date"
                value={new Date(customer.dateOfRegistration).toLocaleDateString(
                  "en-IN",
                  { dateStyle: "medium" },
                )}
              />
              <DetailItem label="Gender" value={customer.gender} />
              <DetailItem
                label="Date of Birth"
                value={new Date(customer.dateOfBirth).toLocaleDateString(
                  "en-IN",
                  { dateStyle: "medium" },
                )}
              />
              <DetailItem
                label="Created At"
                value={new Date(customer.createdAt).toLocaleDateString(
                  "en-IN",
                  { dateStyle: "medium" },
                )}
              />
              <DetailItem
                label="Last Updated"
                value={new Date(customer.updatedAt).toLocaleDateString(
                  "en-IN",
                  { dateStyle: "medium" },
                )}
              />
              {customer.note && (
                <div className="col-span-1 sm:col-span-2 lg:col-span-3 bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </h4>
                  <p className="text-sm text-gray-600">{customer.note}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Transaction History Section - Improved spacing */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
            Transaction History
          </h3>
          <div className="text-center text-gray-500 py-8">
            No transactions yet
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 transition-all hover:bg-gray-100">
      <dt className="text-sm font-medium text-gray-500 mb-1">{label}</dt>
      <dd className="text-sm sm:text-base text-gray-900">{value}</dd>
    </div>
  );
}

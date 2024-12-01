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
    defaultValues: customer,
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
    } finally {
      setIsDeleting(false);
    }
  };

  const onSubmit = async (data: Customer) => {
    setIsSaving(true);
    try {
      await axios.put("https://mjrk.vercel.app/api/updatecustomer", {
        ...data,
        _id: customer._id,
        contactNumber: data.contactNumber,
        contactNumber2: data.contactNumber2 || "",
        facebookId: data.facebookId || "",
        caste: data.caste || "",
        openingAccountBalance: Number(data.openingAccountBalance),
        status: data.status,
        accountType: data.accountType,
        note: data.note || "",
      });
      toast.success("Customer updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update customer");
      console.error("Error updating customer:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <button
            onClick={onClose}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Customers
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {}} // Add transaction handler
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700
                flex items-center transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Transaction
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700
                flex items-center transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Save className="w-4 h-4 mr-2" />
              {isEditing ? "Cancel Edit" : "Edit Customer"}
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700
                flex items-center disabled:opacity-50 transition-colors
                focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {isDeleting ? "Deleting..." : "Delete Customer"}
            </button>
          </div>
        </div>

        {/* Customer Details Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
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
              {/* Form fields go here - same as before but with updated styling */}
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailItem label="Customer ID" value={customer.customerCode} />
              <DetailItem label="Full Name" value={customer.fullName} />
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
                  {
                    dateStyle: "medium",
                  },
                )}
              />
              <DetailItem
                label="Last Updated"
                value={new Date(customer.updatedAt).toLocaleDateString(
                  "en-IN",
                  {
                    dateStyle: "medium",
                  },
                )}
              />
              {customer.note && (
                <div className="col-span-full bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </h4>
                  <p className="text-sm text-gray-600">{customer.note}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Transaction History Section */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
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
    <div className="bg-gray-50 rounded-lg p-4">
      <dt className="text-sm font-medium text-gray-500 mb-1">{label}</dt>
      <dd className="text-sm text-gray-900">{value}</dd>
    </div>
  );
}

import React, { useState } from "react";
import { ArrowLeft, Trash2, Save } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const CustomerDetailsHeader = ({
  onClose,
  isEditing,
  onEdit,
  onCancel,
  customer,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

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
      console.error("Error deleting customer:", error);
      toast.error("Failed to delete customer");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <button
        onClick={onClose}
        className="flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Customers
      </button>
      <div className="flex items-center space-x-4">
        <button
          onClick={isEditing ? onCancel : onEdit}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Save className="w-4 h-4 mr-2" />
          {isEditing ? "Cancel Edit" : "Edit Customer"}
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          {isDeleting ? "Deleting..." : "Delete Customer"}
        </button>
      </div>
    </div>
  );
};

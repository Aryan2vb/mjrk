import React from "react";
import { ArrowLeft, Trash2, Save } from "lucide-react";

export const CustomerDetailsHeader = ({
  onClose,
  isEditing,
  onEdit,
  onCancel,
  customer,
  onDelete,
}) => {
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
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Save className="w-4 h-4 mr-2" />
          {isEditing ? "Cancel Edit" : "Edit Customer"}
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Customer
        </button>
      </div>
    </div>
  );
};

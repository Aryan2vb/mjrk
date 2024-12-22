import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomerDetailsHeader } from "./CustomerDetailsHeader";
import { CustomerDetailsForm } from "./CustomerDetailsForm";
import { CustomerDetailsView } from "./CustomerDetailsView";
import { TransactionHistory } from "./TransactionHistory"; // Adjust path if needed

export const CustomerDetails = ({ customer, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`/api/deletecustomer/${customer._id}`);
        toast.success("Customer deleted successfully!");
        navigate("/dashboard/customers");
      } catch (error) {
        toast.error("Failed to delete customer: " + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <CustomerDetailsHeader
          onClose={onClose}
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onCancel={() => setIsEditing(false)}
          customer={customer}
          onDelete={handleDelete}
        />
        <div className="bg-white rounded-xl shadow-lg p-6">
          {isEditing ? (
            <CustomerDetailsForm
              customer={customer}
              onClose={() => setIsEditing(false)}
              navigate={navigate}
            />
          ) : (
            <CustomerDetailsView customer={customer} />
          )}
        </div>
        <TransactionHistory customerCode={customer.customerCode} />
      </div>
    </div>
  );
};

import { Eye, Phone, MapPin } from "lucide-react";
import { Customer } from "../../../types/customer";

interface CustomerCardsProps {
  customers: Customer[];
  onCustomerSelect: (customer: Customer) => void;
}

export function CustomerCards({
  customers,
  onCustomerSelect,
}: CustomerCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      {customers.map((customer) => (
        <div
          key={customer._id}
          className="bg-white rounded-lg border p-4 space-y-3"
        >
          <div className="flex justify-between">
            <div>
              <div className="font-medium">{customer.fullName}</div>
              <div className="text-sm text-gray-500">
                #{customer.customerCode}
              </div>
            </div>
            <button
              onClick={() => onCustomerSelect(customer)}
              className="text-indigo-600"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            {customer.contactNumber}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            {customer.address}
          </div>
          <div className="flex justify-between items-center pt-2 border-t">
            <div className="text-sm font-medium">
              ₹{customer.openingAccountBalance.toLocaleString("en-IN")}
            </div>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                customer.status === "Active"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {customer.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

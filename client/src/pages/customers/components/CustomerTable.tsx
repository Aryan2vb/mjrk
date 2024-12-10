import { Eye } from "lucide-react";
import { Customer } from "../../../types/customer";

interface CustomerTableProps {
  customers: Customer[];
  onCustomerSelect: (customer: Customer) => void;
}

export function CustomerTable({
  customers,
  onCustomerSelect,
}: CustomerTableProps) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Customer
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Contact & Address
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Balance
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Status
          </th>
          <th className="relative px-6 py-3">
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {customers.map((customer) => (
          <tr key={customer._id} className="hover:bg-gray-50">
            <td className="px-6 py-4">
              <div className="text-sm font-medium text-gray-900">
                {customer.fullName}
              </div>
              <div className="text-sm text-gray-500">
                #{customer.customerCode}
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="text-sm text-gray-900">
                {customer.contactNumber}
              </div>
              <div className="text-sm text-gray-500">{customer.address}</div>
            </td>
            <td className="px-6 py-4">
              <div className="text-sm font-medium text-gray-900">
                ₹{customer.openingAccountBalance.toLocaleString("en-IN")}
              </div>
            </td>
            <td className="px-6 py-4">
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  customer.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {customer.status}
              </span>
            </td>
            <td className="px-6 py-4 text-right">
              <button
                onClick={() => onCustomerSelect(customer)}
                className="text-indigo-600 hover:text-indigo-900"
              >
                <Eye className="w-5 h-5" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

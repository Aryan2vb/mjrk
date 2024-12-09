import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Plus, Search, Eye, Phone, MapPin, Badge } from "lucide-react";
import toast from "react-hot-toast";
import { Customer } from "../../types/customer";
import { CustomerDetails } from "./CustomerDetails";

export function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAttribute, setFilterAttribute] =
    useState<keyof Customer>("fullName");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://mjrk.vercel.app/api/getallcustomers",
      );
      setCustomers(response.data);
    } catch (error) {
      toast.error("Failed to fetch customers");
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const value = customer[filterAttribute]?.toString().toLowerCase() || "";
    return value.includes(searchTerm.toLowerCase());
  });

  if (selectedCustomer) {
    return (
      <CustomerDetails
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />
    );
  }

  return (
    <div className="space-y-6 p-4 max-w-[1400px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">Manage your customer accounts</p>
        </div>
        <button
          onClick={() => navigate("/dashboard/customers/add")}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700
            text-white text-sm font-medium rounded-md shadow-sm transition-colors
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            w-full sm:w-auto justify-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Customer
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <select
            value={filterAttribute}
            onChange={(e) =>
              setFilterAttribute(e.target.value as keyof Customer)
            }
            className="w-full lg:w-48 px-4 py-2 border border-gray-200 rounded-lg
              focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
              bg-white text-gray-700"
          >
            <option value="customerCode">Filter by Customer Code</option>
            <option value="fullName">Filter by Name</option>
            <option value="address">Filter by Address</option>
            <option value="caste">Filter by Caste</option>
            <option value="contactNumber">Filter by Phone Number</option>
            <option value="openingAccountBalance">Filter by Balance</option>
          </select>
        </div>
      </div>

      {/* Mobile View - Cards */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredCustomers.map((customer) => (
          <div
            key={customer._id}
            className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-gray-900">
                  {customer.fullName}
                </h3>
                <p className="text-sm text-gray-500">
                  #{customer.customerCode}
                </p>
              </div>
              <button
                onClick={() => setSelectedCustomer(customer)}
                className="p-2 text-indigo-600 hover:text-indigo-800 rounded-full
                  hover:bg-indigo-50 transition-colors"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                {customer.contactNumber}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                {customer.address}
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <div className="flex items-center text-sm">
                  <Badge className="w-4 h-4 mr-2 text-indigo-600" />
                  <span className="font-medium text-gray-900">
                    ₹{customer.openingAccountBalance}
                  </span>
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
          </div>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden md:block overflow-hidden bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  scope="col"
                  className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Contact & Address
                </th>
                <th
                  scope="col"
                  className="hidden xl:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Details
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Balance
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {customer.fullName}
                        </div>
                        <div className="text-sm text-gray-500">
                          #{customer.customerCode}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {customer.contactNumber}
                    </div>
                    <div className="text-sm text-gray-500">
                      {customer.address}
                    </div>
                  </td>
                  <td className="hidden xl:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>Caste: {customer.caste || "-"}</div>
                    <div>Type: {customer.accountType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="font-medium text-gray-900">
                      ₹{customer.openingAccountBalance}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setSelectedCustomer(customer)}
                      className="text-indigo-600 hover:text-indigo-900 p-2 hover:bg-indigo-50 rounded-full transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No customers found</p>
        </div>
      )}
    </div>
  );
}

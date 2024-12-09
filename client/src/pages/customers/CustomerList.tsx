import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Plus,
  Search,
  Eye,
  Phone,
  MapPin,
  Badge,
  ChevronUp,
  ChevronDown,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { Customer } from "../../types/customer";
import { CustomerDetails } from "./CustomerDetails";

type SortField = keyof Customer;
type SortOrder = "asc" | "desc";
type Filter = {
  field: keyof Customer;
  value: string;
};

export function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAttribute, setFilterAttribute] =
    useState<keyof Customer>("fullName");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [filters, setFilters] = useState<Filter[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    field: SortField;
    order: SortOrder;
  }>({ field: "fullName", order: "asc" });

  const navigate = useNavigate();

  const sortOptions = [
    { value: "fullName", label: "Name" },
    { value: "customerCode", label: "Customer Code" },
    { value: "openingAccountBalance", label: "Balance" },
    { value: "status", label: "Status" },
    { value: "address", label: "Village" },
    { value: "caste", label: "Caste" },
  ];

  const filterOptions = [
    { value: "caste", label: "Caste" },
    { value: "address", label: "Village" },
    { value: "accountType", label: "Account Type" },
    { value: "status", label: "Status" },
    { value: "openingAccountBalance", label: "Balance" },
  ];

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

  const handleAddFilter = () => {
    setFilters([...filters, { field: "caste", value: "" }]);
  };

  const handleRemoveFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const handleFilterChange = (
    index: number,
    field: keyof Customer,
    value: string,
  ) => {
    const newFilters = [...filters];
    newFilters[index] = { field, value };
    setFilters(newFilters);
  };

  const handleSort = (field: SortField) => {
    setSortConfig({
      field,
      order:
        sortConfig.field === field && sortConfig.order === "asc"
          ? "desc"
          : "asc",
    });
  };

  const filteredAndSortedCustomers = customers
    .filter((customer) => {
      if (searchTerm) {
        const value = customer[filterAttribute]?.toString().toLowerCase() || "";
        if (!value.includes(searchTerm.toLowerCase())) return false;
      }

      return filters.every((filter) => {
        const value = customer[filter.field]?.toString().toLowerCase() || "";
        return value.includes(filter.value.toLowerCase());
      });
    })
    .sort((a, b) => {
      const aValue = a[sortConfig.field]?.toString().toLowerCase() || "";
      const bValue = b[sortConfig.field]?.toString().toLowerCase() || "";

      if (sortConfig.field === "openingAccountBalance") {
        return sortConfig.order === "asc"
          ? Number(a[sortConfig.field]) - Number(b[sortConfig.field])
          : Number(b[sortConfig.field]) - Number(a[sortConfig.field]);
      }

      return sortConfig.order === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
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
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Customers
            </h1>
            <p className="text-gray-600 mt-1">
              {filteredAndSortedCustomers.length} total customers found
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard/customers/add")}
            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700
              text-white font-medium rounded-lg shadow-sm transition-all
              focus:ring-4 focus:ring-indigo-100 w-full lg:w-auto justify-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Customer
          </button>
        </div>
      </div>

      {/* Search, Sort, and Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        {/* Search */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>
          <select
            value={filterAttribute}
            onChange={(e) =>
              setFilterAttribute(e.target.value as keyof Customer)
            }
            className="w-full lg:w-48 px-4 py-3 border border-gray-200 rounded-lg
              focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
              bg-white text-gray-700 text-sm"
          >
            <option value="fullName">Search by Name</option>
            <option value="fathersName">Search by Father Name</option>
            <option value="customerCode">Search by Code</option>
            <option value="contactNumber">Search by Phone</option>
            <option value="address">Search by Village</option>
            <option value="caste">Search by Caste</option>
            <option value="aadharNumber">Search by Aadhar Number</option>
          </select>
        </div>

        {/* Sort Controls */}
        <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700 mr-2">
            Sort by:
          </span>
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSort(option.value as SortField)}
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm
                transition-all ${
                  sortConfig.field === option.value
                    ? "bg-indigo-100 text-indigo-700 ring-2 ring-indigo-200"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
            >
              {option.label}
              {sortConfig.field === option.value && (
                <span className="ml-1">
                  {sortConfig.order === "asc" ? "↑" : "↓"}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Active Filters */}
        <div className="space-y-3">
          {filters.map((filter, index) => (
            <div
              key={index}
              className="flex flex-wrap items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <select
                value={filter.field}
                onChange={(e) =>
                  handleFilterChange(
                    index,
                    e.target.value as keyof Customer,
                    filter.value,
                  )
                }
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm min-w-[150px]"
              >
                {filterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={filter.value}
                onChange={(e) =>
                  handleFilterChange(index, filter.field, e.target.value)
                }
                placeholder={`Filter by ${filter.field}...`}
                className="flex-1 min-w-[200px] px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
              <button
                onClick={() => handleRemoveFilter(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}

          <button
            onClick={handleAddFilter}
            className="inline-flex items-center px-4 py-2 text-sm text-indigo-600
                        hover:text-indigo-700 font-medium hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Mobile View - Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 md:hidden">
          {filteredAndSortedCustomers.map((customer) => (
            <div
              key={customer._id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
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
                  className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
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
                      ₹{customer.openingAccountBalance.toLocaleString("en-IN")}
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact & Address
                  </th>
                  <th className="hidden xl:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Balance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedCustomers.map((customer) => (
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
                        ₹
                        {customer.openingAccountBalance.toLocaleString("en-IN")}
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
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredAndSortedCustomers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <div className="text-gray-400 mb-2">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No customers found
          </h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

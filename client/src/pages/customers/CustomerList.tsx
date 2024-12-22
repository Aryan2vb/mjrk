import { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Customer } from "../../types/customer";
import { CustomerDetails } from "./CustomerDetails";
import { CustomerHeader } from "./components/CustomerHeader";
import { CustomerSearch } from "./components/CustomerSearch";
import { CustomerFilters } from "./components/CustomerFilters";
import { CustomerTable } from "./components/CustomerTable";
import { CustomerCards } from "./components/CustomerCards";
import { Pagination } from "./components/CustomerListPagination";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { EmptyState } from "./components/EmptyState";
import { useFilteredAndSortedCustomers } from "./hooks/useFilteredAndSortedCustomers";
import { usePagination } from "./hooks/usePagination";
import { CustomerSort } from "./components/CustomerSort";
import { ExportData } from "../../components/ExportData";
import { Plus, ChevronDown } from "lucide-react";

type SortField = keyof Customer;
type SortOrder = "asc" | "desc";
type Filter = {
  field: keyof Customer;
  value: string;
};

export function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        "https://mjrk.vercel.app/api/getallcustomers",
      );
      setCustomers(response.data);
    } catch (error: any) {
      setError(error.message);
      toast.error("Failed to fetch customers: " + error.message);
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedCustomers = useFilteredAndSortedCustomers(
    customers,
    searchTerm,
    filterAttribute,
    filters,
    sortConfig,
  );

  const handleFilterChange = (
    index: number,
    field: keyof Customer,
    value: string,
  ) => {
    const newFilters = [...filters];
    newFilters[index] = { field, value };
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const { currentItems, totalPages, indexOfFirstItem, indexOfLastItem } =
    usePagination(filteredAndSortedCustomers, currentPage, itemsPerPage);

  const customerHeaders = [
    { key: "customerCode", label: "Customer Code" },
    { key: "fullName", label: "Full Name" },
    { key: "fathersName", label: "Father's Name" },
    { key: "address", label: "Address" },
    { key: "contactNumber", label: "Primary Contact" },
    { key: "contactNumber2", label: "Secondary Contact" },
    { key: "facebookId", label: "Facebook ID" },
    { key: "caste", label: "Caste" },
    { key: "openingAccountBalance", label: "Opening Balance (₹)" },
    { key: "status", label: "Status" },
    { key: "accountType", label: "Account Type" },
    { key: "dateOfRegistration", label: "Registration Date" },
    { key: "gender", label: "Gender" },
    { key: "dateOfBirth", label: "Date of Birth" },
  ];

  const formatCustomerData = (customer: Customer) => [
    customer.customerCode,
    customer.fullName,
    customer.fathersName,
    customer.address,
    customer.contactNumber,
    customer.contactNumber2 || "-",
    customer.facebookId || "-",
    customer.caste || "-",
    customer.openingAccountBalance.toLocaleString("en-IN"),
    customer.status,
    customer.accountType,
    new Date(customer.dateOfRegistration).toLocaleDateString("en-IN"),
    customer.gender,
    new Date(customer.dateOfBirth).toLocaleDateString("en-IN"),
  ];

  const handleSort = (field: SortField) => {
    setSortConfig({
      field,
      order:
        sortConfig.field === field && sortConfig.order === "asc"
          ? "desc"
          : "asc",
    });
  };

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
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="p-4 max-w-[1400px] mx-auto">
        {" "}
        <CustomerHeader
          totalCustomers={filteredAndSortedCustomers.length}
          ExportComponent={
            <ExportData
              data={filteredAndSortedCustomers}
              headers={customerHeaders}
              filename="customers"
              formatData={formatCustomerData}
            />
          }
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <CustomerSearch
          searchTerm={searchTerm}
          filterAttribute={filterAttribute}
          onSearchChange={setSearchTerm}
          onFilterAttributeChange={setFilterAttribute}
        />
        <CustomerSort sortConfig={sortConfig} onSort={handleSort} />
        <CustomerFilters
          filters={filters}
          onAddFilter={() =>
            setFilters([...filters, { field: "caste", value: "" }])
          }
          onRemoveFilter={(index) =>
            setFilters(filters.filter((_, i) => i !== index))
          }
          onFilterChange={handleFilterChange}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="hidden md:block">
          <CustomerTable
            customers={currentItems}
            onCustomerSelect={setSelectedCustomer}
          />
        </div>
        <div className="md:hidden">
          <CustomerCards
            customers={currentItems}
            onCustomerSelect={setSelectedCustomer}
          />
        </div>

        {!loading && filteredAndSortedCustomers.length > 0 && (
          <div className="border-t border-gray-200">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
              totalItems={filteredAndSortedCustomers.length}
              indexOfFirstItem={indexOfFirstItem}
              indexOfLastItem={indexOfLastItem}
            />
          </div>
        )}
      </div>

      {loading && <LoadingSpinner />}
      {!loading && filteredAndSortedCustomers.length === 0 && <EmptyState />}
    </div>
  );
}

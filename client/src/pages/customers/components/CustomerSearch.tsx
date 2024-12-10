import { Search } from "lucide-react";
import { Customer } from "../../../types/customer";

interface CustomerSearchProps {
  searchTerm: string;
  filterAttribute: keyof Customer;
  onSearchChange: (value: string) => void;
  onFilterAttributeChange: (value: keyof Customer) => void;
}

export function CustomerSearch({
  searchTerm,
  filterAttribute,
  onSearchChange,
  onFilterAttributeChange,
}: CustomerSearchProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg
            focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        />
      </div>
      <select
        value={filterAttribute}
        onChange={(e) =>
          onFilterAttributeChange(e.target.value as keyof Customer)
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
      </select>
    </div>
  );
}

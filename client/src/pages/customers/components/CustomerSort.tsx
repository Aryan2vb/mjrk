import { ChevronUp, ChevronDown } from "lucide-react";

type SortField = keyof Customer;
type SortOrder = "asc" | "desc";

interface CustomerSortProps {
  sortConfig: {
    field: SortField;
    order: SortOrder;
  };
  onSort: (field: SortField) => void;
}

export const sortOptions = [
  { value: "fullName", label: "Name" },
  { value: "customerCode", label: "Customer Code" },
  { value: "openingAccountBalance", label: "Balance" },
  { value: "status", label: "Status" },
  { value: "address", label: "Village" },
  { value: "caste", label: "Caste" },
];

export function CustomerSort({ sortConfig, onSort }: CustomerSortProps) {
  return (
    <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
      <div className="w-full flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Sort by:</span>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onSort(option.value as SortField)}
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
                  {sortConfig.order === "asc" ? (
                    <ChevronUp className="w-4 h-4 inline" />
                  ) : (
                    <ChevronDown className="w-4 h-4 inline" />
                  )}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

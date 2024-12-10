import { Plus, X } from "lucide-react";
import { Customer } from "../../../types/customer";

interface Filter {
  field: keyof Customer;
  value: string;
}

interface CustomerFiltersProps {
  filters: Filter[];
  onAddFilter: () => void;
  onRemoveFilter: (index: number) => void;
  onFilterChange: (index: number, field: keyof Customer, value: string) => void;
}

export function CustomerFilters({
  filters,
  onAddFilter,
  onRemoveFilter,
  onFilterChange,
}: CustomerFiltersProps) {
  const filterOptions = [
    { value: "caste", label: "Caste" },
    { value: "address", label: "Village" },
    { value: "accountType", label: "Account Type" },
    { value: "status", label: "Status" },
    { value: "openingAccountBalance", label: "Balance" },
  ];

  return (
    <div className="space-y-3">
      {filters.map((filter, index) => (
        <div
          key={index}
          className="flex flex-wrap items-center gap-3 p-3 bg-gray-50 rounded-lg"
        >
          <select
            value={filter.field}
            onChange={(e) =>
              onFilterChange(
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
              onFilterChange(index, filter.field, e.target.value)
            }
            placeholder={`Filter by ${filter.field}...`}
            className="flex-1 min-w-[200px] px-3 py-2 border border-gray-200 rounded-lg text-sm"
          />
          <button
            onClick={() => onRemoveFilter(index)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ))}
      <button
        onClick={onAddFilter}
        className="inline-flex items-center px-4 py-2 text-sm text-indigo-600
          hover:text-indigo-700 font-medium hover:bg-indigo-50 rounded-lg"
      >
        <Plus className="w-4 h-4 mr-1" />
        Add Filter
      </button>
    </div>
  );
}

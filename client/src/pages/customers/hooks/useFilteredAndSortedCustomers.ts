import { Customer } from "../../../types/customer";

type SortField = keyof Customer;
type SortOrder = "asc" | "desc";

interface Filter {
  field: keyof Customer;
  value: string;
}

export function useFilteredAndSortedCustomers(
  customers: Customer[],
  searchTerm: string,
  filterAttribute: keyof Customer,
  filters: Filter[],
  sortConfig: { field: SortField; order: SortOrder },
) {
  return customers
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
}

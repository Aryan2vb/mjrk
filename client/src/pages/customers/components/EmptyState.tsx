import { Search } from "lucide-react";

export function EmptyState() {
  return (
    <div className="text-center py-12 bg-white rounded-xl shadow-sm">
      <Search className="w-12 h-12 mx-auto text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        No customers found
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Try adjusting your search or filters
      </p>
    </div>
  );
}

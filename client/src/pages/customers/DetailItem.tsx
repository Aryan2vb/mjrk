export const DetailItem = ({ label, value }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 transition-all hover:bg-gray-100">
      <dt className="text-sm font-medium text-gray-500 mb-1">{label}</dt>
      <dd className="text-sm sm:text-base text-gray-900">{value}</dd>
    </div>
  );
};

import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { Customer } from "../../types/customer";

interface CustomerDetailsModalProps {
  customer: Customer;
  onClose: () => void;
}

export default function CustomerDetailsModal({
  customer,
  onClose,
}: CustomerDetailsModalProps) {
  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-xl shadow-lg">
          <div className="flex justify-between items-center p-6 border-b">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              Customer Details
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <DetailItem label="ID" value={customer._id} />
              <DetailItem label="CustomerCode" value={customer.customerCode} />
              <DetailItem label="Full Name" value={customer.fullName} />
              <DetailItem label="Father's Name" value={customer.fatherName} />
              <DetailItem label="Address" value={customer.address} />
              <DetailItem
                label="Primary Contact"
                value={customer.contactPrimary}
              />
              <DetailItem
                label="Secondary Contact"
                value={customer.contactSecondary || "-"}
              />
              <DetailItem
                label="Facebook ID"
                value={customer.facebookId || "-"}
              />
              <DetailItem label="Caste" value={customer.caste || "-"} />
              <DetailItem
                label="Opening Balance"
                value={`₹${customer.openingAccountBalance}`}
              />
              <DetailItem label="Status" value={customer.status} />
              <DetailItem label="Account Type" value={customer.accountType} />
              <DetailItem
                label="Registration Date"
                value={new Date(customer.registrationDate).toLocaleDateString()}
              />
              <DetailItem label="Gender" value={customer.gender} />
              <DetailItem
                label="Date of Birth"
                value={new Date(customer.dateOfBirth).toLocaleDateString()}
              />
            </div>

            {customer.note && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700">Note</h4>
                <p className="mt-1 text-sm text-gray-600">{customer.note}</p>
              </div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
    </div>
  );
}

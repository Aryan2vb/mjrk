import React from "react";
import { DetailItem } from "./DetailItem";
import { Customer } from "../../types/customer";

export const CustomerDetailsView = ({ customer }: { customer: Customer }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DetailItem label="Customer ID" value={customer.customerCode} />
      <DetailItem label="Full Name" value={customer.fullName} />
      <DetailItem label="Father's Name" value={customer.fathersName} />
      <DetailItem label="Address" value={customer.address} />
      <DetailItem label="Primary Contact" value={customer.contactNumber} />
      <DetailItem
        label="Secondary Contact"
        value={customer.contactNumber2 || "-"}
      />
      <DetailItem label="Facebook ID" value={customer.facebookId || "-"} />
      <DetailItem label="Caste" value={customer.caste || "-"} />
      <DetailItem
        label="Opening Balance"
        value={`₹${customer.openingAccountBalance.toLocaleString("en-IN")}`}
      />
      <DetailItem label="Account Type" value={customer.accountType} />
      <DetailItem
        label="Registration Date"
        value={new Date(customer.dateOfRegistration).toLocaleDateString(
          "en-IN",
          {
            dateStyle: "medium",
          },
        )}
      />
      <DetailItem label="Gender" value={customer.gender} />
      <DetailItem
        label="Date of Birth"
        value={new Date(customer.dateOfBirth).toLocaleDateString("en-IN", {
          dateStyle: "medium",
        })}
      />
      <DetailItem
        label="Created At"
        value={new Date(customer.createdAt).toLocaleDateString("en-IN", {
          dateStyle: "medium",
        })}
      />
      <DetailItem
        label="Last Updated"
        value={new Date(customer.updatedAt).toLocaleDateString("en-IN", {
          dateStyle: "medium",
        })}
      />
      {customer.note && <DetailItem label="Note" value={customer.note} />}
    </div>
  );
};

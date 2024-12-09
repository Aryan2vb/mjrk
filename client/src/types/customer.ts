export interface Customer {
  _id: string;
  customerCode: string;
  fullName: string;
  fathersName: string;
  address: string;
  aadharNumber: string;
  contactNumber: string;
  contactNumber2?: string;
  facebookId?: string;
  caste?: string;
  openingAccountBalance: number;
  status: "Active" | "Inactive";
  accountType: "Savings" | "Checking";
  dateOfRegistration: string;
  gender: "Male" | "Female" | "Other";
  dateOfBirth: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

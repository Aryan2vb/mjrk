export interface Customer {
  id: string;
  customerCode: string;
  fullName: string;
  fatherName: string;
  address: string;
  contactPrimary: string;
  contactSecondary?: string;
  facebookId?: string;
  caste?: string;
  openingBalance: number;
  status: 'active' | 'inactive';
  accountType: 'savings' | 'checking';
  registrationDate: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  note?: string;
  profilePicture?: string;
}
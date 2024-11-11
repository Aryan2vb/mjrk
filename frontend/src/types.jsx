export interface CustomerFormData {
    customerCode: string;
    fullName: string;
    fatherName: string;
    address: string;
    contactNumber: string;
    secondaryContactNumber?: string;
    facebookId?: string;
    caste?: string;
    openingBalance: number;
    status: 'active' | 'inactive' | 'suspended';
    accountType: 'savings' | 'checking' | 'business';
    registrationDate: string;
    gender: 'male' | 'female' | 'other';
    dateOfBirth: string;
    note?: string;
    lastPurchaseDate?: string;
    profilePicture?: FileList;
}

export interface Customer {
    _id: string;
    customerCode: string;
    fullName: string;
    fathersName: string;
    address: string;
    contactNumber: string;
    openingAccountBalance: number;
    gender: string;
    dateOfBirth: string;
    dateOfRegistration: string;
    createdAt: string;
    updatedAt: string;
}
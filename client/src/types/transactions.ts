export interface Transactions {
  _id: string;
  customerCode: string;
  description: string;
  transactionType: "credit" | "debit";
  amount: number;
  balanceAfterTransaction: number;
  paymentMode: string;
  referenceNumber: string;
  transactionDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface LedgerEntry {
  _id: string;
  customerCode: string;
  description: string;
  transactionType: "credit" | "debit";
  amount: number;
  balanceAfterTransaction: number;
  paymentMode: string;
  referenceNumber?: string;
  createdAt: string;
}

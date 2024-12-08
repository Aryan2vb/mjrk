export interface Transactions {
  customerCode: string;
  description: string;
  transactionType: "credit" | "debit";
  amount: number;
  paymentMode: string;
  referenceNumber?: string;
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

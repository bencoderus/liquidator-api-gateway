export type WalletData = {
  walletCode: string;
  currentBalance: string;
  bookBalance: string;
  initialBalance: string;
  isFrozen: boolean;
};

export type WalletTransferRequest = {
  senderCode: string;
  recipientEmail: string;
  walletType: string;
  amount: string;
  otp: string | number;
};

export type WalletTransferResponse = {
  walletType: string;
  amount: string;
};

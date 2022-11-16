export type SendOtpRequest = {
  clientCode: string;
  clientEmail: string;
  purpose: string;
};

export type SendOtpResponse = {
  purpose: string;
  otp: string;
  expiresAt: string;
};

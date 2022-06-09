export type Order = {
  code: string;
  reference: string;
  type: string;
  side: string;
  status: string;
  quantity: string;
  currency: string;
  ticker: string;
  price: string;
  executedAt: Date | null;
  createdAt: Date;
};

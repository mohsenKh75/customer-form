export interface Loan {
  id: string;
  name: string;
  amount: number;
  percentageRate?: number;
  interestRate?: number;
  penaltyRate: number;
  repaymentType: Array<{ name: string; value: string }>;
}

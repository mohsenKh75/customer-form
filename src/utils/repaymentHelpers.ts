import { getCurrency } from "./getCurrency";

export function getDelayFine({
  repaymentAmount,
  delayFinePercentage,
}: {
  repaymentAmount: string | number;
  delayFinePercentage: string | number;
}) {
  return getCurrency(Number(repaymentAmount) * Number(delayFinePercentage));
}
export function getMonthlyRepayment({
  repaymentAmount,
  profitPercentage,
  monthsAmount,
}: {
  repaymentAmount: string | number;
  profitPercentage?: string | number;
  monthsAmount: string | number;
}) {
  console.log(
    getCurrency(
      Number(repaymentAmount) +
        (Number(repaymentAmount) * Number(profitPercentage)) /
          Number(monthsAmount)
    )
  );

  return getCurrency(
    (Number(repaymentAmount) +
      Number(repaymentAmount) * Number(profitPercentage)) /
      Number(monthsAmount)
  );
}

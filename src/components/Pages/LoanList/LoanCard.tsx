import { Button } from "@/core/Button";
import { getCurrency } from "@/utils/getCurrency";
import { toFa } from "@/utils/toFa";
import toast from "react-hot-toast";

interface Props {
  id: string;
  name: string;
  amount: number;
  interestRate?: number;
  penaltyRate: number;
  repaymentType: Array<{ name: string; value: number }>;
}

export function LoanCard({
  name,
  amount,
  interestRate,
  penaltyRate,
  repaymentType,
}: Props) {
  function handleBtn() {
    toast.error(":(");
  }
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <div style={{ minHeight: "200px" }}>
        <h2 className="text-xl font-bold text-blue-600 mb-4">{name}</h2>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">میزان وام:</span> {getCurrency(amount)}
        </p>
        {interestRate && (
          <p className="text-gray-700 mb-2">
            <span className="font-medium">نرخ سود:</span> {toFa(interestRate)}%
          </p>
        )}
        <p className="text-gray-700 mb-2">
          <span className="font-medium">نرخ جریمه:</span> {toFa(penaltyRate)}%
        </p>
        <p className="text-gray-700 mb-4">
          <span className="font-medium">نوع بازپرداخت:</span>
          {repaymentType.map((type) => (
            <span
              key={type.value}
              className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded ml-2"
            >
              {toFa(type.name)}
            </span>
          ))}
        </p>
      </div>
      <Button onClick={handleBtn}>انتخاب وام</Button>
    </div>
  );
}

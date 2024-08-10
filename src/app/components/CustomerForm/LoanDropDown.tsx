import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FIELDS } from "./fieldsConstants";
import clsx from "clsx";
import { toFa } from "@/utils/toFa";
import { toCurrency } from "@/utils/toCurrency";
import { getCurrency } from "@/utils/getCurrency";
import { getDelayFine, getMonthlyRepayment } from "@/utils/repaymentHelpers";

interface Loan {
  id: string;
  name: string;
  amount: number;
  percentageRate?: number;
  interestRate?: number;
  penaltyRate: number;
  repaymentType: Array<{ name: string; value: string }>;
}

interface LoanDropdownProps {
  loans: Array<Loan>;
}

export function LoanDropdown({ loans }: LoanDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [selectedRepaymentType, setSelectRepaymentType] = useState<{
    name: string;
    value: string;
  } | null>(null);

  const { register, setValue } = useFormContext();

  const toggleDropdown = () => setIsOpen(!isOpen);

  function handleLoanSelect(loan: Loan) {
    setSelectRepaymentType(null);
    setSelectedLoan(loan);
    setValue(FIELDS.loanId, loan.id);
    setIsOpen(false);
  }
  function handleRepaymentTypeSelect(repaymentType: {
    name: string;
    value: string;
  }) {
    setSelectRepaymentType(repaymentType);
    setValue(FIELDS.repaymentType, repaymentType?.value);
  }

  const selectedLoanDetail = loans.find((loan) => loan.id === selectedLoan?.id);
  console.log({
    selectedLoanDetail: selectedLoanDetail,
  });

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="انتخاب کنید"
        value={selectedLoan ? selectedLoan.name : ""}
        readOnly
        onClick={toggleDropdown}
        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:outline-blue-300 sm:text-sm cursor-pointer"
      />
      <input
        type="hidden"
        {...register(FIELDS.loanId, { required: "Loan selection is required" })}
      />

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {loans.map((loan) => (
            <li
              key={loan.id}
              onClick={() => handleLoanSelect(loan)}
              className="p-2 hover:bg-blue-300 hover:text-white cursor-pointer"
            >
              {loan.name}
            </li>
          ))}
        </ul>
      )}
      {selectedLoan && selectedLoan.id === selectedLoanDetail?.id && (
        <div className="mt-1 flex flex-col gap-4">
          <div className="flex gap-2">
            <p className="text-blue-500">میزان اعتبار:</p>
            <p className="text-blue-500">{getCurrency(selectedLoan.amount)}</p>
          </div>
          <p className="text-gray-700 text-sm">انتخاب نوع باز پرداخت:</p>
          {selectedLoan.repaymentType.map((type) => (
            <div
              className={clsx(
                "w-1/2 border rounded-md mb-1 px-2 flex justify-center self-center tex-sm bg-blue-200 p-2 text-gray-700",
                {
                  "border-gray-200": selectedRepaymentType?.name !== type.name,
                  "border-blue-400": selectedRepaymentType?.name === type.name,
                }
              )}
              onClick={() => handleRepaymentTypeSelect(type)}
              key={type.name}
            >
              <p className="tex-sm">{type.name}</p>
              <input
                value={type.name}
                className="hidden"
                {...register(FIELDS.repaymentType, {
                  required: "این فیلد الزامی است!",
                })}
              />
            </div>
          ))}

          {selectedRepaymentType && (
            <div>
              <p className="text-sm text-red-400">جریمه دیرکرد:</p>
              <p className="text-sm text-gray-700">
                {getDelayFine({
                  repaymentAmount: selectedLoanDetail.amount,
                  delayFinePercentage: selectedLoanDetail.penaltyRate,
                })}
              </p>
              <p className="text-sm text-red-400"> مبلغ قسط:</p>
              <p className="text-sm text-gray-700">
                {getMonthlyRepayment({
                  repaymentAmount: selectedLoanDetail.amount,
                  profitPercentage: selectedLoanDetail.interestRate,
                  monthsAmount: selectedRepaymentType?.value,
                })}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

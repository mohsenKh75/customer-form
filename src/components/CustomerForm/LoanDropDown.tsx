import { useState } from "react";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";

import { FIELDS } from "./fieldsConstants";
import { getCurrency } from "@/utils/getCurrency";
import { getDelayFine, getMonthlyRepayment } from "@/utils/repaymentHelpers";
import { Dropdown } from "@/core/Dropdown";
import { Loan } from "@/types/loan";

interface LoanDropdownProps {
  loans: Array<Loan>;
}

export function LoanDropdown({ loans }: LoanDropdownProps) {
  const { setValue } = useFormContext();
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [selectedRepaymentType, setSelectedRepaymentType] = useState<{
    name: string;
    value: string;
  } | null>(null);

  const handleLoanSelect = (loan: { id: string; label: string }) => {
    const selected = loans.find((l) => l.id === loan.id) || null;
    setSelectedLoan(selected);
    setSelectedRepaymentType(null);
    setValue(FIELDS.loanId, loan.id);
  };

  const handleRepaymentTypeSelect = (repaymentType: {
    name: string;
    value: string;
  }) => {
    setSelectedRepaymentType(repaymentType);
    setValue(FIELDS.repaymentType, repaymentType.value);
  };

  const loanOptions = loans.map((loan) => ({
    id: loan.id,
    label: loan.name,
  }));

  return (
    <div>
      <Dropdown
        label="انتخاب نوع وام دریافتی"
        name={FIELDS.loanId}
        options={loanOptions}
        onSelect={handleLoanSelect}
        placeholder="انتخاب کنید"
      />
      {selectedLoan && (
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex gap-2">
            <p className="text-blue-500">میزان اعتبار:</p>
            <p className="text-blue-500">{getCurrency(selectedLoan.amount)}</p>
          </div>
          <p className="text-gray-700 text-sm">انتخاب نوع باز پرداخت:</p>
          {selectedLoan.repaymentType.map((type) => (
            <div
              key={type.name}
              className={clsx(
                "w-1/2 border rounded-md mb-1 px-2 flex justify-center tex-sm bg-blue-200 p-2 text-gray-700 cursor-pointer",
                {
                  "border-gray-200": selectedRepaymentType?.name !== type.name,
                  "border-blue-400": selectedRepaymentType?.name === type.name,
                }
              )}
              onClick={() => handleRepaymentTypeSelect(type)}
            >
              <p className="tex-sm">{type.name}</p>
            </div>
          ))}
          {selectedRepaymentType && (
            <div>
              <p className="text-sm text-red-400">جریمه دیرکرد:</p>
              <p className="text-sm text-gray-700">
                {getDelayFine({
                  repaymentAmount: selectedLoan.amount,
                  delayFinePercentage: selectedLoan.penaltyRate,
                })}
              </p>
              <p className="text-sm text-red-400"> مبلغ قسط:</p>
              <p className="text-sm text-gray-700">
                {getMonthlyRepayment({
                  repaymentAmount: selectedLoan.amount,
                  profitPercentage: selectedLoan.interestRate,
                  monthsAmount: selectedRepaymentType.value,
                })}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

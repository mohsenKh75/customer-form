"use client";
import { Layout } from "@/components/Layout";
import data from "../../mock/data.json";
import { LoanCard } from "@/components/Pages/LoanList/LoanCard";
import { FormData } from "@/components/CustomerForm";
import { isServerSide } from "@/utils/checkers";

export default function LoanList() {
  const selectedLoansStr = !isServerSide && localStorage?.getItem("form-data");
  const selectedLoans: Array<FormData> = selectedLoansStr
    ? JSON.parse(selectedLoansStr)
    : null;

  const selectedLoanIds = selectedLoans?.map?.((loan) => {
    return loan.loanId;
  });
  const filteredLoans = data.data.filter?.((loan) =>
    selectedLoanIds?.includes?.(loan.id)
  );

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLoans?.map((loan) => (
          <LoanCard key={loan.id} {...loan} />
        ))}
      </div>
    </Layout>
  );
}

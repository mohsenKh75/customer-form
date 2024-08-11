"use client";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { LoanDropdown } from "./LoanDropDown";
import { FIELDS } from "./fieldsConstants";
import { SolarDate } from "../SolarDate";
import { Input } from "@/core/Input";
import { Button } from "@/core/Button";
import toast from "react-hot-toast";
import { mockReq } from "@/mock/mockReq";
import { useRouter } from "next/navigation";

interface IFormInput {
  name: string;
  lastName: string;
  idNumber: string;
  birthDate: string;
  phoneNumber: string;
  bankAccountNumber: string;
  loanId: string;
  repaymentType: { name: string; value: string };
}

export function CustomerForm({ data }: { data: any }) {
  const methods = useForm<IFormInput>();
  const router = useRouter();

  function onSubmit(data: IFormInput) {
    console.log(data);
    mockReq(data).then(() =>
      toast.success(`${data.name}عزیز، اطلاعات شما با موفقیت ثبت شد`, {
        duration: 2000,
      })
    );
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-1/2 mx-auto bg-white p-6 rounded-md shadow-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">
          فرم انتخاب تسهیلات
        </h2>
        <Input
          label="نام"
          name={FIELDS.name}
          placeholder="احمد"
          requiredMessage="این فیلد الزامی است!"
        />
        <Input
          label="نام خانوادگی"
          name={FIELDS.lastName}
          placeholder="ذوقی"
          requiredMessage="این فیلد الزامی است!"
        />
        <Input
          label="ش شناسنامه"
          name={FIELDS.lastName}
          placeholder="وارد کنید"
          requiredMessage="این فیلد الزامی است!"
        />
        <SolarDate fieldName={FIELDS.birthDate} label="ت تولد" />
        <Input
          label="ش تلفن"
          name={FIELDS.phoneNumber}
          placeholder="وارد کنید"
          requiredMessage="این فیلد الزامی است!"
        />
        <Input
          label="ش حساب"
          name={FIELDS.bankAccountNumber}
          placeholder="وارد کنید"
          requiredMessage="این فیلد الزامی است!"
        />
        <LoanDropdown loans={data.data} />
        <Button type="submit">تایید</Button>
      </form>
    </FormProvider>
  );
}

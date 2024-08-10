"use client";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { LoanDropdown } from "./LoanDropDown";
import { FIELDS } from "./fieldsConstants";
import { SolarDate } from "../SolarDate";

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

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-1/2 mx-auto bg-white p-6 rounded-md shadow-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">
          فرم انتخاب تسهیلات
        </h2>

        <div>
          <label className="px-2 text-sm font-medium text-gray-700">نام</label>
          <input
            {...methods.register(FIELDS.name, {
              required: "این فیلد الزامی است!",
            })}
            placeholder="احمد"
            className="mt-1 p-2 w-full rounded-md shadow-sm focus:outline-blue-300 sm:text-sm"
          />
          {methods.formState.errors.name && (
            <p className="text-red-600 text-sm">
              {methods.formState.errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="px-2 text-sm font-medium text-gray-700">
            نام خانوادگی
          </label>
          <input
            {...methods.register(FIELDS.lastName, {
              required: "این فیلد الزامی است!",
            })}
            placeholder="ذوقی"
            className="mt-1 p-2 w-full rounded-md shadow-sm focus:outline-blue-300 sm:text-sm"
          />
          {methods.formState.errors.lastName && (
            <p className="text-red-600 text-sm">
              {methods.formState.errors.lastName.message}
            </p>
          )}
        </div>

        <div>
          <label className="px-2 text-sm font-medium text-gray-700">
            ش شناسنامه
          </label>
          <input
            {...methods.register(FIELDS.idNumber, {
              required: "این فیلد الزامی است!",
            })}
            placeholder="وارد کنید"
            className="mt-1 p-2 w-full rounded-md shadow-sm focus:outline-blue-300 sm:text-sm"
          />
          {methods.formState.errors.idNumber && (
            <p className="text-red-600 text-sm">
              {methods.formState.errors.idNumber.message}
            </p>
          )}
        </div>

        <div>
          <label className="px-2 text-sm font-medium text-gray-700">
            ت تولد
          </label>
          <SolarDate fieldName={FIELDS.birthDate} />
          {methods.formState.errors.birthDate && (
            <p className="text-red-600 text-sm">
              {methods.formState.errors.birthDate.message}
            </p>
          )}
        </div>

        <div>
          <label className="px-2 text-sm font-medium text-gray-700">
            ش تلفن
          </label>
          <input
            {...methods.register(FIELDS.phoneNumber, {
              required: "این فیلد الزامی است!",
            })}
            placeholder="وارد کنید"
            className="mt-1 p-2 w-full rounded-md shadow-sm focus:outline-blue-300 sm:text-sm"
          />
          {methods.formState.errors.phoneNumber && (
            <p className="text-red-600 text-sm">
              {methods.formState.errors.phoneNumber.message}
            </p>
          )}
        </div>

        <div>
          <label className="px-2 text-sm font-medium text-gray-700">
            ش حساب
          </label>
          <input
            {...methods.register(FIELDS.bankAccountNumber, {
              required: "این فیلد الزامی است!",
            })}
            placeholder="وارد کنید"
            className="mt-1 p-2 w-full rounded-md shadow-sm focus:outline-blue-300 sm:text-sm"
          />
          {methods.formState.errors.bankAccountNumber && (
            <p className="text-red-600 text-sm">
              {methods.formState.errors.bankAccountNumber.message}
            </p>
          )}
        </div>

        <div>
          <label className="px-2 text-sm font-medium text-gray-700">
            انتخاب نوع وام دریافتی
          </label>
          <LoanDropdown loans={data.data} />
          {methods.formState.errors.loanId && (
            <p className="text-red-600 text-sm">
              {methods.formState.errors.loanId.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
        >
          تایید
        </button>
      </form>
    </FormProvider>
  );
}

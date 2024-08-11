import { useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker2";
import moment, { Moment } from "moment-jalaali";

import { useEffect, useState } from "react";

interface Props {
  fieldName: string;
  label: string;
}

export function SolarDate({ fieldName, label }: Props) {
  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext();
  const [selectedDate, setSelectedDate] = useState<Moment | undefined>();

  useEffect(() => {
    register(fieldName, { required: "این فیلد الزامی است!" });
  }, [register, fieldName]);

  const handleDateChange = (date: moment.Moment) => {
    if (date) {
      setSelectedDate(date);
      setValue(fieldName, date.format("jYYYY/jMM/jDD"));
    }
  };
  return (
    <div>
      <label className="px-2 text-sm font-medium text-gray-700">{label}</label>
      <DatePicker
        className="w-full border-b border-gray-100 focus:outline-blue-400 text-gray-700"
        isGregorian={false}
        inputJalaaliFormat="jYYYY/jMM/jDD"
        value={selectedDate}
        onChange={handleDateChange}
        timePicker={false}
      />
      {errors[fieldName] && (
        <p className="text-red-600 text-sm">
          {errors[fieldName]?.message as string}
        </p>
      )}
    </div>
  );
}

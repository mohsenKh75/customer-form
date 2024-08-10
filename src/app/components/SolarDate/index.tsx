import { useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker2";
import moment, { Moment } from "moment-jalaali";

import { useEffect, useState } from "react";

interface Props {
  fieldName: string;
}

export function SolarDate({ fieldName }: Props) {
  const { setValue, register } = useFormContext();
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
    <DatePicker
      className="w-full border-b border-gray-100 focus:outline-blue-400 text-gray-700"
      isGregorian={false}
      inputJalaaliFormat="jYYYY/jMM/jDD"
      value={selectedDate}
      onChange={handleDateChange}
      timePicker={false}
    />
  );
}

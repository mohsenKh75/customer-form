import { useFormContext } from "react-hook-form";
import clsx from "clsx";

interface Props {
  label: string;
  name: string;
  value?: string;
  requiredMessage?: string;
  placeholder?: string;
  onClick?: () => void;
  readOnly?: boolean;
  className?: string;
}

export function Input({
  label,
  name,
  placeholder,
  requiredMessage,
  onClick,
  readOnly = false,
  value,
  className,
}: Props) {
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <div>
      <label className="px-2 text-sm font-medium text-gray-700">{label}</label>
      <input
        readOnly={readOnly}
        value={value}
        onClick={onClick}
        {...register(name, {
          required: requiredMessage,
        })}
        placeholder={placeholder}
        className={clsx(
          className,
          "mt-1 p-2 w-full rounded-md shadow-sm focus:outline-blue-300 sm:text-sm"
        )}
      />
      {errors[name] && (
        <p className="text-red-600 text-sm">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}

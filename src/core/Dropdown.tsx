import { useState } from "react";
import { Input } from "./Input";

interface DropdownProps {
  label: string;
  name: string;
  options: Array<{ id: string; label: string }>;
  onSelect: (selected: { id: string; label: string }) => void;
  placeholder?: string;
  error?: string;
}

export function Dropdown({
  label,
  name,
  options,
  onSelect,
  placeholder = "انتخاب کنید",
  error,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<{
    id: string;
    label: string;
  } | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: { id: string; label: string }) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Input
        label={label}
        name={name}
        placeholder={placeholder}
        value={selectedOption?.label}
        readOnly
        onClick={toggleDropdown}
        className="cursor-pointer"
        requiredMessage="این فیلد الزامی است!"
      />
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleSelect(option)}
              className="p-2 hover:bg-blue-300 hover:text-white cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

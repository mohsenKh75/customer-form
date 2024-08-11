import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function Button({
  type = "button",
  onClick,
  children,
  className,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "w-full bg-blue-600 text-white p-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none",
        className,
        { "opacity-50 cursor-not-allowed": disabled }
      )}
    >
      {children}
    </button>
  );
}

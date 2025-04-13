import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  defaultValue: string | number;
  required?: boolean;
  min?: string;
  max?: string;
}


export function Input({
  id,
  type,
  placeholder,
  defaultValue,
  autoComplete,
  min,
  max,
  required,
  ...rest 
}: InputProps) {
  return (
    <input
      id={id || ""}
      type={type || "text"}
      placeholder={placeholder || ""}
      autoComplete={autoComplete || "off"}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      defaultValue={defaultValue || ""}
      min={min || ""}
      max={max || ""}
      required={required || false}
      {...rest}
    />
  );
}

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
  id = "",
  type = "text",
  placeholder = "",
  defaultValue = "",
  autoComplete = "off",
  min = "",
  max = "",
  required = false,
  ...rest // permite a propagação de outras props
}: InputProps) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder || ""}
      autoComplete={autoComplete}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      defaultValue={defaultValue || ""}
      min={min}
      max={max}
      required={required}
      {...rest} // espalha as props adicionais, como "name"
    />
  );
}

import * as React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode ;
  htmlFor?: string;
}

export function Label({ children, htmlFor, ...rest }: LabelProps) {
  return (
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor={htmlFor || ""}
      {...rest}
    >
      {children || ""}
    </label>
  );
}

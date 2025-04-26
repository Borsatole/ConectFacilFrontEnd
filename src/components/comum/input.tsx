import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  defaultValue?: string | number;
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
      className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600`}
      defaultValue={defaultValue || ""}
      min={min || ""}
      max={max || ""}
      required={required || false}
      {...rest}
    />
  );
}



export function InputTelefone({ ...rest }: any) {
  return (
    <PhoneInput
      country={'br'} // país padrão
      inputStyle={{
        width: '100%',
        height: '2.4rem',
        padding: '0.5rem 3rem',
        border: '1px solid #D1D5DB', // gray-300
        borderRadius: '0.375rem', // rounded-md
        outlineOffset: '-2px',
        outline: '2px solid transparent',
      }}
      {...rest}
    />
  );
}






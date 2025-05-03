import React, { useRef } from 'react';

interface OtpInputProps {
  value: string;
  onChange: (val: string) => void;
}

export function OtpInput({ value, onChange }: OtpInputProps) {
  const inputs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/\D/, ''); // remove não numéricos
    if (!val) return;

    const newValue = value.substring(0, index) + val + value.substring(index + 1);
    onChange(newValue);

    if (index < 3) inputs[index + 1].current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputs[index - 1].current?.focus();
    }
  };

  return (
    <div className="flex gap-2">
      {[0, 1, 2, 3].map((i) => (
        <input
          key={i}
          ref={inputs[i]}
          type="text"
          maxLength={1}
          value={value[i] || ''}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
        />
      ))}
    </div>
  );
} 
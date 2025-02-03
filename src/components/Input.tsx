import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  className,
  ...props
}) => {
  return (
    <input
      className={`${className} bg-input-base border-input-border focus:ring-input-border-focus placeholder-input-placeholder w-full rounded-md border px-4 py-2 focus:border-transparent focus:ring-2 focus:outline-none`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default Input;

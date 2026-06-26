import { inputStyles } from './input.styles';

interface InputProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date';
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string[];
  disabled?: boolean;
  placeholder?: string;
}

export default function Input({
  label,
  type = 'text',
  name,
  value,
  onChange,
  required = false,
  error,
  disabled = false,
  placeholder = '',
}: InputProps) {
  return (
    <div className={inputStyles.container}>
      <label className={inputStyles.label}>{label} : </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        className={inputStyles.input}
      />
      {error?.map((message) => (
        <p key={message} className={inputStyles.error}>
          {message}
        </p>
      ))}
    </div>
  );
}

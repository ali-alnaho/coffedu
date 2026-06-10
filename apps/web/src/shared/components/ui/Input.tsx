interface InputProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date';
  name: string;
  value: string;
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
    <div>
      <label>{label} : </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
      />
      {error && <p>{error}</p>}
    </div>
  );
}

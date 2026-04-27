import React from 'react';

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  options?: { value: string; label: string }[];
  as?: 'input' | 'textarea' | 'select';
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder,
  hint,
  options,
  as = 'input'
}) => {
  const inputId = `input-${name}`;
  const errorId = `error-${name}`;
  const hintId = `hint-${name}`;

  const describedBy = [
    hint ? hintId : null,
    error ? errorId : null,
  ]
    .filter(Boolean)
    .join(' ');

  const borderStyle = error
    ? '4px solid #d4351c'
    : '2px solid #0b0c0c';

  const inputStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    padding: '8px',
    fontSize: '19px',
    fontFamily: '"GDS Transport", arial, sans-serif',
    lineHeight: 1.5,
    color: '#0b0c0c',
    border: borderStyle,
    borderRadius: 0,
    outline: 'none',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
  };

  return (
    <div
      style={{
        marginBottom: '20px',
        ...(error
          ? {
              borderLeft: '4px solid #d4351c',
              paddingLeft: '15px',
            }
          : {}),
      }}
    >
      <label
        htmlFor={inputId}
        style={{
          display: 'block',
          fontSize: '19px',
          fontWeight: 700,
          color: '#0b0c0c',
          marginBottom: hint ? '5px' : '5px',
          fontFamily: '"GDS Transport", arial, sans-serif',
        }}
      >
        {label}
        {required && (
          <span style={{ color: '#d4351c', marginLeft: '4px' }} aria-hidden="true">
            *
          </span>
        )}
      </label>

      {hint && (
        <div
          id={hintId}
          style={{
            color: '#505a5f',
            fontSize: '16px',
            marginBottom: '5px',
            fontFamily: '"GDS Transport", arial, sans-serif',
          }}
        >
          {hint}
        </div>
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          style={{
            color: '#d4351c',
            fontWeight: 700,
            fontSize: '19px',
            marginBottom: '5px',
            marginTop: 0,
            fontFamily: '"GDS Transport", arial, sans-serif',
          }}
        >
          <span style={{ display: 'none' }}>Error: </span>
          {error}
        </p>
      )}

      {as === 'textarea' ? (
        <textarea
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-describedby={describedBy || undefined}
          aria-invalid={!!error}
          required={required}
          rows={5}
          style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
        />
      ) : as === 'select' ? (
        <select
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          aria-describedby={describedBy || undefined}
          aria-invalid={!!error}
          required={required}
          style={inputStyle}
        >
          <option value="">Please select</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-describedby={describedBy || undefined}
          aria-invalid={!!error}
          required={required}
          autoComplete={
            name === 'firstName' ? 'given-name' :
            name === 'lastName' ? 'family-name' :
            name === 'email' ? 'email' :
            name === 'phone' ? 'tel' :
            name === 'address' ? 'address-line1' :
            name === 'city' ? 'address-level2' :
            name === 'postcode' ? 'postal-code' :
            name === 'dateOfBirth' ? 'bday' :
            undefined
          }
          style={inputStyle}
        />
      )}
    </div>
  );
};

export default FormInput;

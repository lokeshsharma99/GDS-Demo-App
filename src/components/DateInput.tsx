import React from 'react';

interface DateInputProps {
  legend: string;
  hint?: string;
  error?: string;
  dayValue: string;
  monthValue: string;
  yearValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * GOV.UK Date input component.
 * https://design-system.service.gov.uk/components/date-input/
 *
 * Uses three separate text fields (day / month / year) inside a <fieldset>.
 * This matches the GOV.UK design pattern — never use type="date".
 */
const DateInput: React.FC<DateInputProps> = ({
  legend,
  hint,
  error,
  dayValue,
  monthValue,
  yearValue,
  onChange,
}) => {
  const hintId = 'hint-dob';
  const errorId = 'error-dob';

  const describedBy = [hint ? hintId : null, error ? errorId : null]
    .filter(Boolean)
    .join(' ');

  const fieldStyle: React.CSSProperties = {
    marginBottom: '20px',
    ...(error
      ? { borderLeft: '4px solid #d4351c', paddingLeft: '15px' }
      : {}),
  };

  const numberInputStyle = (widthChars: number): React.CSSProperties => ({
    display: 'block',
    width: `${widthChars * 14 + 16}px`,
    padding: '8px',
    fontSize: '19px',
    fontFamily: '"GDS Transport", arial, sans-serif',
    lineHeight: 1.5,
    color: '#0b0c0c',
    border: error ? '4px solid #d4351c' : '2px solid #0b0c0c',
    borderRadius: 0,
    outline: 'none',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
  });

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '16px',
    fontWeight: 700,
    color: '#0b0c0c',
    marginBottom: '4px',
    fontFamily: '"GDS Transport", arial, sans-serif',
  };

  return (
    <div style={fieldStyle}>
      <fieldset
        style={{ border: 'none', padding: 0, margin: 0 }}
        aria-describedby={describedBy || undefined}
      >
        <legend
          style={{
            display: 'block',
            fontSize: '19px',
            fontWeight: 700,
            color: '#0b0c0c',
            marginBottom: hint ? '5px' : '5px',
            fontFamily: '"GDS Transport", arial, sans-serif',
            padding: 0,
          }}
        >
          {legend}
        </legend>

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
            <span>Error: </span>
            {error}
          </p>
        )}

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {/* Day */}
          <div>
            <label htmlFor="input-dobDay" style={labelStyle}>
              Day
            </label>
            <input
              id="input-dobDay"
              name="dobDay"
              type="text"
              inputMode="numeric"
              value={dayValue}
              onChange={onChange}
              maxLength={2}
              autoComplete="bday-day"
              aria-invalid={!!error}
              style={numberInputStyle(2)}
            />
          </div>

          {/* Month */}
          <div>
            <label htmlFor="input-dobMonth" style={labelStyle}>
              Month
            </label>
            <input
              id="input-dobMonth"
              name="dobMonth"
              type="text"
              inputMode="numeric"
              value={monthValue}
              onChange={onChange}
              maxLength={2}
              autoComplete="bday-month"
              aria-invalid={!!error}
              style={numberInputStyle(2)}
            />
          </div>

          {/* Year */}
          <div>
            <label htmlFor="input-dobYear" style={labelStyle}>
              Year
            </label>
            <input
              id="input-dobYear"
              name="dobYear"
              type="text"
              inputMode="numeric"
              value={yearValue}
              onChange={onChange}
              maxLength={4}
              autoComplete="bday-year"
              aria-invalid={!!error}
              style={numberInputStyle(4)}
            />
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default DateInput;

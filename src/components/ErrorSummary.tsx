import React, { useEffect, useRef } from 'react';
import { FormErrors } from '../types/form';

interface ErrorSummaryProps {
  errors: FormErrors;
}

/**
 * GOV.UK Error summary component.
 * https://design-system.service.gov.uk/components/error-summary/
 *
 * Must appear at the top of the page, above the <h1>.
 * Focus is moved to this component on render so screen readers announce it.
 * Each error links to its corresponding input field.
 */
const ErrorSummary: React.FC<ErrorSummaryProps> = ({ errors }) => {
  const summaryRef = useRef<HTMLDivElement>(null);

  const errorEntries = Object.entries(errors).filter(([, msg]) => !!msg);

  useEffect(() => {
    if (errorEntries.length > 0 && summaryRef.current) {
      summaryRef.current.focus();
    }
  }, [errors]); // eslint-disable-line react-hooks/exhaustive-deps

  if (errorEntries.length === 0) return null;

  return (
    <div
      ref={summaryRef}
      tabIndex={-1}
      role="alert"
      aria-labelledby="error-summary-title"
      style={{
        border: '4px solid #d4351c',
        padding: '20px',
        marginBottom: '30px',
        outline: 'none',
      }}
    >
      <h2
        id="error-summary-title"
        style={{
          fontSize: '19px',
          fontWeight: 700,
          color: '#0b0c0c',
          marginTop: 0,
          marginBottom: '15px',
          fontFamily: '"GDS Transport", arial, sans-serif',
        }}
      >
        There is a problem
      </h2>

      <ul
        style={{
          margin: 0,
          padding: '0 0 0 20px',
          fontFamily: '"GDS Transport", arial, sans-serif',
        }}
      >
        {errorEntries.map(([field, message]) => (
          <li key={field} style={{ marginBottom: '5px' }}>
            <a
              href={`#input-${field}`}
              style={{
                color: '#d4351c',
                fontSize: '19px',
                fontWeight: 700,
                textDecoration: 'underline',
              }}
            >
              {message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorSummary;

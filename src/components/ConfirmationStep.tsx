import React from 'react';
import { FormData } from '../types/form';

interface ConfirmationStepProps {
  formData: FormData;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ formData }) => {
  const formatDate = (day: string, month: string, year: string) => {
    if (!day || !month || !year) return '';
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);
    if (isNaN(d) || isNaN(m) || isNaN(y)) return `${day}/${month}/${year}`;
    return new Date(y, m - 1, d).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getEmploymentLabel = (value: string) => {
    const options: Record<string, string> = {
      'employed': 'Employed',
      'self-employed': 'Self-employed',
      'unemployed': 'Unemployed',
      'student': 'Student',
      'retired': 'Retired',
      'other': 'Other'
    };
    return options[value] || value;
  };

  const summaryRows = [
    { label: 'First name', value: formData.firstName },
    { label: 'Last name', value: formData.lastName },
    { label: 'Date of birth', value: formatDate(formData.dobDay, formData.dobMonth, formData.dobYear) },
    { label: 'National Insurance number', value: formData.nationalInsurance },
    { label: 'Email address', value: formData.email },
    { label: 'Telephone number', value: formData.phone },
    { label: 'Address', value: [formData.address, formData.city, formData.postcode].filter(Boolean).join(', ') },
    { label: 'Employment status', value: getEmploymentLabel(formData.employmentStatus) },
    ...(formData.additionalInfo ? [{ label: 'Additional information', value: formData.additionalInfo }] : []),
  ];

  return (
    <div>
      {/* Panel – GDS confirmation panel */}
      <div
        role="status"
        aria-live="polite"
        style={{
          backgroundColor: '#00703c',
          color: '#ffffff',
          padding: '30px',
          marginBottom: '30px',
        }}
      >
        <h1
          style={{
            fontSize: '36px',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 10px 0',
            fontFamily: '"GDS Transport", arial, sans-serif',
            lineHeight: 1.1,
          }}
        >
          Application submitted
        </h1>
        <p
          style={{
            fontSize: '24px',
            color: '#ffffff',
            margin: 0,
            fontFamily: '"GDS Transport", arial, sans-serif',
          }}
        >
          Your reference number
          <br />
          <strong>UC-{Math.random().toString(36).substring(2, 10).toUpperCase()}</strong>
        </p>
      </div>

      <p
        style={{
          fontSize: '19px',
          color: '#0b0c0c',
          marginBottom: '30px',
          fontFamily: '"GDS Transport", arial, sans-serif',
        }}
      >
        We have sent you a confirmation email.
      </p>

      {/* GDS Summary list */}
      <h2
        style={{
          fontSize: '24px',
          fontWeight: 700,
          color: '#0b0c0c',
          marginBottom: '20px',
          fontFamily: '"GDS Transport", arial, sans-serif',
        }}
      >
        Application summary
      </h2>

      <dl
        style={{
          margin: 0,
          borderTop: '1px solid #b1b4b6',
        }}
      >
        {summaryRows.map((row) => (
          <div
            key={row.label}
            style={{
              display: 'flex',
              gap: '20px',
              borderBottom: '1px solid #b1b4b6',
              padding: '10px 0',
              flexWrap: 'wrap',
            }}
          >
            <dt
              style={{
                fontSize: '19px',
                fontWeight: 700,
                color: '#0b0c0c',
                flex: '0 0 200px',
                fontFamily: '"GDS Transport", arial, sans-serif',
              }}
            >
              {row.label}
            </dt>
            <dd
              style={{
                fontSize: '19px',
                color: '#0b0c0c',
                flex: 1,
                margin: 0,
                fontFamily: '"GDS Transport", arial, sans-serif',
                wordBreak: 'break-word',
              }}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* What happens next */}
      <h2
        style={{
          fontSize: '24px',
          fontWeight: 700,
          color: '#0b0c0c',
          marginTop: '30px',
          marginBottom: '10px',
          fontFamily: '"GDS Transport", arial, sans-serif',
        }}
      >
        What happens next
      </h2>
      <p
        style={{
          fontSize: '19px',
          color: '#0b0c0c',
          marginBottom: '10px',
          fontFamily: '"GDS Transport", arial, sans-serif',
        }}
      >
        We'll review your application and contact you within 5 working days.
      </p>
      <p
        style={{
          fontSize: '19px',
          color: '#0b0c0c',
          fontFamily: '"GDS Transport", arial, sans-serif',
        }}
      >
        <a href="https://www.gov.uk/universal-credit" style={{ color: '#1d70b8' }}>
          Find out more about Universal Credit
        </a>
      </p>
    </div>
  );
};

export default ConfirmationStep;

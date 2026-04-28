import React, { useState } from 'react';
import GovUKHeader from './GovUKHeader';
import GovUKFooter from './GovUKFooter';

interface LandingPageProps {
  onSelectService: (service: string) => void;
}

const SERVICES = [
  {
    id: 'universal-credit',
    label: 'Universal Credit',
    description: 'Monthly payment for people on low income or out of work. Replaces 6 legacy benefits.',
  },
  {
    id: 'housing-benefit',
    label: 'Housing Benefit',
    description: 'Help with rent costs if you are on a low income or claiming other benefits.',
  },
  {
    id: 'jobseekers-allowance',
    label: "Jobseeker's Allowance",
    description: 'Financial support while you are looking for work.',
  },
];

const LandingPage: React.FC<LandingPageProps> = ({ onSelectService }) => {
  const [selected, setSelected] = useState<string>('');
  const [validationError, setValidationError] = useState(false);

  const handleStart = () => {
    if (!selected) {
      setValidationError(true);
      document.getElementById('service-error')?.focus();
      return;
    }
    onSelectService(selected);
  };

  const handleChange = (value: string) => {
    setSelected(value);
    setValidationError(false);
  };

  return (
    <>
      <a href="#main-content" className="govuk-skip-link">
        Skip to main content
      </a>

      <GovUKHeader serviceName="Apply for Benefits and Support" />

      <div
        id="main-content"
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '30px 15px',
          fontFamily: '"GDS Transport", arial, sans-serif',
        }}
      >
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '20px' }}>
          <ol
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '5px',
              fontSize: '14px',
            }}
          >
            <li>
              <a href="https://www.gov.uk" style={{ color: '#1d70b8' }}>Home</a>
              <span aria-hidden="true" style={{ marginLeft: '5px', color: '#505a5f' }}>&rsaquo;</span>
            </li>
            <li>
              <a href="#" style={{ color: '#1d70b8' }}>Benefits</a>
              <span aria-hidden="true" style={{ marginLeft: '5px', color: '#505a5f' }}>&rsaquo;</span>
            </li>
            <li aria-current="page" style={{ color: '#0b0c0c' }}>Apply for support</li>
          </ol>
        </nav>

        <h1
          style={{
            fontSize: '36px',
            fontWeight: 700,
            lineHeight: 1.1,
            color: '#0b0c0c',
            marginBottom: '20px',
          }}
        >
          Apply for Benefits and Support
        </h1>

        <p style={{ fontSize: '19px', color: '#0b0c0c', marginBottom: '30px' }}>
          Select the benefit you want to apply for, then click <strong>Start now</strong> to begin your application.
        </p>

        {/* Service selection */}
        <div
          role="group"
          aria-labelledby="service-group-legend"
          style={{ marginBottom: '30px' }}
        >
          <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
            <legend
              id="service-group-legend"
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#0b0c0c',
                marginBottom: '15px',
                display: 'block',
              }}
            >
              Which benefit are you applying for?
            </legend>

            {/* Validation error */}
            {validationError && (
              <p
                id="service-error"
                role="alert"
                tabIndex={-1}
                style={{
                  color: '#d4351c',
                  fontWeight: 700,
                  fontSize: '19px',
                  borderLeft: '4px solid #d4351c',
                  paddingLeft: '15px',
                  marginBottom: '15px',
                }}
              >
                Select a benefit before continuing
              </p>
            )}

            {/* Radio cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {SERVICES.map((svc) => {
                const isChecked = selected === svc.id;
                return (
                  <label
                    key={svc.id}
                    htmlFor={`service-${svc.id}`}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '15px',
                      padding: '20px',
                      border: isChecked ? '3px solid #0b0c0c' : '2px solid #b1b4b6',
                      backgroundColor: isChecked ? '#f3f2f1' : '#ffffff',
                      cursor: 'pointer',
                      borderRadius: '0',
                    }}
                  >
                    <input
                      type="radio"
                      id={`service-${svc.id}`}
                      name="service"
                      value={svc.id}
                      checked={isChecked}
                      onChange={() => handleChange(svc.id)}
                      style={{
                        width: '24px',
                        height: '24px',
                        flexShrink: 0,
                        marginTop: '2px',
                        cursor: 'pointer',
                        accentColor: '#0b0c0c',
                      }}
                    />
                    <div>
                      <span
                        style={{
                          display: 'block',
                          fontSize: '19px',
                          fontWeight: 700,
                          color: '#0b0c0c',
                          marginBottom: '4px',
                        }}
                      >
                        {svc.label}
                      </span>
                      <span style={{ fontSize: '17px', color: '#505a5f' }}>
                        {svc.description}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>

        {/* Before you start */}
        <section aria-labelledby="before-you-start" style={{ marginBottom: '30px' }}>
          <h2
            id="before-you-start"
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#0b0c0c',
              borderBottom: '1px solid #b1b4b6',
              paddingBottom: '10px',
              marginBottom: '20px',
            }}
          >
            Before you start
          </h2>
          <p style={{ fontSize: '19px', color: '#0b0c0c', marginBottom: '15px' }}>You'll need:</p>
          <ul
            style={{
              fontSize: '19px',
              color: '#0b0c0c',
              paddingLeft: '20px',
              marginBottom: '20px',
              lineHeight: 1.6,
            }}
          >
            <li>your National Insurance number</li>
            <li>your bank, building society or credit union account details</li>
            <li>information about your housing costs</li>
            <li>details of your income, for example payslips</li>
            <li>details of savings and any investments</li>
          </ul>
          <p style={{ fontSize: '19px', color: '#0b0c0c' }}>
            This service takes around 30 to 45 minutes to complete.
          </p>
        </section>

        {/* Start now button */}
        <button
          onClick={handleStart}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: selected ? '#00703c' : '#6f777b',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '24px',
            fontFamily: '"GDS Transport", arial, sans-serif',
            border: 'none',
            padding: '13px 20px',
            cursor: selected ? 'pointer' : 'not-allowed',
            boxShadow: selected ? '0 2px 0 #002d18' : '0 2px 0 #383f43',
            marginBottom: '30px',
          }}
          aria-disabled={!selected}
          aria-describedby={validationError ? 'service-error' : undefined}
        >
          Start now
          <svg
            aria-hidden="true"
            focusable="false"
            width="17.5"
            height="19"
            viewBox="0 0 33 40"
            style={{ fill: '#ffffff' }}
          >
            <path d="M0 0h13l20 20-20 20H0l20-20z" />
          </svg>
        </button>

        {/* Help section */}
        <section
          aria-labelledby="get-help"
          style={{ borderTop: '2px solid #1d70b8', paddingTop: '20px', marginTop: '20px' }}
        >
          <h2
            id="get-help"
            style={{ fontSize: '24px', fontWeight: 700, color: '#0b0c0c', marginBottom: '10px' }}
          >
            Get help with your application
          </h2>
          <p style={{ fontSize: '19px', color: '#0b0c0c', margin: 0 }}>
            Call the Universal Credit helpline on{' '}
            <a href="tel:08003285644" style={{ color: '#1d70b8' }}>
              0800 328 5644
            </a>{' '}
            (Monday to Friday, 8am to 6pm). Calls are free.
          </p>
        </section>
      </div>

      <GovUKFooter />
    </>
  );
};

export default LandingPage;


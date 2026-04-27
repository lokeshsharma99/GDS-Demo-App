import React from 'react';
import GovUKHeader from './GovUKHeader';
import GovUKFooter from './GovUKFooter';

interface LandingPageProps {
  onSelectService: (service: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelectService }) => {
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
              <a href="https://www.gov.uk" style={{ color: '#1d70b8' }}>
                Home
              </a>
              <span aria-hidden="true" style={{ marginLeft: '5px', color: '#505a5f' }}>
                &rsaquo;
              </span>
            </li>
            <li>
              <a href="#" style={{ color: '#1d70b8' }}>
                Benefits
              </a>
              <span aria-hidden="true" style={{ marginLeft: '5px', color: '#505a5f' }}>
                &rsaquo;
              </span>
            </li>
            <li aria-current="page" style={{ color: '#0b0c0c' }}>
              Universal Credit
            </li>
          </ol>
        </nav>

        <h1
          style={{
            fontSize: '36px',
            fontWeight: 700,
            lineHeight: 1.1,
            color: '#0b0c0c',
            marginBottom: '20px',
            borderBottom: 'none',
          }}
        >
          Apply for Universal Credit
        </h1>

        {/* Inset text */}
        <div
          style={{
            borderLeft: '10px solid #b1b4b6',
            paddingLeft: '15px',
            marginBottom: '30px',
          }}
        >
          <p style={{ fontSize: '19px', margin: 0, color: '#0b0c0c' }}>
            Universal Credit is a payment to help with your living costs. It's paid monthly —
            or twice a month for some people in Scotland.
          </p>
        </div>

        {/* Warning text */}
        <div
          role="note"
          aria-label="Important"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            marginBottom: '30px',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              fontSize: '35px',
              lineHeight: 1,
              fontWeight: 700,
              color: '#0b0c0c',
              flexShrink: 0,
            }}
          >
            !
          </span>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '19px', color: '#0b0c0c' }}>
            You might be able to apply if you're on a low income, out of work or you cannot work.
          </p>
        </div>

        {/* Before you start panel */}
        <section aria-labelledby="before-you-start">
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

          <p style={{ fontSize: '19px', color: '#0b0c0c', marginBottom: '15px' }}>
            You'll need:
          </p>

          <ul
            style={{
              fontSize: '19px',
              color: '#0b0c0c',
              paddingLeft: '20px',
              marginBottom: '30px',
              lineHeight: 1.6,
            }}
          >
            <li>your National Insurance number</li>
            <li>your bank, building society or credit union account details</li>
            <li>information about your housing, for example how much rent you pay</li>
            <li>details of your income, for example payslips</li>
            <li>details of savings and any investments, like shares or a property that you rent out</li>
            <li>details of any other benefits you're getting</li>
          </ul>

          <p style={{ fontSize: '19px', color: '#0b0c0c', marginBottom: '30px' }}>
            This service takes around 30 to 45 minutes to complete.
          </p>
        </section>

        {/* GDS Start button */}
        <button
          onClick={() => onSelectService('universal-credit')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#00703c',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '24px',
            fontFamily: '"GDS Transport", arial, sans-serif',
            border: 'none',
            padding: '13px 20px',
            cursor: 'pointer',
            textDecoration: 'none',
            position: 'relative',
            boxShadow: '0 2px 0 #002d18',
            marginBottom: '30px',
          }}
          aria-label="Start now – Apply for Universal Credit"
        >
          Start now
          {/* Arrow */}
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
          style={{
            borderTop: '2px solid #1d70b8',
            paddingTop: '20px',
            marginTop: '20px',
          }}
        >
          <h2
            id="get-help"
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#0b0c0c',
              marginBottom: '10px',
            }}
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


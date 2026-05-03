import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GovUKHeader from '../components/GovUKHeader';
import GovUKFooter from '../components/GovUKFooter';
import ConfirmationStep from '../components/ConfirmationStep';
import { useFormContext } from '../context/FormContext';

const ConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedService, formData, resetForm } = useFormContext();

  useEffect(() => {
    document.title = 'Application submitted – Apply for Universal Credit – GOV.UK';
  }, []);

  if (!selectedService) {
    navigate('/', { replace: true });
    return null;
  }

  const handleReturnToServices = () => {
    resetForm();
    navigate('/');
  };

  return (
    <>
      <a href="#main-content" className="govuk-skip-link">
        Skip to main content
      </a>

      <GovUKHeader serviceName="Apply for Universal Credit" serviceUrl="#" />

      <div
        id="main-content"
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '30px 15px',
          fontFamily: '"GDS Transport", arial, sans-serif',
        }}
      >
        <main>
          <ConfirmationStep formData={formData} />

          <div style={{ marginTop: '30px' }}>
            <button
              type="button"
              onClick={handleReturnToServices}
              style={{
                backgroundColor: '#1d70b8',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '19px',
                fontFamily: '"GDS Transport", arial, sans-serif',
                border: 'none',
                padding: '11px 20px',
                cursor: 'pointer',
                boxShadow: '0 2px 0 #003078',
              }}
            >
              Return to services
            </button>
          </div>
        </main>
      </div>

      <GovUKFooter />
    </>
  );
};

export default ConfirmationPage;

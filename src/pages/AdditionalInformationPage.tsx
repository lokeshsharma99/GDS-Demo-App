import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GovUKHeader from '../components/GovUKHeader';
import GovUKFooter from '../components/GovUKFooter';
import ProgressIndicator from '../components/ProgressIndicator';
import AdditionalInformationStep from '../components/AdditionalInformationStep';
import ErrorSummary from '../components/ErrorSummary';
import { useFormContext } from '../context/FormContext';
import { validateStep, hasErrors } from '../utils/validation';

const TOTAL_STEPS = 4;
const STEP_TITLES = ['Personal', 'Contact', 'Additional', 'Confirmation'];

const AdditionalInformationPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedService, formData, errors, setErrors, handleInputChange } = useFormContext();

  useEffect(() => {
    document.title = 'Additional information – Apply for Universal Credit – GOV.UK';
  }, []);

  if (!selectedService) {
    navigate('/', { replace: true });
    return null;
  }

  const handleSubmit = () => {
    const stepErrors = validateStep(3, formData);
    if (hasErrors(stepErrors)) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    navigate('/apply/confirmation');
  };

  const handleBack = () => {
    setErrors({});
    navigate('/apply/contact');
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
        <nav aria-label="Back" style={{ marginBottom: '20px' }}>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); handleBack(); }}
            style={{
              color: '#1d70b8',
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              textDecoration: 'underline',
            }}
          >
            &#8592; Back
          </a>
        </nav>

        <ProgressIndicator currentStep={3} totalSteps={TOTAL_STEPS} stepTitles={STEP_TITLES} />

        <main>
          <ErrorSummary errors={errors} />
          <AdditionalInformationStep
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
          />

          <div
            style={{
              display: 'flex',
              gap: '20px',
              marginTop: '30px',
              paddingTop: '20px',
              borderTop: '1px solid #b1b4b6',
            }}
          >
            <button
              type="button"
              onClick={handleSubmit}
              style={{
                backgroundColor: '#00703c',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '19px',
                fontFamily: '"GDS Transport", arial, sans-serif',
                border: 'none',
                padding: '11px 20px',
                cursor: 'pointer',
                boxShadow: '0 2px 0 #002d18',
              }}
            >
              Submit Universal Credit Application
            </button>

            <button
              type="button"
              onClick={handleBack}
              style={{
                backgroundColor: 'transparent',
                color: '#1d70b8',
                fontWeight: 400,
                fontSize: '19px',
                fontFamily: '"GDS Transport", arial, sans-serif',
                border: 'none',
                padding: '11px 0',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Previous
            </button>
          </div>
        </main>
      </div>

      <GovUKFooter />
    </>
  );
};

export default AdditionalInformationPage;

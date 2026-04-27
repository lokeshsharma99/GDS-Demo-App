import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import { FormData, FormErrors } from './types/form';
import { validateStep, hasErrors } from './utils/validation';
import ProgressIndicator from './components/ProgressIndicator';
import PersonalDetailsStep from './components/PersonalDetailsStep';
import ContactInformationStep from './components/ContactInformationStep';
import AdditionalInformationStep from './components/AdditionalInformationStep';
import ConfirmationStep from './components/ConfirmationStep';
import GovUKHeader from './components/GovUKHeader';
import GovUKFooter from './components/GovUKFooter';

const TOTAL_STEPS = 4;
const STEP_TITLES = ['Personal', 'Contact', 'Additional', 'Confirmation'];

function App() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    nationalInsurance: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
    employmentStatus: '',
    additionalInfo: ''
  });

  const handleServiceSelection = (service: string) => {
    setSelectedService(service);
  };

  const handleBackToServices = () => {
    setSelectedService(null);
    setCurrentStep(1);
    setIsSubmitted(false);
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      nationalInsurance: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postcode: '',
      employmentStatus: '',
      additionalInfo: ''
    });
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep, formData);
    
    if (hasErrors(stepErrors)) {
      setErrors(stepErrors);
      return;
    }
    
    setErrors({});
    
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Submit form
      setIsSubmitted(true);
      setCurrentStep(TOTAL_STEPS);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setErrors({});
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDetailsStep
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
          />
        );
      case 2:
        return (
          <ContactInformationStep
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
          />
        );
      case 3:
        return (
          <AdditionalInformationStep
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
          />
        );
      case 4:
        return <ConfirmationStep formData={formData} />;
      default:
        return null;
    }
  };

  const getButtonText = () => {
    if (currentStep === TOTAL_STEPS - 1) return 'Submit Universal Credit Application';
    if (currentStep === TOTAL_STEPS) return 'Back to Services';
    return 'Continue';
  };

  const handleButtonClick = () => {
    if (currentStep === TOTAL_STEPS) {
      // Go back to service selection
      handleBackToServices();
    } else {
      handleNext();
    }
  };

  // Show landing page if no service is selected
  if (!selectedService) {
    return <LandingPage onSelectService={handleServiceSelection} />;
  }

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
        {/* Back link */}
        {!isSubmitted && (
          <nav aria-label="Back" style={{ marginBottom: '20px' }}>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); handleBackToServices(); }}
              style={{
                color: '#1d70b8',
                fontSize: '14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                textDecoration: 'underline',
              }}
            >
              &#8592; Back to services
            </a>
          </nav>
        )}

        {!isSubmitted && (
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            stepTitles={STEP_TITLES}
          />
        )}

        <main>
          {renderStep()}

          {!isSubmitted && (
            <div
              style={{
                display: 'flex',
                gap: '20px',
                marginTop: '30px',
                paddingTop: '20px',
                borderTop: '1px solid #b1b4b6',
                flexWrap: 'wrap',
              }}
            >
              {/* Continue / Submit button */}
              <button
                type="button"
                onClick={handleButtonClick}
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
                {getButtonText()}
              </button>

              {/* Previous button */}
              {currentStep > 1 && currentStep < TOTAL_STEPS && (
                <button
                  type="button"
                  onClick={handlePrevious}
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
              )}
            </div>
          )}

          {isSubmitted && (
            <div style={{ marginTop: '30px' }}>
              <button
                type="button"
                onClick={handleBackToServices}
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
          )}
        </main>
      </div>

      <GovUKFooter />
    </>
  );
}

export default App;
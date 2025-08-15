import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import { FormData, FormErrors } from './types/form';
import { validateStep, hasErrors } from './utils/validation';
import ProgressIndicator from './components/ProgressIndicator';
import PersonalDetailsStep from './components/PersonalDetailsStep';
import ContactInformationStep from './components/ContactInformationStep';
import AdditionalInformationStep from './components/AdditionalInformationStep';
import ConfirmationStep from './components/ConfirmationStep';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    <div className="min-h-screen bg-white">
      <div className="bg-black text-white py-2">
        <div className="max-w-4xl mx-auto px-4">
          <button 
            onClick={handleBackToServices}
            className="text-sm hover:underline"
          >
            ← Back to all services
          </button>
        </div>
      </div>
      
      <div className="bg-blue-600 text-white py-4">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-xl font-bold">Apply for Universal Credit</h1>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {!isSubmitted && (
          <ProgressIndicator 
            currentStep={currentStep} 
            totalSteps={TOTAL_STEPS} 
            stepTitles={STEP_TITLES}
          />
        )}
        
        <div className="bg-white">
          {renderStep()}
          
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            {currentStep > 1 && currentStep < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={handlePrevious}
                className="inline-flex items-center px-4 py-2 text-blue-600 bg-white border-2 border-blue-600 rounded-none font-bold hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              >
                <ChevronLeft size={20} className="mr-1" />
                Previous
              </button>
            ) : (
              <div></div>
            )}
            
            <button
              type="button"
              onClick={handleButtonClick}
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-bold rounded-none hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
            >
              {getButtonText()}
              {currentStep < TOTAL_STEPS && (
                <ChevronRight size={20} className="ml-1" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      <footer className="bg-gray-100 border-t border-gray-300 py-6 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-600 text-sm">
          <p>Apply for Universal Credit online - a secure government service.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
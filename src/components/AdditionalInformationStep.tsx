import React from 'react';
import { FormData, FormErrors } from '../types/form';
import FormInput from './FormInput';

interface AdditionalInformationStepProps {
  formData: FormData;
  errors: FormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const AdditionalInformationStep: React.FC<AdditionalInformationStepProps> = ({
  formData,
  errors,
  onChange
}) => {
  const employmentOptions = [
    { value: 'employed', label: 'Employed' },
    { value: 'self-employed', label: 'Self-employed' },
    { value: 'unemployed', label: 'Unemployed' },
    { value: 'student', label: 'Student' },
    { value: 'retired', label: 'Retired' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Additional Information</h2>
      <p className="text-gray-600 mb-8">Please provide some additional details about yourself.</p>
      
      <div className="space-y-6">
        <FormInput
          label="Employment Status"
          name="employmentStatus"
          as="select"
          value={formData.employmentStatus}
          onChange={onChange}
          options={employmentOptions}
        />
        
        <FormInput
          label="Additional Information"
          name="additionalInfo"
          as="textarea"
          value={formData.additionalInfo}
          onChange={onChange}
          placeholder="Please provide any additional information you think would be helpful..."
        />
      </div>
    </div>
  );
};

export default AdditionalInformationStep;
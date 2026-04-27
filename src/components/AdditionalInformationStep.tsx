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
      <h1
        style={{
          fontSize: '36px',
          fontWeight: 700,
          color: '#0b0c0c',
          marginBottom: '10px',
          fontFamily: '"GDS Transport", arial, sans-serif',
          lineHeight: 1.1,
        }}
      >
        Additional information
      </h1>
      <p
        style={{
          fontSize: '19px',
          color: '#505a5f',
          marginBottom: '30px',
          fontFamily: '"GDS Transport", arial, sans-serif',
        }}
      >
        Please provide some additional details about yourself.
      </p>

      <FormInput
        label="Employment status"
        name="employmentStatus"
        as="select"
        value={formData.employmentStatus}
        onChange={onChange}
        error={errors.employmentStatus}
        options={employmentOptions}
        required
      />

      <FormInput
        label="Additional information"
        name="additionalInfo"
        as="textarea"
        value={formData.additionalInfo}
        onChange={onChange}
        error={errors.additionalInfo}
        hint="Tell us anything else you think is relevant to your application."
        placeholder="Please provide any additional information you think would be helpful..."
      />
    </div>
  );
};

export default AdditionalInformationStep;
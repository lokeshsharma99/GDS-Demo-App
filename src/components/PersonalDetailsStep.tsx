import React from 'react';
import { FormData, FormErrors } from '../types/form';
import FormInput from './FormInput';

interface PersonalDetailsStepProps {
  formData: FormData;
  errors: FormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const PersonalDetailsStep: React.FC<PersonalDetailsStepProps> = ({
  formData,
  errors,
  onChange
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Details</h2>
      <p className="text-gray-600 mb-8">Please provide your basic personal information.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={onChange}
        />
        
        <FormInput
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={onChange}
        />
        
        <FormInput
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={onChange}
        />
        
        <FormInput
          label="National Insurance Number"
          name="nationalInsurance"
          value={formData.nationalInsurance}
          onChange={onChange}
          placeholder="QQ 12 34 56 C"
        />
      </div>
    </div>
  );
};

export default PersonalDetailsStep;
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
        Personal details
      </h1>
      <p
        style={{
          fontSize: '19px',
          color: '#505a5f',
          marginBottom: '30px',
          fontFamily: '"GDS Transport", arial, sans-serif',
        }}
      >
        Please provide your basic personal information.
      </p>

      <FormInput
        label="First name"
        name="firstName"
        value={formData.firstName}
        onChange={onChange}
        error={errors.firstName}
        required
      />

      <FormInput
        label="Last name"
        name="lastName"
        value={formData.lastName}
        onChange={onChange}
        error={errors.lastName}
        required
      />

      <FormInput
        label="Date of birth"
        name="dateOfBirth"
        type="date"
        value={formData.dateOfBirth}
        onChange={onChange}
        error={errors.dateOfBirth}
        hint="For example, 31 3 1980"
        required
      />

      <FormInput
        label="National Insurance number"
        name="nationalInsurance"
        value={formData.nationalInsurance}
        onChange={onChange}
        error={errors.nationalInsurance}
        hint="It's on your National Insurance card, benefit letter, payslip or P60. For example, 'QQ 12 34 56 C'."
        placeholder="QQ 12 34 56 C"
        required
      />
    </div>
  );
};

export default PersonalDetailsStep;

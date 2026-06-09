import React from 'react';
import { FormData, FormErrors } from '../types/form';
import FormInput from './FormInput';
import DateInput from './DateInput';

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
      />

      <FormInput
        label="Last name"
        name="lastName"
        value={formData.lastName}
        onChange={onChange}
        error={errors.lastName}
      />

      <DateInput
        legend="Date of birth"
        hint="For example, 31 3 1980"
        error={errors.dob}
        dayValue={formData.dobDay}
        monthValue={formData.dobMonth}
        yearValue={formData.dobYear}
        onChange={onChange}
      />

      <FormInput
        label="National Insurance number"
        name="nationalInsurance"
        value={formData.nationalInsurance}
        onChange={onChange}
        error={errors.nationalInsurance}
      />
    </div>
  );
};

export default PersonalDetailsStep;

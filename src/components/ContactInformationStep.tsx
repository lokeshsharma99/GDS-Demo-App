import React from 'react';
import { FormData, FormErrors } from '../types/form';
import FormInput from './FormInput';

interface ContactInformationStepProps {
  formData: FormData;
  errors: FormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const ContactInformationStep: React.FC<ContactInformationStepProps> = ({
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
        Contact information
      </h1>
      <p
        style={{
          fontSize: '19px',
          color: '#505a5f',
          marginBottom: '30px',
          fontFamily: '"GDS Transport", arial, sans-serif',
        }}
      >
        Please provide your contact details and address.
      </p>

      <FormInput
        label="Email address"
        name="email"
        type="email"
        value={formData.email}
        onChange={onChange}
        error={errors.email}
        hint="We'll only use this to contact you about your application."
        required
      />

      <FormInput
        label="UK telephone number"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={onChange}
        error={errors.phone}
        hint="Include the country code for international numbers."
        required
      />

      <FormInput
        label="Address line 1"
        name="address"
        value={formData.address}
        onChange={onChange}
        error={errors.address}
        required
      />

      <FormInput
        label="Town or city"
        name="city"
        value={formData.city}
        onChange={onChange}
        error={errors.city}
        required
      />

      <FormInput
        label="Postcode"
        name="postcode"
        value={formData.postcode}
        onChange={onChange}
        error={errors.postcode}
        placeholder="SW1A 1AA"
        hint="For example, SW1A 1AA"
        required
      />
    </div>
  );
};

export default ContactInformationStep;
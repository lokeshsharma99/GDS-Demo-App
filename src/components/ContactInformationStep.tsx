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
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Information</h2>
      <p className="text-gray-600 mb-8">Please provide your contact details and address.</p>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
          />
          
          <FormInput
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={onChange}
          />
        </div>
        
        <FormInput
          label="Address"
          name="address"
          value={formData.address}
          onChange={onChange}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="City"
            name="city"
            value={formData.city}
            onChange={onChange}
          />
          
          <FormInput
            label="Postcode"
            name="postcode"
            value={formData.postcode}
            onChange={onChange}
            placeholder="SW1A 1AA"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInformationStep;
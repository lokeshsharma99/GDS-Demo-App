import React, { createContext, useContext, useState } from 'react';
import { FormData, FormErrors } from '../types/form';

const EMPTY_FORM: FormData = {
  firstName: '',
  lastName: '',
  dobDay: '',
  dobMonth: '',
  dobYear: '',
  nationalInsurance: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postcode: '',
  employmentStatus: '',
  additionalInfo: '',
};

interface FormContextValue {
  selectedService: string | null;
  setSelectedService: (service: string | null) => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: FormErrors;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  resetForm: () => void;
}

const FormContext = createContext<FormContextValue | null>(null);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const resetForm = () => {
    setSelectedService(null);
    setFormData(EMPTY_FORM);
    setErrors({});
  };

  return (
    <FormContext.Provider
      value={{
        selectedService,
        setSelectedService,
        formData,
        setFormData,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = (): FormContextValue => {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useFormContext must be used inside FormProvider');
  return ctx;
};

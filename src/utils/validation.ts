import { FormData, FormErrors } from '../types/form';

export const validateStep = (step: number, formData: FormData): FormErrors => {
  const errors: FormErrors = {};
  
  // No validation - always return empty errors object
  return errors;
};

export const hasErrors = (errors: FormErrors): boolean => {
  return Object.keys(errors).length > 0;
};
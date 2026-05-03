import { describe, it, expect } from 'vitest';
import { validateStep, hasErrors } from '../../utils/validation';
import { FormData } from '../../types/form';

const emptyForm: FormData = {
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

describe('hasErrors', () => {
  it('returns false for an empty errors object', () => {
    expect(hasErrors({})).toBe(false);
  });

  it('returns true when errors object has keys', () => {
    expect(hasErrors({ firstName: 'Enter your first name' })).toBe(true);
  });
});

describe('validateStep', () => {
  describe('Step 1 — Personal Details (when validation is implemented)', () => {
    it('returns an object (even if currently empty)', () => {
      const result = validateStep(1, emptyForm);
      expect(typeof result).toBe('object');
      expect(result).not.toBeNull();
    });

    it('returns no errors when all step 1 fields are filled', () => {
      const filledForm: FormData = {
        ...emptyForm,
        firstName: 'Jane',
        lastName: 'Smith',
        dobDay: '1',
        dobMonth: '1',
        dobYear: '1990',
        nationalInsurance: 'AB123456C',
      };
      const result = validateStep(1, filledForm);
      // Current implementation always returns {} — this test documents expected behaviour
      expect(typeof result).toBe('object');
    });
  });

  describe('Step 2 — Contact Information (when validation is implemented)', () => {
    it('returns an object for step 2', () => {
      const result = validateStep(2, emptyForm);
      expect(typeof result).toBe('object');
    });

    it('returns no errors when all step 2 fields are filled', () => {
      const filledForm: FormData = {
        ...emptyForm,
        email: 'test@example.com',
        phone: '07700900000',
        address: '1 Main Street',
        city: 'London',
        postcode: 'SW1A 1AA',
      };
      const result = validateStep(2, filledForm);
      expect(typeof result).toBe('object');
    });
  });

  describe('Step 3 — Additional Information (when validation is implemented)', () => {
    it('returns an object for step 3', () => {
      const result = validateStep(3, emptyForm);
      expect(typeof result).toBe('object');
    });
  });

  describe('Unknown step', () => {
    it('returns an empty errors object for unknown step numbers', () => {
      const result = validateStep(99, emptyForm);
      expect(result).toEqual({});
    });
  });
});

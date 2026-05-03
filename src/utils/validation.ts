import { FormData, FormErrors } from '../types/form';

/**
 * Validates a single form step and returns field-level error messages.
 * Error messages follow GOV.UK guidance: tell users how to fix the problem.
 * https://design-system.service.gov.uk/components/error-message/
 */
export const validateStep = (step: number, formData: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (step === 1) {
    // --- Personal details ---

    if (!formData.firstName.trim()) {
      errors.firstName = 'Enter your first name';
    } else if (formData.firstName.trim().length > 70) {
      errors.firstName = 'First name must be 70 characters or fewer';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Enter your last name';
    } else if (formData.lastName.trim().length > 70) {
      errors.lastName = 'Last name must be 70 characters or fewer';
    }

    // Date of birth — three separate fields
    const day = parseInt(formData.dobDay, 10);
    const month = parseInt(formData.dobMonth, 10);
    const year = parseInt(formData.dobYear, 10);
    const hasDay = formData.dobDay.trim() !== '';
    const hasMonth = formData.dobMonth.trim() !== '';
    const hasYear = formData.dobYear.trim() !== '';

    if (!hasDay && !hasMonth && !hasYear) {
      errors.dob = 'Enter your date of birth';
    } else if (!hasDay || !hasMonth || !hasYear) {
      const missing: string[] = [];
      if (!hasDay) missing.push('day');
      if (!hasMonth) missing.push('month');
      if (!hasYear) missing.push('year');
      errors.dob = `Date of birth must include a ${missing.join(' and ')}`;
    } else if (
      isNaN(day) || isNaN(month) || isNaN(year) ||
      day < 1 || day > 31 || month < 1 || month > 12 || year < 1000 || year > 9999
    ) {
      errors.dob = 'Enter a real date of birth';
    } else {
      const dob = new Date(year, month - 1, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (dob > today) {
        errors.dob = 'Date of birth must be in the past';
      }
    }

    // National Insurance — accept with or without spaces, e.g. QQ123456C or QQ 12 34 56 C
    const niNormalised = formData.nationalInsurance.replace(/\s/g, '').toUpperCase();
    if (!formData.nationalInsurance.trim()) {
      errors.nationalInsurance = 'Enter a National Insurance number';
    } else if (!/^[A-CEGHJ-PR-TW-Z]{2}\d{6}[A-D]$/i.test(niNormalised)) {
      errors.nationalInsurance =
        "Enter a National Insurance number in the correct format, like 'QQ 12 34 56 C'";
    }
  }

  if (step === 2) {
    // --- Contact information ---

    if (!formData.email.trim()) {
      errors.email = 'Enter an email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Enter an email address in the correct format, like name@example.com';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Enter a UK telephone number';
    } else if (!/^(\+44\s?|0)[\d\s]{9,14}$/.test(formData.phone.trim())) {
      errors.phone = 'Enter a telephone number, like 01632 960 001, 07700 900 982 or +44 808 157 0192';
    }

    if (!formData.address.trim()) {
      errors.address = 'Enter your address';
    }

    if (!formData.city.trim()) {
      errors.city = 'Enter your town or city';
    }

    // UK postcode: accept with or without space, e.g. SW1A 1AA or SW1A1AA
    const postcodeNormalised = formData.postcode.replace(/\s/g, '').toUpperCase();
    if (!formData.postcode.trim()) {
      errors.postcode = 'Enter a postcode';
    } else if (!/^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/i.test(postcodeNormalised)) {
      errors.postcode = "Enter a real postcode, like SW1A 1AA";
    }
  }

  if (step === 3) {
    // --- Additional information ---

    if (!formData.employmentStatus) {
      errors.employmentStatus = 'Select your employment status';
    }
  }

  return errors;
};

export const hasErrors = (errors: FormErrors): boolean => {
  return Object.values(errors).some((msg) => !!msg);
};

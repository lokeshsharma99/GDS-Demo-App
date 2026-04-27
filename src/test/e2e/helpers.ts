/**
 * Shared test data and helper functions for the functional regression suite.
 * Maps to the BAT scenarios defined in GitHub Issues #7–#23.
 */

export const VALID_FORM_DATA = {
  // Step 1 — Personal Details
  firstName: 'Jane',
  lastName: 'Smith',
  dateOfBirth: '1985-06-15',
  nationalInsurance: 'AB 12 34 56 C',
  // Step 2 — Contact Information
  email: 'jane.smith@example.com',
  phone: '07700900000',
  address: '10 Downing Street',
  city: 'London',
  postcode: 'SW1A 2AA',
  // Step 3 — Additional Information
  employmentStatus: 'Employed',
  additionalInfo: 'No additional information to provide.',
};

/** Fill all fields on Step 1 — Personal Details */
export async function fillStep1(page: import('@playwright/test').Page, data = VALID_FORM_DATA) {
  await page.getByLabel('First name').fill(data.firstName);
  await page.getByLabel('Last name').fill(data.lastName);
  await page.getByLabel('Date of birth').fill(data.dateOfBirth);
  await page.getByLabel('National Insurance number').fill(data.nationalInsurance);
}

/** Fill all fields on Step 2 — Contact Information */
export async function fillStep2(page: import('@playwright/test').Page, data = VALID_FORM_DATA) {
  await page.getByLabel('Email address').fill(data.email);
  await page.getByLabel('UK telephone number').fill(data.phone);
  await page.getByLabel('Address line 1').fill(data.address);
  await page.getByLabel('Town or city').fill(data.city);
  await page.getByLabel('Postcode').fill(data.postcode);
}

/** Fill all fields on Step 3 — Additional Information */
export async function fillStep3(page: import('@playwright/test').Page, data = VALID_FORM_DATA) {
  await page.getByLabel('Employment status').selectOption({ label: data.employmentStatus });
  const additionalInfoField = page.getByLabel(/additional information|any additional/i);
  if (await additionalInfoField.isVisible()) {
    await additionalInfoField.fill(data.additionalInfo);
  }
}

/** Navigate from landing page to Step 1 */
export async function startApplication(page: import('@playwright/test').Page) {
  await page.goto('/');
  await page.getByRole('button', { name: /start now/i }).click();
}

/** Complete the full happy path through all steps */
export async function completeFullJourney(page: import('@playwright/test').Page, data = VALID_FORM_DATA) {
  await startApplication(page);
  await fillStep1(page, data);
  await page.getByRole('button', { name: /continue/i }).click();
  await fillStep2(page, data);
  await page.getByRole('button', { name: /continue/i }).click();
  await fillStep3(page, data);
  await page.getByRole('button', { name: /submit/i }).click();
}

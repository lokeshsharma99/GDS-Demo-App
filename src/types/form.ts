export interface FormData {
  // Personal Details
  firstName: string;
  lastName: string;
  dobDay: string;
  dobMonth: string;
  dobYear: string;
  nationalInsurance: string;
  
  // Contact Information
  email: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
  
  // Additional Information
  employmentStatus: string;
  additionalInfo: string;
}

export interface FormErrors {
  [key: string]: string;
}
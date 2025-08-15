import React from 'react';
import { FormData } from '../types/form';
import { CheckCircle } from 'lucide-react';

interface ConfirmationStepProps {
  formData: FormData;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ formData }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getEmploymentLabel = (value: string) => {
    const options = {
      'employed': 'Employed',
      'self-employed': 'Self-employed',
      'unemployed': 'Unemployed',
      'student': 'Student',
      'retired': 'Retired',
      'other': 'Other'
    };
    return options[value as keyof typeof options] || value;
  };

  return (
    <div>
      <div className="text-center mb-8">
        <CheckCircle className="mx-auto w-16 h-16 text-green-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Universal Credit Application Submitted</h2>
        <p className="text-gray-600">Thank you for applying for Universal Credit. Here's a summary of your application:</p>
      </div>
      
      <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Your Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="font-bold text-gray-700">Name:</dt>
            <dd className="text-gray-900">{formData.firstName} {formData.lastName}</dd>
          </div>
          
          <div>
            <dt className="font-bold text-gray-700">Date of Birth:</dt>
            <dd className="text-gray-900">{formatDate(formData.dateOfBirth)}</dd>
          </div>
          
          <div>
            <dt className="font-bold text-gray-700">National Insurance Number:</dt>
            <dd className="text-gray-900">{formData.nationalInsurance}</dd>
          </div>
          
          <div>
            <dt className="font-bold text-gray-700">Email:</dt>
            <dd className="text-gray-900">{formData.email}</dd>
          </div>
          
          <div>
            <dt className="font-bold text-gray-700">Phone:</dt>
            <dd className="text-gray-900">{formData.phone}</dd>
          </div>
          
          <div>
            <dt className="font-bold text-gray-700">Employment Status:</dt>
            <dd className="text-gray-900">{getEmploymentLabel(formData.employmentStatus)}</dd>
          </div>
          
          <div className="md:col-span-2">
            <dt className="font-bold text-gray-700">Address:</dt>
            <dd className="text-gray-900">
              {formData.address}<br />
              {formData.city}, {formData.postcode}
            </dd>
          </div>
          
          {formData.additionalInfo && (
            <div className="md:col-span-2">
              <dt className="font-bold text-gray-700">Additional Information:</dt>
              <dd className="text-gray-900">{formData.additionalInfo}</dd>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded p-4">
        <h4 className="font-bold text-blue-900 mb-2">What happens next with your Universal Credit application?</h4>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• We'll review your Universal Credit application within 5 working days</li>
          <li>• You'll receive an email confirmation with your application reference</li>
          <li>• We may contact you for additional information or to arrange an interview</li>
          <li>• You'll be notified of the decision by email and post</li>
        </ul>
      </div>
    </div>
  );
};

export default ConfirmationStep;
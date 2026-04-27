import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ConfirmationStep from '../../components/ConfirmationStep';

const mockFormData = {
  firstName: 'Jane',
  lastName: 'Smith',
  dateOfBirth: '1990-01-01',
  nationalInsurance: 'AB123456C',
  email: 'jane.smith@example.com',
  phone: '07700900000',
  address: '10 Downing Street',
  city: 'London',
  postcode: 'SW1A 2AA',
  employmentStatus: 'employed',
  additionalInfo: '',
};

describe('ConfirmationStep', () => {
  describe('Confirmation panel', () => {
    it('renders the confirmation heading', () => {
      render(<ConfirmationStep formData={mockFormData} />);
      expect(screen.getByText(/application submitted/i)).toBeInTheDocument();
    });

    it('renders the confirmation panel with role=status', () => {
      render(<ConfirmationStep formData={mockFormData} />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders a reference number starting with UC-', () => {
      render(<ConfirmationStep formData={mockFormData} />);
      expect(screen.getByText(/UC-/)).toBeInTheDocument();
    });
  });

  describe('Summary list', () => {
    it('displays the applicant first name', () => {
      render(<ConfirmationStep formData={mockFormData} />);
      expect(screen.getByText('Jane')).toBeInTheDocument();
    });

    it('displays the applicant last name', () => {
      render(<ConfirmationStep formData={mockFormData} />);
      expect(screen.getByText('Smith')).toBeInTheDocument();
    });

    it('displays the applicant email', () => {
      render(<ConfirmationStep formData={mockFormData} />);
      expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument();
    });

    it('displays the postcode within the address', () => {
      render(<ConfirmationStep formData={mockFormData} />);
      expect(screen.getByText(/SW1A 2AA/)).toBeInTheDocument();
    });

    it('displays the employment status as a readable label', () => {
      render(<ConfirmationStep formData={mockFormData} />);
      expect(screen.getByText('Employed')).toBeInTheDocument();
    });
  });

  describe('What happens next', () => {
    it('renders the what happens next section', () => {
      render(<ConfirmationStep formData={mockFormData} />);
      expect(screen.getByText(/what happens next/i)).toBeInTheDocument();
    });
  });
});

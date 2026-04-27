import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormInput from '../../components/FormInput';

const noop = vi.fn();

describe('FormInput', () => {
  describe('Label and input association', () => {
    it('renders a label with correct htmlFor', () => {
      render(<FormInput label="First name" name="firstName" value="" onChange={noop} />);
      const label = screen.getByText('First name');
      expect(label).toHaveAttribute('for', 'input-firstName');
    });

    it('renders an input with the correct id', () => {
      render(<FormInput label="First name" name="firstName" value="" onChange={noop} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'input-firstName');
    });

    it('renders with the provided value', () => {
      render(<FormInput label="First name" name="firstName" value="Jane" onChange={noop} />);
      expect(screen.getByRole('textbox')).toHaveValue('Jane');
    });
  });

  describe('Hint text', () => {
    it('renders hint text when provided', () => {
      render(<FormInput label="Date of birth" name="dateOfBirth" value="" onChange={noop} hint="For example, 31 3 1980" />);
      expect(screen.getByText('For example, 31 3 1980')).toBeInTheDocument();
    });

    it('links hint to input via aria-describedby', () => {
      render(<FormInput label="Date of birth" name="dateOfBirth" value="" onChange={noop} hint="For example, 31 3 1980" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', expect.stringContaining('hint-dateOfBirth'));
    });

    it('does not render hint element when hint is not provided', () => {
      render(<FormInput label="First name" name="firstName" value="" onChange={noop} />);
      expect(screen.queryByText(/for example/i)).not.toBeInTheDocument();
    });
  });

  describe('Error state', () => {
    it('renders error message when error is provided', () => {
      render(<FormInput label="First name" name="firstName" value="" onChange={noop} error="Enter your first name" />);
      expect(screen.getByText('Enter your first name')).toBeInTheDocument();
    });

    it('sets aria-invalid to true when there is an error', () => {
      render(<FormInput label="First name" name="firstName" value="" onChange={noop} error="Enter your first name" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('sets aria-invalid to false when there is no error', () => {
      render(<FormInput label="First name" name="firstName" value="" onChange={noop} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false');
    });

    it('links error to input via aria-describedby', () => {
      render(<FormInput label="First name" name="firstName" value="" onChange={noop} error="Enter your first name" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', expect.stringContaining('error-firstName'));
    });

    it('does not render error element when error is not provided', () => {
      render(<FormInput label="First name" name="firstName" value="" onChange={noop} />);
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('error message has role=alert', () => {
      render(<FormInput label="First name" name="firstName" value="" onChange={noop} error="Enter your first name" />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('Input types', () => {
    it('renders as textarea when as=textarea', () => {
      render(<FormInput label="Additional info" name="additionalInfo" value="" onChange={noop} as="textarea" />);
      expect(screen.getByRole('textbox').tagName).toBe('TEXTAREA');
    });

    it('renders as select when as=select with options', () => {
      const options = [{ value: 'employed', label: 'Employed' }, { value: 'unemployed', label: 'Unemployed' }];
      render(<FormInput label="Employment" name="employmentStatus" value="" onChange={noop} as="select" options={options} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Employed' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Unemployed' })).toBeInTheDocument();
    });

    it('renders as input by default', () => {
      render(<FormInput label="First name" name="firstName" value="" onChange={noop} />);
      expect(screen.getByRole('textbox').tagName).toBe('INPUT');
    });
  });

  describe('onChange', () => {
    it('calls onChange when the user types', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<FormInput label="First name" name="firstName" value="" onChange={handleChange} />);
      await user.type(screen.getByRole('textbox'), 'A');
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('autoComplete', () => {
    it('sets autocomplete=given-name for firstName', () => {
      render(<FormInput label="First name" name="firstName" value="" onChange={noop} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('autocomplete', 'given-name');
    });

    it('sets autocomplete=family-name for lastName', () => {
      render(<FormInput label="Last name" name="lastName" value="" onChange={noop} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('autocomplete', 'family-name');
    });

    it('sets autocomplete=email for email', () => {
      render(<FormInput label="Email" name="email" value="" onChange={noop} type="email" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('autocomplete', 'email');
    });

    it('sets autocomplete=postal-code for postcode', () => {
      render(<FormInput label="Postcode" name="postcode" value="" onChange={noop} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('autocomplete', 'postal-code');
    });
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GovUKHeader from '../../components/GovUKHeader';

describe('GovUKHeader', () => {
  describe('GOV.UK logotype', () => {
    it('renders the GOV.UK text', () => {
      render(<GovUKHeader />);
      expect(screen.getByText('GOV.UK')).toBeInTheDocument();
    });

    it('renders the Crown SVG logo', () => {
      const { container } = render(<GovUKHeader />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Service name', () => {
    it('renders the service name when provided', () => {
      render(<GovUKHeader serviceName="Apply for Universal Credit" />);
      expect(screen.getByText('Apply for Universal Credit')).toBeInTheDocument();
    });

    it('does not render a service name element when not provided', () => {
      render(<GovUKHeader />);
      expect(screen.queryByRole('link', { name: /apply for/i })).not.toBeInTheDocument();
    });
  });

  describe('BETA banner', () => {
    it('renders the BETA phase banner', () => {
      render(<GovUKHeader />);
      expect(screen.getByText('BETA')).toBeInTheDocument();
    });

    it('renders the beta feedback link', () => {
      render(<GovUKHeader />);
      expect(screen.getByRole('link', { name: /feedback/i })).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('renders a header landmark', () => {
      render(<GovUKHeader />);
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });
  });
});

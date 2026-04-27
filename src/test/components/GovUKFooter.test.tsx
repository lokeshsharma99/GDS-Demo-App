import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GovUKFooter from '../../components/GovUKFooter';

describe('GovUKFooter', () => {
  describe('Landmark', () => {
    it('renders a contentinfo landmark', () => {
      render(<GovUKFooter />);
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('renders a footer navigation landmark', () => {
      render(<GovUKFooter />);
      expect(screen.getByRole('navigation', { name: /footer links/i })).toBeInTheDocument();
    });
  });

  describe('Navigation links', () => {
    it('renders the Help link', () => {
      render(<GovUKFooter />);
      expect(screen.getByRole('link', { name: 'Help' })).toBeInTheDocument();
    });

    it('renders the Cookies link', () => {
      render(<GovUKFooter />);
      expect(screen.getByRole('link', { name: 'Cookies' })).toBeInTheDocument();
    });

    it('renders the Contact link', () => {
      render(<GovUKFooter />);
      expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
    });

    it('renders a link to the Government Digital Service', () => {
      render(<GovUKFooter />);
      expect(screen.getByRole('link', { name: 'Government Digital Service' })).toBeInTheDocument();
    });
  });

  describe('Legal text', () => {
    it('renders the OGL licence text', () => {
      render(<GovUKFooter />);
      expect(screen.getAllByText(/open government licence/i)[0]).toBeInTheDocument();
    });

    it('renders the Crown copyright text', () => {
      render(<GovUKFooter />);
      // 'Crown copyright' appears as both text and a link, so use getAllByText
      const matches = screen.getAllByText(/crown copyright/i);
      expect(matches.length).toBeGreaterThanOrEqual(1);
    });
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import ProgressIndicator from '../../components/ProgressIndicator';

const STEPS = ['Personal Details', 'Contact Information', 'Additional Information', 'Confirmation'];

describe('ProgressIndicator', () => {
  describe('Step counter text', () => {
    it('shows "Step 1 of 4" on step 1', () => {
      render(<ProgressIndicator currentStep={1} totalSteps={4} stepTitles={STEPS} />);
      expect(screen.getByText('Step 1 of 4')).toBeInTheDocument();
    });

    it('shows "Step 3 of 4" on step 3', () => {
      render(<ProgressIndicator currentStep={3} totalSteps={4} stepTitles={STEPS} />);
      expect(screen.getByText('Step 3 of 4')).toBeInTheDocument();
    });
  });

  describe('Navigation landmark', () => {
    it('renders a nav with aria-label', () => {
      render(<ProgressIndicator currentStep={1} totalSteps={4} stepTitles={STEPS} />);
      expect(screen.getByRole('navigation', { name: 'Progress through application' })).toBeInTheDocument();
    });

    it('renders a list with aria-label "Application steps"', () => {
      render(<ProgressIndicator currentStep={1} totalSteps={4} stepTitles={STEPS} />);
      expect(screen.getByRole('list', { name: 'Application steps' })).toBeInTheDocument();
    });
  });

  describe('Step count', () => {
    it('renders the correct number of steps', () => {
      render(<ProgressIndicator currentStep={1} totalSteps={4} stepTitles={STEPS} />);
      expect(screen.getAllByRole('listitem')).toHaveLength(4);
    });

    it('renders all step titles', () => {
      render(<ProgressIndicator currentStep={1} totalSteps={4} stepTitles={STEPS} />);
      STEPS.forEach(title => {
        expect(screen.getByText(title)).toBeInTheDocument();
      });
    });
  });

  describe('aria-current', () => {
    it('sets aria-current="step" on the current step', () => {
      render(<ProgressIndicator currentStep={2} totalSteps={4} stepTitles={STEPS} />);
      const items = screen.getAllByRole('listitem');
      expect(items[1]).toHaveAttribute('aria-current', 'step');
    });

    it('does not set aria-current on non-current steps', () => {
      render(<ProgressIndicator currentStep={2} totalSteps={4} stepTitles={STEPS} />);
      const items = screen.getAllByRole('listitem');
      expect(items[0]).not.toHaveAttribute('aria-current');
      expect(items[2]).not.toHaveAttribute('aria-current');
      expect(items[3]).not.toHaveAttribute('aria-current');
    });
  });

  describe('Completed step screen-reader text', () => {
    it('shows hidden "Completed" text for completed steps', () => {
      render(<ProgressIndicator currentStep={3} totalSteps={4} stepTitles={STEPS} />);
      const list = screen.getByRole('list', { name: 'Application steps' });
      const firstItem = within(list).getAllByRole('listitem')[0];
      expect(firstItem.textContent).toContain('Completed');
    });

    it('does not show "Completed" text for upcoming steps', () => {
      render(<ProgressIndicator currentStep={1} totalSteps={4} stepTitles={STEPS} />);
      const list = screen.getByRole('list', { name: 'Application steps' });
      const items = within(list).getAllByRole('listitem');
      // Steps 2, 3, 4 are upcoming — no "Completed" prefix
      expect(items[1].textContent).not.toContain('Completed');
      expect(items[2].textContent).not.toContain('Completed');
    });
  });
});

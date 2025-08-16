/**
 * Note: Testing library and framework
 * This test suite uses React Testing Library with a Jest-compatible API (describe/it/expect) under a jsdom environment.
 * If the project uses Vitest, these tests should still run as-is with @testing-library/react and Vitest's Jest-compatible globals.
 */

import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
// If your project uses user-event, consider swapping some fireEvent calls for userEvent for more realistic interactions.
// import userEvent from '@testing-library/user-event';

// Try common import paths for the component. Adjust if your component resides elsewhere.
import LandingPage from './LandingPage';

describe('LandingPage component', () => {
  const setup = () => {
    const onSelectService = jest.fn();
    render(<LandingPage onSelectService={onSelectService} />);
    return { onSelectService };
  };

  it('renders header and primary sections on initial load', () => {
    setup();

    expect(screen.getByText('GOV.UK')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Apply for Benefits and Support/i })).toBeInTheDocument();

    // Introductory heading
    expect(
      screen.getByRole('heading', { name: /Get financial support when you need it most/i })
    ).toBeInTheDocument();

    // Secure and confidential info blurb appears
    expect(screen.getByText(/Secure and confidential/i)).toBeInTheDocument();

    // Search input present
    expect(screen.getByPlaceholderText(/Search for services/i)).toBeInTheDocument();

    // Popular Services section visible initially (selectedCategory === 'all' && searchTerm === '')
    expect(screen.getByRole('heading', { name: /Popular Services/i })).toBeInTheDocument();

    // All Services heading also visible initially
    expect(screen.getByRole('heading', { name: /^All Services$/ })).toBeInTheDocument();
  });

  it('shows category chips with expected counts', () => {
    setup();

    // Based on the component's services array:
    // total 9; benefits 4; family 2; employment 1; education 1; transport 1
    expect(screen.getByRole('button', { name: /All Services \(9\)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Benefits & Support \(4\)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Family & Children \(2\)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Employment \(1\)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Education \(1\)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Transport \(1\)/i })).toBeInTheDocument();
  });

  it('filters services by search term and updates heading with result count', () => {
    setup();

    const input = screen.getByPlaceholderText(/Search for services/i);
    fireEvent.change(input, { target: { value: 'Child' } });

    // "Popular Services" should disappear when there is a search term
    expect(screen.queryByRole('heading', { name: /Popular Services/i })).not.toBeInTheDocument();

    // Heading reflects result count
    expect(screen.getByRole('heading', { name: /Search Results \(2\)/i })).toBeInTheDocument();

    // Two child-related services should appear
    expect(screen.getByText(/Apply for Child Benefit/i)).toBeInTheDocument();
    expect(screen.getByText(/Apply for Childcare Support/i)).toBeInTheDocument();

    // A benefit-only item should not be filtered in unless it matches "Child"
    expect(screen.queryByText(/Apply for Universal Credit/i)).not.toBeInTheDocument();
  });

  it('filters by category when category chip is selected', () => {
    setup();

    // Click Benefits & Support
    fireEvent.click(screen.getByRole('button', { name: /Benefits & Support \(4\)/i }));

    // Popular Services hidden when category != 'all'
    expect(screen.queryByRole('heading', { name: /Popular Services/i })).not.toBeInTheDocument();

    // Heading should be the category name
    expect(screen.getByRole('heading', { name: /Benefits & Support/i })).toBeInTheDocument();

    // Benefit services present
    expect(screen.getByText(/Apply for Universal Credit/i)).toBeInTheDocument();
    expect(screen.getByText(/Apply for Housing Benefit/i)).toBeInTheDocument();
    expect(screen.getByText(/Apply for Council Tax Support/i)).toBeInTheDocument();
    expect(screen.getByText(/Apply for Disability Benefits/i)).toBeInTheDocument();

    // Non-benefit (e.g., child benefit) should be filtered out
    expect(screen.queryByText(/Apply for Child Benefit/i)).not.toBeInTheDocument();
  });

  it('combines search + category filters', () => {
    setup();

    // Choose Family & Children
    fireEvent.click(screen.getByRole('button', { name: /Family & Children \(2\)/i }));

    // Now search only within family services
    const input = screen.getByPlaceholderText(/Search for services/i);
    fireEvent.change(input, { target: { value: 'childcare' } });

    // Only childcare support should remain
    expect(screen.getByText(/Apply for Childcare Support/i)).toBeInTheDocument();
    expect(screen.queryByText(/Apply for Child Benefit/i)).not.toBeInTheDocument();

    // Heading shows Search Results (1)
    expect(screen.getByRole('heading', { name: /Search Results \(1\)/i })).toBeInTheDocument();
  });

  it('displays empty state and can clear filters', () => {
    setup();

    const input = screen.getByPlaceholderText(/Search for services/i);
    fireEvent.change(input, { target: { value: 'no-such-service' } });

    // Empty state message appears
    expect(screen.getByText(/No services found matching your criteria/i)).toBeInTheDocument();

    // Clear filters button resets to show all
    fireEvent.click(screen.getByRole('button', { name: /Clear filters and show all services/i }));

    expect(screen.getByRole('heading', { name: /^All Services$/ })).toBeInTheDocument();
    // Popular Services becomes visible again after clearing
    expect(screen.getByRole('heading', { name: /Popular Services/i })).toBeInTheDocument();
  });

  it('enables only Universal Credit actions; other services are disabled and show "Coming soon"', () => {
    setup();

    // In Popular Services section, "Start now" should be enabled only for Universal Credit
    // Find the "Apply for Universal Credit" card within Popular Services grid
    const ucCard = screen.getByText(/Apply for Universal Credit/i).closest('div');
    expect(ucCard).toBeTruthy();
    // Its button should display "Start now" and be enabled
    const startNowButton = within(ucCard as HTMLElement).getByRole('button', { name: /Start now/i });
    expect(startNowButton).toBeEnabled();

    // Find a different popular service (e.g., Apply for Housing Benefit) - button should be disabled and say "Coming soon"
    const hbCard = screen.getByText(/Apply for Housing Benefit/i).closest('div');
    const comingSoonButtonPopular = within(hbCard as HTMLElement).getByRole('button', { name: /Coming soon/i });
    expect(comingSoonButtonPopular).toBeDisabled();

    // In All Services, Universal Credit shows "Start application" and enabled
    const ucAllCard = screen.getAllByText(/Apply for Universal Credit/i)[0].closest('div');
    const startApplicationBtn = within(ucAllCard as HTMLElement).getByRole('button', { name: /Start application/i });
    expect(startApplicationBtn).toBeEnabled();

    // A non-UC service in All Services shows Coming soon and disabled
    const pipCard = screen.getByText(/Apply for Disability Benefits/i).closest('div');
    const comingSoonButtonAll = within(pipCard as HTMLElement).getByRole('button', { name: /Coming soon/i });
    expect(comingSoonButtonAll).toBeDisabled();
  });

  it('invokes onSelectService with "universal-credit" from Popular Services section', () => {
    const { onSelectService } = setup();

    const ucCard = screen.getByText(/Apply for Universal Credit/i).closest('div');
    const startNowButton = within(ucCard as HTMLElement).getByRole('button', { name: /Start now/i });

    fireEvent.click(startNowButton);
    expect(onSelectService).toHaveBeenCalledTimes(1);
    expect(onSelectService).toHaveBeenCalledWith('universal-credit');
  });

  it('invokes onSelectService with "universal-credit" from All Services section', () => {
    const { onSelectService } = setup();

    const ucAllCard = screen.getAllByText(/Apply for Universal Credit/i)[0].closest('div');
    const startApplicationBtn = within(ucAllCard as HTMLElement).getByRole('button', { name: /Start application/i });

    fireEvent.click(startApplicationBtn);
    expect(onSelectService).toHaveBeenCalledTimes(1);
    expect(onSelectService).toHaveBeenCalledWith('universal-credit');
  });

  it('does not invoke onSelectService when clicking disabled "Coming soon" buttons', () => {
    const { onSelectService } = setup();

    // Popular Services section - select a non-UC item
    const hbCard = screen.getByText(/Apply for Housing Benefit/i).closest('div');
    const comingSoonButtonPopular = within(hbCard as HTMLElement).getByRole('button', { name: /Coming soon/i });
    expect(comingSoonButtonPopular).toBeDisabled();
    fireEvent.click(comingSoonButtonPopular);
    expect(onSelectService).not.toHaveBeenCalled();

    // All Services section - select a non-UC item
    const pipCard = screen.getByText(/Apply for Disability Benefits/i).closest('div');
    const comingSoonButtonAll = within(pipCard as HTMLElement).getByRole('button', { name: /Coming soon/i });
    expect(comingSoonButtonAll).toBeDisabled();
    fireEvent.click(comingSoonButtonAll);
    expect(onSelectService).not.toHaveBeenCalled();
  });

  it('displays expected time-to-complete metadata for a sample service', () => {
    setup();

    // Example: Student Finance says '40-60 minutes'
    const sfCard = screen.getByText(/Apply for Student Finance/i).closest('div')!;
    expect(within(sfCard).getByText(/Takes 40-60 minutes/i)).toBeInTheDocument();

    // Universal Credit says '30-45 minutes'
    const ucCard = screen.getAllByText(/Apply for Universal Credit/i)[0].closest('div')!;
    expect(within(ucCard).getByText(/Takes 30-45 minutes/i)).toBeInTheDocument();
  });

  it('shows "Popular" badge for popular services in All Services grid', () => {
    setup();

    // Popular services include Universal Credit, Housing Benefit, Child Benefit, Jobseeker's Allowance, Student Finance
    // Verify the badge appears at least for one known popular item in All Services
    const ucCard = screen.getAllByText(/Apply for Universal Credit/i)[0].closest('div')!;
    expect(within(ucCard).getByText(/^Popular$/i)).toBeInTheDocument();
  });
});
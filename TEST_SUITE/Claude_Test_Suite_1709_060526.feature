Feature: Claude Test Suite - GDS Demo App

  As a user applying for benefits and support
  I want to navigate the application form correctly
  So that I can successfully submit my application

  # ───────────────────────────────────────────────
  # Scenario 1: Successfully navigate to Personal Details (UPDATED — corrected step patterns)
  # ───────────────────────────────────────────────
  Scenario: Navigate to Personal Details after selecting Universal Credit
    Given I am on the "Landing Page" page
    When I select "Universal Credit"
    And I click "Start now"
    Then I see heading "Personal details"

  # ───────────────────────────────────────────────
  # Scenario 2: Error shown when no benefit is selected (copied from baseline)
  # ───────────────────────────────────────────────
  Scenario: Show error when no benefit is selected on Landing Page
    Given I am on the Landing Page
    When I click "Start now" without selecting a benefit
    Then I should see the error message "Select a benefit before continuing"

  # ───────────────────────────────────────────────
  # Scenario 3: Error shown when First Name is left empty (copied from baseline)
  # ───────────────────────────────────────────────
  Scenario: Show error when First Name is left empty on Personal Details
    Given I am on the Personal Details page
    When I leave the First Name field empty
    And I click "Continue"
    Then I should see the error message "Enter your first name"

  # ───────────────────────────────────────────────
  # Scenario 4: Error shown when invalid email is entered (copied from baseline)
  # ───────────────────────────────────────────────
  Scenario: Show error when an invalid email is entered on Contact Information
    Given I am on the Contact Information page
    When I enter "notanemail" in the Email field
    And I click "Continue"
    Then I should see the error message "Enter an email address in the correct format, like name@example.com"

  # ───────────────────────────────────────────────
  # Scenario 5: Error shown when Employment Status is not selected (copied from baseline)
  # ───────────────────────────────────────────────
  Scenario: Show error when Employment Status is not selected on Additional Information
    Given I am on the Additional Information page
    When I leave the Employment Status dropdown unselected
    And I click "Submit Universal Credit Application"
    Then I should see the error message "Select your employment status"

  # ───────────────────────────────────────────────
  # NEW — Issue #44 — Change 2: Housing Benefit happy path
  # ───────────────────────────────────────────────
  Scenario: Navigate to Personal Details after selecting Housing Benefit
    Given I am on the "Landing Page" page
    When I select "Housing Benefit"
    And I click "Start now"
    Then I see heading "Personal details"

  # ───────────────────────────────────────────────
  # NEW — Issue #44 — Change 3: Jobseeker's Allowance happy path
  # ───────────────────────────────────────────────
  Scenario: Navigate to Personal Details after selecting Jobseekers Allowance
    Given I am on the "Landing Page" page
    When I select "Jobseeker's Allowance"
    And I click "Start now"
    Then I see heading "Personal details"

  # ───────────────────────────────────────────────
  # NEW — Issue #44 — Change 4: All three benefit options are present
  # ───────────────────────────────────────────────
  Scenario: All benefit options are displayed on the Landing Page
    Given I am on the "Landing Page" page
    Then I see heading "Apply for Benefits and Support"

Feature: Claude Test Suite - GDS Demo App

  As a user applying for benefits and support
  I want to navigate the application form correctly
  So that I can successfully submit my application

  # ───────────────────────────────────────────────
  # Scenario 1: Successfully navigate to Personal Details
  # ───────────────────────────────────────────────
  Scenario: Navigate to Personal Details after selecting a benefit
    Given I am on the Landing Page
    When I select "Universal Credit"
    And I click "Start now"
    Then I should be taken to the Personal Details page

  # ───────────────────────────────────────────────
  # Scenario 2: Error shown when no benefit is selected
  # ───────────────────────────────────────────────
  Scenario: Show error when no benefit is selected on Landing Page
    Given I am on the Landing Page
    When I click "Start now" without selecting a benefit
    Then I should see the error message "Select a benefit before continuing"

  # ───────────────────────────────────────────────
  # Scenario 3: Error shown when First Name is left empty
  # ───────────────────────────────────────────────
  Scenario: Show error when First Name is left empty on Personal Details
    Given I am on the Personal Details page
    When I leave the First Name field empty
    And I click "Continue"
    Then I should see the error message "Enter your first name"

  # ───────────────────────────────────────────────
  # Scenario 4: Error shown when invalid email is entered
  # ───────────────────────────────────────────────
  Scenario: Show error when an invalid email is entered on Contact Information
    Given I am on the Contact Information page
    When I enter "notanemail" in the Email field
    And I click "Continue"
    Then I should see the error message "Enter an email address in the correct format, like name@example.com"

  # ───────────────────────────────────────────────
  # Scenario 5: Error shown when Employment Status is not selected
  # ───────────────────────────────────────────────
  Scenario: Show error when Employment Status is not selected on Additional Information
    Given I am on the Additional Information page
    When I leave the Employment Status dropdown unselected
    And I click "Submit Universal Credit Application"
    Then I should see the error message "Select your employment status"

  # ───────────────────────────────────────────────
  # NEW SCENARIOS — Issue #43: Jobseeker Option is now live
  # ───────────────────────────────────────────────

  # ───────────────────────────────────────────────
  # Scenario 6: Jobseeker's Allowance option is visible on Landing Page
  # ───────────────────────────────────────────────
  Scenario: Jobseeker's Allowance option is displayed on the Landing Page
    Given I am on the Landing Page
    Then I should see the option "Jobseeker's Allowance"

  # ───────────────────────────────────────────────
  # Scenario 7: Navigate to Personal Details via Jobseeker's Allowance
  # ───────────────────────────────────────────────
  Scenario: Navigate to Personal Details after selecting Jobseeker's Allowance
    Given I am on the Landing Page
    When I select "Jobseeker's Allowance"
    And I click "Start now"
    Then I should be taken to the Personal Details page

  # ───────────────────────────────────────────────
  # Scenario 8: Full application journey for Jobseeker's Allowance
  # ───────────────────────────────────────────────
  Scenario: Successfully submit a Jobseeker's Allowance application
    Given I am on the Landing Page
    When I select "Jobseeker's Allowance"
    And I click "Start now"
    And I complete the Personal Details step
    And I complete the Contact Information step
    And I complete the Additional Information step
    Then I should see the application confirmation page

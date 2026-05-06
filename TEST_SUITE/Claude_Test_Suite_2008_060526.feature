Feature: Claude Test Suite - Issue #42 - Housing Benefit Option

  As a user applying for benefits and support
  I want to be able to select Housing Benefit on the Landing Page
  So that I can begin my Housing Benefit application

  # ───────────────────────────────────────────────
  # Scenario 1: Successfully navigate to Personal Details via Housing Benefit
  # ───────────────────────────────────────────────
  Scenario: Navigate to Personal Details after selecting Housing Benefit
    Given I am on the Landing Page
    When I select "Housing Benefit"
    And I click "Start now"
    Then I should be taken to the Personal Details page

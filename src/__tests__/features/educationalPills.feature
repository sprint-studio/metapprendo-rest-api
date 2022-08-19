Feature: CompanyEducationalPills

  Scenario: Create new company educational pill
    When The MetApprendo admin send a request to create a company educational pill
    Then The system send a successful confirmation

  Scenario: Try to create new company educational pill with missing value idPillola
    When The MetApprendo admin send a request to create a company educational pill without idPillola
    And The system return an error about the missing parameter

  Scenario: Try to create new company educational pill with missing value titolo
    When The MetApprendo admin send a request to create a company educational pill without titolo
    And The system return an error about the missing parameter

Feature: CompanyEducationalAgendas

  Scenario: Create new company educational agenda
    When The MetApprendo admin sends a request to create a company educational agenda
    Then The system send a successful confirmation

  Scenario: Try to create new company educational agenda with missing value obbligatorieta
    When The MetApprendo admin sends a request to create a company educational agenda without obbligatorieta
    Then The system return an error about the missing parameter

  Scenario: Try to create new company educational agenda with missing value periodicita
    When The MetApprendo admin sends a request to create a company educational agenda without periodicita
    Then The system return an error about the missing parameter

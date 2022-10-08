Feature: CompanyEducationalPaths

  Scenario: Create new company educational path
    When The MetApprendo admin sends a request to create a company educational path
    Then The system send a successful confirmation

  Scenario: Try to create new company educational path with missing value idPercorso
    When The MetApprendo admin sends a request to create a company educational agenda without idPercorso
    Then The system return an error about the missing parameter

  Scenario: Try to create new company educational path with missing value titolo
    When The MetApprendo admin sends a request to create a company educational agenda without titolo
    Then The system return an error about the missing parameter

  Scenario: Try to create new company educational path with missing value formazione
    When The MetApprendo admin sends a request to create a company educational agenda without formazione
    Then The system return an error about the missing parameter


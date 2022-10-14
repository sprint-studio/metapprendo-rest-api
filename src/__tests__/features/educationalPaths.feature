Feature: CompanyEducationalPaths

  Scenario: Create new company educational path
    When The MetApprendo admin sends a request to create a company educational path
    Then The system send a successful confirmation

 Scenario: Try to create new company educational path without a body
    When The MetApprendo admin sends a request to create a company educational path without a body
    Then The system return an error telling that body is mandatory

  Scenario: Try to create new company educational path with missing value idPath
    When The MetApprendo admin sends a request to create a company educational path without 'idPath'
    Then The system return an error about the missing property 'idPath'

  Scenario: Try to create new company educational path with missing value titolo
    When The MetApprendo admin sends a request to create a company educational path without 'titolo'
    Then The system return an error about the missing property 'titolo'

  Scenario: Try to create new company educational path with missing value descrizione
    When The MetApprendo admin sends a request to create a company educational path without 'descrizione'
    Then The system return an error about the missing property 'descrizione'

  Scenario: Try to create new company educational path with missing value idCompany
    When The MetApprendo admin sends a request to create a company educational path without 'idCompany'
    Then The system return an error about the missing property 'idCompany'

  Scenario: Try to create new company educational path with missing value data
    When The MetApprendo admin sends a request to create a company educational path without 'data'
    Then The system return an error about the missing property 'data'





Feature: CompanyEducationalAgendas

  Scenario: Create new company educational agenda
    When The MetApprendo admin send a request to create a company educational agenda providing all mandatory data
    Then The system send a successful confirmation

  Scenario: Try to create new company educational agenda without a body
    When The MetApprendo admin send a request to create a company educational agenda without a body
    Then The system return an error telling that body is mandatory

  Scenario: Try to create new company educational agenda with missing value idTask
    When The MetApprendo admin send a request to create a company educational agenda without 'idTask'
    Then The system return an error about the missing property 'idTask'

  Scenario: Try to create new company educational agenda with missing value idWorker
    When The MetApprendo admin send a request to create a company educational agenda without 'idWorker'
    Then The system return an error about the missing property 'idWorker'

  Scenario: Try to create new company educational agenda with missing value idPill
    When The MetApprendo admin send a request to create a company educational agenda without 'idPill'
    Then The system return an error about the missing property 'idPill'
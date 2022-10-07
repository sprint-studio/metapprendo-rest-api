Feature: Users

  Scenario: Disable an user from the system
    When The MetApprendo admin send a request to disable a specific user
    Then The system send a successful confirmation


  Scenario: Create a new user in the blockchain
    When The MetApprendo admin send a request to create an user
    Then The system send a successful confirmation

  Scenario: Create a new Company without passing userId
    When The MetApprendo admin send a request without userId
    Then The System respond with a error messages telling to pass mandatory data

  Scenario: Create a new Company without passing fullName
    When The MetApprendo admin send a request without fullName
    Then The System respond with a error messages telling to pass mandatory data

  Scenario: Create a new Company without passing dataNascita
    When The MetApprendo admin send a request without dataNascita
    Then The System respond with a error messages telling to pass mandatory data

  Scenario: Create a new Company without passing username
    When The MetApprendo admin send a request without username
    Then The System respond with a error messages telling to pass mandatory data

  Scenario: Update user dossier
    When The MetApprendo admin send a request to update an user dossier
    Then The system send a successful confirmation

  Scenario: Update user dossier without idTask
    When The MetApprendo admin send a request to update an user dossier without idTask
    Then The System respond with a error messages telling to pass mandatory data

Feature: Users

  Scenario: Disable an user from the system
    When The MetApprendo admin sends a request to disable a specific user
    Then The system send a successful confirmation


  Scenario: Create a new user in the blockchain
    When The MetApprendo admin sends a request to create an user
    Then The system send a successful confirmation

  Scenario: Create a new Company without passing userId
    When The MetApprendo admin sends a request without userId
    Then The System respond with a error messages telling to pass mandatory data

  Scenario: Create a new Company without passing fullName
    When The MetApprendo admin sends a request without fullName
    Then The System respond with a error messages telling to pass mandatory data

  Scenario: Create a new Company without passing dataNascita
    When The MetApprendo admin sends a request without dataNascita
    Then The System respond with a error messages telling to pass mandatory data

  Scenario: Create a new Company without passing username
    When The MetApprendo admin sends a request without username
    Then The System respond with a error messages telling to pass mandatory data

  @filesystem
  Scenario: Update user dossier
    When The MetApprendo admin sends a request to update dossier for "user1"
    Then The system send a successful transaction response with the same body provided
    And The dossier gets saved in the blockchain
    And The new files of the dossier for user "user1" get saved in the local filesystem

  @filesystem
  Scenario: Update user dossier with files that already exist
    When The MetApprendo admin sends a request to update dossier for "user1" specifying file names that already exist
    Then The system send a successful transaction response with the same body provided
    And The dossier gets saved in the blockchain
    And The new files of the dossier for user "user1" get saved in the local filesystem

  Scenario: Update user dossier with duplicate filenames
    When The MetApprendo admin sends a request to update an user dossier containing duplicated filenames
    Then The System respond with a error messages telling that the dossier contains duplicated filenames

  @filesystem
  Scenario: Retrieve user dossier
    When The MetApprendo admin sends a request to retrieve an user dossier for "user1"
    Then The dossier for user "user1" is returned

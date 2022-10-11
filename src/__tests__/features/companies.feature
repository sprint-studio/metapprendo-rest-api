Feature: Companies

    Scenario: Authorize a specific user to be the company's group admin
        When The MetApprendo admin sends a request to authorize a specific user
        And The system send a successful confirmation

    Scenario: Try to authorize a user to be the company's group admin but without passing a user id
        When The MetApprendo admin sends a request to authorize a specific user without passing a user id
        And The system return an error about the missing parameter


    # Scenarios aboutCreate new company scenarios
    Scenario: Create a new Company to add new workers
        When The MetApprendo admin sends a request with all mandatory data to create a new Company
        And The System create a transaction into the Blockchain and a send a successful response

    Scenario: Create a new Company without passing any data
        When The MetApprendo admin sends a request without any data
        And The System respond with a error messages telling to pass mandatory data

    Scenario: Create a new Company without passing companyName
        When The MetApprendo admin sends a request without companyName
        And The System respond with a error messages telling that companyName is mandatory

    Scenario: Create a new Company without passing CUA
        When The MetApprendo admin sends a request without CUA
        And The System respond with a error messages telling that CUA is mandatory

    Scenario: Create a new Company without passing PIVA
        When The MetApprendo admin sends a request without PIVA
        And The System respond with a error messages telling that PIVA is mandatory

    Scenario: Create a new Company without passing CF
        When The MetApprendo admin sends a request without CF
        And The System respond with a error messages telling that CF is mandatory


    # Scenarios about Associate a worker to a provided company
    Scenario: Associate a worker to a provided company
        When The company admin sends a request passing companyId and userId
        And The system add the user associated to userId to the provided company associated to companyId creating a Blockchain transaction and returning it

    Scenario: Associate a worker to a provied company without specifing the company
        When The company admin sends a request without passing companyId
        And The system return an error message telling that companyId is mandatory

    Scenario: Associate a worker to a provided company without specifing the userId
        When The company admin sends a request without passing userId
        And The system return an error message telling that userId is mandatory


    # Scenario about dissociate a worker from a provided company
    Scenario: Dissociate a worker from a provided company
        When The company admin sends a request passing companyId and userId
        And The system make a Blockchain transaction to record that the user is dissociated from the company

    Scenario: Try to dissociate a worker without passing userId
        When The company admin sends a request passing companyId but not userId
        And The system return an error message telling that userId is mandatory

    Scenario: Try to dissociate a worker without passing companyId
        When The company admin sends a request passing userId but not companyId
        And The system return an error message telling that the companyId is mandatory


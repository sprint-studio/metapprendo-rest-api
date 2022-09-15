Feature: Companies

    Scenario: Authorize a specific user to be the company's group admin
        When The MetApprendo admin send a request to authorize a specific user
        And The system send a successful confirmation 
    
    Scenario: Try to authorize a user to be the company's group admin but without passing a user id
        When The MetApprendo admin send a request to authorize a specific user without passing a user id
        And The system return an error about the missing parameter


    # Scenarios aboutCreate new company group scenarios
    Scenario: Create a new Company group to add new workers
        When The MetApprendo Admin send a request with all mandatory data to create a new Company group
        And The System create a transaction into the Blockchain and a send a successful response
    
    Scenario: Create a new Company group without passing any data
        When The MetApprendo admin send a request without any data
        And The System respond with a error messages telling to pass mandatory data

    Scenario: Create a new Company group without passing ragioneSociale
        When The MetApprendo admin send a request without ragioneSociale
        And The System respond with a error messages telling that ragioneSociale is mandatory
    
    Scenario: Create a new Company group without passing CUA
        When The MetApprendo admin send a request without CUA
        And The System respond with a error messages telling that CUA is mandatory

    Scenario: Create a new Company group without passing PIVA
        When The MetApprendo admin send a request without PIVA
        And The System respond with a error messages telling that PIVA is mandatory
    
    Scenario: Create a new Company group without passing CF
        When The MetApprendo admin send a request without CF
        And The System respond with a error messages telling that CF is mandatory

    
    # Scenarios about Associate a worker to a provided company group
    Scenario: Associate a worker to a provided company group
        When The company group admin send a request passing companyId and userId 
        And The system add the user associated to userId to the provided company group associated to companyId creating a Blockchain transaction and returning it
    
    Scenario: Associate a worker to a provied company group without specifing the company group
        When The company group admin send a request without passing companyId
        And The system return an error message telling that companyId is mandatory
    
    Scenario: Associate a worker to a provided company group without specifing the userId
        When The company group admin send a request without passing userId
        And The system return an error message telling that userId is mandatory


    # Scenario about dissociate a worker from a provided company group
    Scenario: Dissociate a worker from a provided company group
        When The company group admin send a request passing companyId and userId
        And The system make a Blockchain transaction to record that the user is dissociated from the company group
    
    Scenario: Try to dissociate a worker without passing userId
        When The company group admin send a request passing companyId but not userId
        And The system return an error message telling that userId is mandatory
    
    Scenario: Try to dissociate a worker without passing companyId
        When The company group admin send a request passing userId but not companyId
        And The system return an error message telling that the companyId is mandatory
    

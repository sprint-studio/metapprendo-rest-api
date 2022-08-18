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
        When The company group admin send a request passing idAzienda and idUtente 
        And The system add the user associated to idUtente to the provided company group associated to idAzienda creating a Blockchain transaction and returning it
    
    Scenario: Associate a worker to a provied company group without specifing the company group
        When The company group admin send a request without passing idAzienda
        And The system respond with an error message telling that idAzienda must be provided as parameter
    
    Scenario: Associate a worker to a provided company group without specifing the idUtente
        When The company group admin send a request without passing idUtente
        And The system respond with an error message telling that idUtente must be provided as parameter


    # Scenario about dissociate a worker from a provided company group
    Scenario: Dissociate a worker from a provided company group
        When The company group admin send a request passing idAzienda and idUtente
        And The system make a Blockchain transaction to record that the user is dissociated from the company group
    
    Scenario: Try to dissociate a worker without passing idUtente
        When The company group admin send a request passing idAzienda but not idUtente
        And The system return an error message telling that idUtente is mandatory
    
    Scenario: Try to dissociate a worker without passing idAzienda
        When The company group admin send a request passing idUtente but not idAzienda
        And The system return an error message telling that the idAzienda is mandatory
    

Feature: Groups 

    Scenario: Create new Company Group
        When The MetApprendo admin send a request with all necessary informations to create a Company Group
        Then The system create a new Company Group making new transaction on the Blockchain and return the informations
    
    Scenario: Try to create new Company Group without idGruppo
        When The MetApprendo admin send a request without idGruppo
        Then The System respond with an error telling that idGruppo is mandatory

    Scenario: Try to create a Company Group without nome
        When The MetApprendo Admin send a request without nome property into the body
        Then The System respond with an error telling that nome is mandatory
    
    Scenario: Try to create a Company Group without descrizione
        When The MetApprendo Admin send a request without descrizione property into the body
        Then The System respond with an error telling that descrizione is mandatory
    
    Scenario: Try to create a Company Group without stato
        When The MetApprendo Admin send a request without stato property into the body
        Then The System respond with an error telling that stato is mandatory

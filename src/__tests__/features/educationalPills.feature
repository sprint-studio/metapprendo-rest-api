Feature: Educational Pills

    Scenario: Create new Educational Pills
        When The MetApprendo admin send a request with all necessary informations to create an Educational Pills 
        Then The system create a new Educational Pills making new transaction on the Blockchain and return the informations
    
    Scenario: Try to create new Educational Pills without idPillola
        When The MetApprendo admin send a request without idPillola
        Then The System respond with an error telling that idPillola is mandatory

    Scenario: Try to create a Educational Pills without nome
        When The MetApprendo Admin send a request without nome property into the body
        Then The System respond with an error telling that nome is mandatory
    
    Scenario: Try to create a Educational Pills without descrizione
        When The MetApprendo Admin send a request without descrizione property into the body
        Then The System respond with an error telling that descrizione is mandatory
    
    Scenario: Try to create a Educational Pills without stato
        When The MetApprendo Admin send a request without stato property into the body
        Then The System respond with an error telling that stato is mandatory

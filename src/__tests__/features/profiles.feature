Feature: Profiles

    Scenario: Create a new Profile
        When The MetApprendo admin sends a request with all necessary informations
        Then The system create a new profile making new transaction on the Blockchain and return the transaction informations

    Scenario: Try to create a Profile without idProfilo
        When The MetApprendo admin sends a request without idProfilo property into the body
        Then The System respond with an error telling that idProfilo is mandatory

    Scenario: Try to create a Profile without nome
        When The MetApprendo admin sends a request without nome property into the body
        Then The System respond with an error telling that nome is mandatory

    Scenario: Try to create a Profile without descrizione
        When The MetApprendo admin sends a request without descrizione property into the body
        Then The System respond with an error telling that descrizione is mandatory

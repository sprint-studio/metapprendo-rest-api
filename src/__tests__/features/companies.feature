Feature: Companies

    Scenario: Authorize a specific user to be the company's  for "Acme"
        When an existing user is assigned to be admin of an existing company  "Acme"
        Then It becomes admin of the company  "Acme"
    
    Scenario: Try to authorize a user to be the company's  admin but without passing a user id
        When The MetApprendo admin send a request to authorize a specific user without passing a "userId"
        Then The system return an error telling "userId" is mandatory
    
    Scenario: Try to authorize a user to be the company's  admin but passing a company id related to a company that dosn't exist
        When The MetApprendo admin send a request to authorize a specific user to be the company admin of "Acme" but the company doesn't exist
        Then The system return an error telling that the company "Acme" doesn't exist 

    # Scenarios aboutCreate new company  scenarios
    Scenario: Create a new Company
        When The MetApprendo Admin send a request with all mandatory data to create a new Company
        Then The System create a transaction into the Blockchain and a send a successful response
    
    Scenario: Create a new Company  without passing any data
        When The MetApprendo admin send a request without a body
        Then The System respond with a error with statusCode "400" and a message telling to pass a body

    Scenario: Create a new Company  without passing companyName
        When The MetApprendo admin send a request without "companyName"
        Then The System respond with a error with statusCode "422" and a message telling that "companyName" is mandatory
    
    Scenario: Create a new Company  without passing CUA
        When The MetApprendo admin send a request without "CUA"
        Then The System respond with a error with statusCode "422" and a message telling that "CUA" is mandatory

    Scenario: Create a new Company  without passing PIVA
        When The MetApprendo admin send a request to create a company named "Acme" without passing "PIVA"
        Then The System respond with statusCode "200" returning the created company named "Acme"
    
    Scenario: Create a new Company  without passing CF
        When The MetApprendo admin send a request to create a company named "Acme" without passing "CF"
        Then The System respond with statusCode "200" returning the created company named "Acme"

    
    # Scenarios about Associate a worker to a provided company 
    Scenario: Associate a worker to a provided company
        When The company  admin send a request passing companyId "acme123" and userId "user123" to associate the user from the company
        Then The system add the user with userId "user123" to the provided company with id "acme123" creating a Blockchain transaction and returning it
    
    Scenario: Associate a worker to a provied company  without specifing the company 
        When The company  admin send a request without passing "companyId" to associate the user to the company
        Then The system return an error message telling that "companyId" is mandatory
    
    Scenario: Associate a worker to a provided company  without specifing the userId
        When The company  admin send a request without passing "userId" to associate the user to the company
        Then The system return an error message telling that "userId" is mandatory


    # Scenario about dissociate a worker from a provided company 
    Scenario: Dissociate a worker from a provided company 
        When The company  admin send a request passing "companyId" and "userId" to dissociate the user from the company
        Then The system make a Blockchain transaction to record that the user is dissociated from the company 
    
    Scenario: Try to dissociate a worker without passing userId
        When The company  admin send a request passing "companyId" but not "userId" to dissociate the user from the company
        Then The system return an error message telling that "userId" is mandatory
    
    Scenario: Try to dissociate a worker without passing companyId
        When The company  admin send a request passing "userId" but not "companyId" to dissociate the user from the company
        Then The system return an error message telling that "companyId" is mandatory
    

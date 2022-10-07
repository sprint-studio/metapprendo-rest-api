Feature: Admin

  Scenario: Get the Admin user MetApprendo
    When The MetApprendo Admin user is requested
    And I should receive the user with name "MetApprendo Admin"


  Scenario: Çreate the Admin user MetApprendo
    When The MetApprendo Admin user is created
    Then I should receive the user with name "MetApprendo Admin"

  Scenario: Assign an user to be Admin of a Company
    When an existing user is assigned to be admin of an existing company "test"
    Then It becomes admin of the company "test"

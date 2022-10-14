Feature: Admin

  Scenario: Get the Admin user MetApprendo
    When The MetApprendo Admin user is requested
    And I should receive the user with name "MetApprendo Admin"


  Scenario: Çreate the Admin user MetApprendo
    When The MetApprendo Admin user is created
    Then I should receive the user with name "MetApprendo Admin"
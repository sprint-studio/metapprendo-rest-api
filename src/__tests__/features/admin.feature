Feature: Admin

  Scenario: Get the Admin user MetApprendo
    When the MetApprendo Admin user is requested
    Then I should receive the user with name "MetApprendo Admin"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { when, then, binding } from "@lynxwall/cucumber-tsflow";
import { expect } from "chai";
import EndpointsManager from "../../../services/endpointsManager.service";
import { USER, COMPANY, ERRORS } from "../mock-data";
import { TestSetup } from "./test-setup";

@binding()
export class CompanyTestScenario extends TestSetup {
  /**
   * Scenario: Authorize a specific user to be the company's for "Acme"
   */
  @when(
    "an existing user is assigned to be admin of an existing company {string}"
  )
  async assignUserAsAdmin(company: string) {
    const res = await this.client
      .post(EndpointsManager.companyAdminEndpoint(company))
      .send({
        userId: USER.userId,
        fullName: USER.userId,
      })
      .expect(200);

    const { userId, fullName } = res.body;

    this.user = {
      userId,
      fullName,
    };
  }

  @then("It becomes admin of the company {string}")
  public userBecameAdmin(company: string) {
    expect(this.user.userId).to.be.equal(USER.userId);
    expect(this.user.fullName).to.be.equal(USER.fullName);
  }

  /**
   * Scenario:
   * Try to authorize a user to be the company's admin but without passing a user id
   */

  @when(
    "The MetApprendo admin sends a request to authorize a specific user without passing a {string}"
  )
  public async assignUserAsAdminWithoutProperty(property: string) {
    const res = await this.client
      .post(EndpointsManager.companyAdminEndpoint(COMPANY.companyId))
      .send({});

    this.error = res.body.error;
  }

  @then("The system return an error telling {string} is mandatory")
  public async mandatoryProperty(property: string) {
    expect(this.error.statusCode).to.be.equal(
      ERRORS.missingBodyParameter.statusCode
    );
    expect(this.error.code).to.be.equal(ERRORS.missingBodyParameter.code);
    expect(this.error.details[0].info.missingProperty).to.be.equal(property);
  }

  /**
   * Scenario: Try to authorize a user to be the company's admin but passing a
   * company id related to a company that dosn't exist
   **/
  @when(
    "The MetApprendo admin sends a request to authorize a specific user to be the company admin of {string} but the company doesn't exist"
  )
  public async tryToAssignAdminWithUndefinedCompany(companyId: string) {
    const res = await this.client
      .post(EndpointsManager.companyAdminEndpoint(companyId))
      .send(USER);

    this.error = res.body.error;
  }

  @then(
    "The system return an error telling that the company {string} doesn't exist"
  )
  public async companyRequestedUndefined(companyId: string) {
    expect(this.error.statusCode).to.be.equal(404);
    expect(this.error.name).to.be.equal("Request entity not found");
  }

  /**
   * Scenario: Create a new Company
   */
  @when(
    "The MetApprendo Admin sends a request with all mandatory data to create a new Company"
  )
  public async createNewCompanty() {
    const res = await this.client
      .post(EndpointsManager.createCompanyEndpoint(COMPANY.companyId))
      .send(COMPANY);

    this.response = res;
  }

  @then(
    "The service execute a transaction into the Blockchain and a send a successful response"
  )
  public async createCompanySuccess() {
    expect(this.response.statusCode).to.be.equal(200);
    expect(this.response.body.companyId).to.be.equal(COMPANY.companyId);
  }

  /**
   * Scenario: Create a new Company without passing any data
   */
  @when("The MetApprendo admin sends a request without a body")
  public async createACompanyWithoutRequestBody() {
    const res = await this.client.post(
      EndpointsManager.createCompanyEndpoint(COMPANY.companyId)
    );

    this.error = res.body.error;
  }

  @then(
    "The System respond with a error with status code {string} and a message telling to pass a body"
  )
  public async requestBodyMandatory(statusCode: number) {
    expect(this.error.statusCode).to.be.equal(statusCode);
    expect(this.error.message).to.be.equal(ERRORS.missingBody.message);
  }

  /**
   * Create a new Company without passing companyName
   */
  @when("The MetApprendo admin sends a request without a {string}")
  public async createACompanyWithoutMandatoryParameter(parameter: string) {
    const res = await this.client
      .post(EndpointsManager.createCompanyEndpoint(COMPANY.companyId))
      .send({});

    this.response = res.body;
  }

  @then(
    "The System respond with a error with statusCode {string} and a message telling that {string} is mandatory"
  )
  public async propertyIsMandatory(statusCode: number, parameter: string) {
    expect(this.response.error.statusCode).to.be.equal(statusCode);
    expect(this.response.error.details[0].missingProperty).to.be.equal(
      parameter
    );
  }

  @then(
    "The System respond with statusCode {string} returning the created company named {string}"
  )
  public async propertyIsNotMandatory(statusCode: number, companyName: string) {
    expect(this.response.statusCode).to.be.equal(statusCode);
    expect(this.response.body.payload.companyName).to.be.equal(companyName);
  }

  /**
   * Scenarios about Associate a worker to a provided company
   */
  @when("The company admin sends a request passing {string} and {string}")
  async associateWorkerToCompany(companyId: string, userId: string) {
    const res = await this.client.post(
      EndpointsManager.addWorkerToCompanyEndpoint(companyId, userId)
    );

    this.response = res;
  }

  @then(
    "The system add the user with userId {string} to the provided company with id {string} creating a Blockchain transaction and returning it"
  )
  public async associateWorkerToCompanySuccess(
    userId: string,
    companyId: string
  ) {
    expect(this.response.body.payload.userId).to.be.equal(userId);
    expect(this.response.body.payload.companyId).to.be.equal(companyId);
  }

  @when("The company admin sends a request without passing {string}")
  public async associateWorkerToCompanyWithoutUserid(userId: string) {
    const res = await this.client.post(
      EndpointsManager.addWorkerToCompanyEndpoint(COMPANY.companyId, "")
    );

    this.response = res;
  }

  @then("The system return an error message telling that {string} is mandatory")
  public async associateWorkerToCompanyMandatoryParameter(parameter: string) {
    expect(this.response.body.error.statusCode).to.be.equal(
      ERRORS.missingBodyParameter.statusCode
    );
    expect(this.error.body.error.details[0].info.missingProperty).to.be.equal(
      parameter
    );
  }
}

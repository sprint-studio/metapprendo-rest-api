/* eslint-disable @typescript-eslint/no-explicit-any */
import { when, then, binding } from "cucumber-tsflow";
import { expect } from "chai";
import EndpointsManager from "../../../services/endpointsManager.service";
import { USER, COMPANY, ERRORS } from "./mock-data";
import TestSetup from "./test-setup";

@binding()
export class CompanyTestScenario extends TestSetup {
  /**
   * Scenario: Authorize a specific user to be the company's for /Acme/
   */
  @when(
    /an existing user is assigned to be admin of an existing company '(\d*)'/
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

  @then(/It becomes admin of the company '(\d*)'/)
  public userBecameAdmin(company: string) {
    expect(this.user.userId).to.be.equal(USER.userId);
    expect(this.user.fullName).to.be.equal(USER.fullName);
  }

  /**
   * Scenario:
   * Try to authorize a user to be the company's admin but without passing a user id
   */

  @when(
    /The MetApprendo admin send a request to authorize a specific user without passing a '(d*)'/
  )
  public async assignUserAsAdminWithoutProperty(property: string) {
    const res = await this.client
      .post(EndpointsManager.companyAdminEndpoint(COMPANY.companyId))
      .send({});

    this.error = res.body.error;
  }

  @then(/The system return an error telling '(d*)' is mandatory/)
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
    /The MetApprendo admin send a request to authorize a specific user to be the company admin of '(d*)' but the company doesn't exist/
  )
  public async tryToAssignAdminWithUndefinedCompany(companyId: string) {
    const res = await this.client
      .post(EndpointsManager.companyAdminEndpoint(companyId))
      .send(USER);

    this.error = res.body.error;
  }

  @then(
    /The system return an error telling that the company '(d*)' doesn't exist/
  )
  public async companyRequestedUndefined(companyId: string) {
    expect(this.error.statusCode).to.be.equal(404);
    expect(this.error.name).to.be.equal(/Request entity not found/);
  }

  /**
   * Scenario: Create a new Company
   */
  @when(
    /The MetApprendo Admin send a request with all mandatory data to create a new Company/
  )
  public async createNewCompanty() {
    const res = await this.client
      .post(EndpointsManager.createCompanyEndpoint(COMPANY.companyId))
      .send(COMPANY);

    this.response = res;
  }

  @then(
    /The service execute a transaction into the Blockchain and a send a successful response/
  )
  public async createCompanySuccess() {
    expect(this.response.statusCode).to.be.equal(200);
    expect(this.response.body.companyId).to.be.equal(COMPANY.companyId);
  }

  /**
   * Scenario: Create a new Company without passing any data
   */
  @when(/The MetApprendo admin send a request without a body/)
  public async createACompanyWithoutRequestBody() {
    const res = await this.client.post(
      EndpointsManager.createCompanyEndpoint(COMPANY.companyId)
    );

    this.error = res.body.error;
  }

  @then(
    /The System respond with a error with status code '(d*)' and a message telling to pass a body/
  )
  public async requestBodyMandatory(statusCode: number) {
    expect(this.error.statusCode).to.be.equal(statusCode);
    expect(this.error.message).to.be.equal(ERRORS.missingBody.message);
  }

  /**
   * Create a new Company without passing companyName
   */
  @when(/The MetApprendo admin send a request without a '(d*)'/)
  public async createACompanyWithoutMandatoryParameter(parameter: string) {
    const res = await this.client
      .post(EndpointsManager.createCompanyEndpoint(COMPANY.companyId))
      .send({});

    this.response = res.body;
  }

  @then(
    /The System respond with a error with statusCode '(d*)' and a message telling that '(d*)' is mandatory/
  )
  public async propertyIsMandatory(statusCode: number, parameter: string) {
    expect(this.response.error.statusCode).to.be.equal(statusCode);
    expect(this.response.error.details[0].missingProperty).to.be.equal(
      parameter
    );
  }

  @then(
    /The System respond with statusCode '(d*)' returning the created company named '(d*)'/
  )
  public async propertyIsNotMandatory(statusCode: number, companyName: string) {
    expect(this.response.statusCode).to.be.equal(statusCode);
    expect(this.response.body.payload.companyName).to.be.equal(companyName);
  }

  /**
   * Scenarios about Associate a worker to a provided company
   */
  @when(/The company  admin send a request passing '(d*)' and '(d*)'/)
  async associateWorkerToCompany(companyId: string, userId: string) {
    const res = await this.client.post(
      EndpointsManager.addWorkerToCompanyEndpoint(companyId, userId)
    );

    this.response = res;
  }

  @then(
    /The system add the user with userId '(d*)' to the provided company with id '(d*)' creating a Blockchain transaction and returning it/
  )
  public async associateWorkerToCompanySuccess(
    userId: string,
    companyId: string
  ) {
    expect(this.response.body.payload.userId).to.be.equal(userId);
    expect(this.response.body.payload.companyId).to.be.equal(companyId);
  }

  @when(/The company  admin send a request without passing {userId}/)
  public async associateWorkerToCompanyWithoutUserid(userId: string) {
    const res = await this.client.post(
      EndpointsManager.addWorkerToCompanyEndpoint(COMPANY.companyId, "")
    );

    this.response = res;
  }

  @then(/The system return an error message telling that '(d*)' is mandatory/)
  public async associateWorkerToCompanyMandatoryParameter(parameter: string) {
    expect(this.response.body.error.statusCode).to.be.equal(
      ERRORS.missingBodyParameter.statusCode
    );
    expect(this.error.body.error.details[0].info.missingProperty).to.be.equal(
      parameter
    );
  }
}

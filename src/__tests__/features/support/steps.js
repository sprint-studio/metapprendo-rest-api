const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const {
  default: EndpointsManager,
} = require("../../../services/endpointsManager.service");

const USER = {
  userId: "test-user",
  fullName: "TestUser",
};

const COMPANY = {
  companyId: "test-user",
  companyName: "Acme Test",
  PIVA: "TestUser",
  CUA: "",
  CF: "",
};

const ERRORS = {
  missingBody: {
    statusCode: 400,
    name: "BadRequestError",
    message: "Request body is required",
    code: "MISSING_REQUIRED_PARAMETER",
  },
  missingBodyParameter: {
    statusCode: 422,
    name: "UnprocessableEntityError",
    message:
      "The request body is invalid. See error object `details` property for more info.",
    code: "VALIDATION_FAILED",
    details: [],
  },
  jsonSintaxError: {
    statusCode: 400,
    name: "SyntaxError",
    message: "Unexpected token } in JSON at position 77",
  },
  missingParameter: {
    statusCode: 400,
    name: "BadRequestError",
    message: "Required parameter transactionId is missing!",
    code: "MISSING_REQUIRED_PARAMETER",
  },
};

/**
 * Scenario: Authorize a specific user to be the company's for "Acme"
 */
When(
  "an existing user is assigned to be admin of an existing company {string}",
  async function (company) {
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
);

Then("It becomes admin of the company {string}", async function (company) {
  expect(this.user.userId).to.be.equal(USER.userId);
  expect(this.user.fullName).to.be.equal(USER.fullName);
});

/**
 * Scenario:
 * Try to authorize a user to be the company's admin but without passing a user id
 */
When(
  "The MetApprendo admin send a request to authorize a specific user without passing a {string}",
  async function (parameter) {
    const res = await this.client
      .post(EndpointsManager.companyAdminEndpoint(COMPANY.companyId))
      .send({});

    this.error = res.body.error;
  }
);

Then(
  "The system return an error telling {string} is mandatory",
  async function (parameter) {
    expect(this.error.statusCode).to.be.equal(
      ERRORS.missingBodyParameter.statusCode
    );
    expect(this.error.code).to.be.equal(ERRORS.missingBodyParameter.code);
    expect(this.error.details[0].info.missingProperty).to.be.equal(parameter);
  }
);

/**
 * Scenario: Try to authorize a user to be the company's admin but passing a
 * company id related to a company that dosn't exist
 **/
When(
  "The MetApprendo admin send a request to authorize a specific user to be the company admin of {string} but the company doesn't exist",
  async function (company) {
    const res = await this.client
      .post(EndpointsManager.companyAdminEndpoint(company))
      .send(USER);

    this.error = res.body.error;
  }
);

Then(
  "The system return an error telling that the company {string} doesn't exist",
  async function (company) {
    expect(this.error.statusCode).to.be.equal(404);
    expect(this.error.name).to.be.equal("Request entity not found");
  }
);

/**
 * Scenario: Create a new Company
 */
When(
  "The MetApprendo Admin send a request with all mandatory data to create a new Company",
  async function () {
    const res = await this.client
      .post(EndpointsManager.createCompanyEndpoint(COMPANY.companyId))
      .send(COMPANY);

    this.response = res;
  }
);

Then(
  "The service execute a transaction into the Blockchain and a send a successful response",
  async function () {
    expect(this.response.statusCode).to.be.equal(200);
    expect(this.reponse.body.companyId).to.be.equal(COMPANY.companyId);
  }
);

/**
 * Scenario: Create a new Company without passing any data
 */
When("The MetApprendo admin send a request without a body", async function () {
  const res = await this.client.post(
    EndpointsManager.createCompanyEndpoint(COMPANY.companyId)
  );

  this.error = res.body.error;
});

Then(
  "The System respond with a error with status code {string} and a message telling to pass a body",
  async function (statusCode) {
    expect(this.error.statusCode).to.be.equal(statusCode);
    expect(this.error.message).to.be.equal(ERRORS.missingBody.message);
  }
);

/**
 * Create a new Company without passing companyName
 */
When(
  "The MetApprendo admin send a request without a body",
  async function (parameter) {
    const res = await this.client
      .post(EndpointsManager.createCompanyEndpoint(COMPANY.companyId))
      .send({});

    this.response = res.body;
  }
);

Then(
  "The System respond with a error with statusCode {string} and a message telling that {string} is mandatory",
  async function (statusCode, parameter) {
    expect(this.response.error.statusCode).to.be.equal(statusCode);
    expect(this.response.error.details[0].missingProperty).to.be.equal(
      parameter
    );
  }
);

/**
 * Scenario Create a new Company  without passing CF or PIVA
 */
When(
  "The MetApprendo admin send a request  to create a company named {string} without passing {string}",
  async function (companyName, parameter) {
    const res = await this.client
      .post(EndpointsManager.createCompanyEndpoint(COMPANY.companyId))
      .send({
        ...COMPANY,
        companyName,
      });

    this.response = res;
  }
);

Then(
  "The System respond with statusCode {string} returning the created company named {string}",
  async function (statusCode, companyName) {
    expect(this.response.statusCode).to.be.equal(statusCode);
    expect(this.response.body.payload.companyName).to.be.equal(companyName);
  }
);

/**
 * Scenarios about Associate a worker to a provided company
 */
When(
  "The company  admin send a request passing {string} and {string}",
  async function (companyId, userId) {
    const res = await this.client.post(
      EndpointsManager.addWorkerToCompanyEndpoint(companyId, userId)
    );

    this.response = res;
  }
);

Then(
  "The system add the user with userId {string} to the provided company with id {string} creating a Blockchain transaction and returning it",
  async function (userId, companyId) {
    expect(this.response.body.payload.userId).to.be.equal(userId);
    expect(this.response.body.payload.companyId).to.be.equal(companyId);
  }
);

When(
  "The company  admin send a request without passing {userId}",
  async function (parameter) {
    const res = await this.client.post(
      EndpointsManager.addWorkerToCompanyEndpoint(COMPANY.companyId, "")
    );

    this.response = res;
  }
);

Then(
  "The system return an error message telling that {string} is mandatory",
  async function (parameter) {
    expect(this.response.body.error.statusCode).to.be.equal(
      ERRORS.missingBodyParameter.statusCode
    );
    expect(this.error.body.error.details[0].info.missingProperty).to.be.equal(parameter);
  }
);

/* eslint-disable @typescript-eslint/no-explicit-any */
import { when, then, binding } from "cucumber-tsflow";
import { expect } from "chai";
import TestSetup from "./test-setup";
import EndpointsManager from "../../../services/endpointsManager.service";
import { ERRORS, EDUCATIONAL_PATH } from "./mock-data";
import { EducationalPath } from "../../../models";

@binding()
export class EducationalPathTestScenario extends TestSetup {
  @when(
    /The MetApprendo admin send a request to create a company educational path/
  )
  public async createEducationalPath() {
    const res = await this.client
      .post(EndpointsManager.createEducationaPathEndpoint())
      .send(EDUCATIONAL_PATH);

    this.response = res;
  }

  @then(/The system send a successful confirmation/)
  public async createCompanyEducationalPathSuccess() {
    expect(this.response.statusCode).to.be.equal(200);
    expect(this.response.body.payload.idPath).to.be.equal(
      EDUCATIONAL_PATH.idPath
    );
    expect(this.response.body.payload.title).to.be.equal(
      EDUCATIONAL_PATH.title
    );
    expect(this.response.body.payload.idCompany).to.be.equal(
      EDUCATIONAL_PATH.idCompany
    );
    expect(this.response.body.payload.description).to.be.equal(
      EDUCATIONAL_PATH.description
    );
    expect(this.response.body.payload.data).to.be.equal(EDUCATIONAL_PATH.data);
  }

  @when(
    /The MetApprendo admin send a request to create a company educational path without a body/
  )
  public async createCompanyEducationalPathWithoutBody() {
    const res = await this.client.post(
      EndpointsManager.createEducationaPathEndpoint()
    );

    this.error = res;
  }

  @then(/The system return an error telling that body is mandatory/)
  public async createCompanyEducationalPathWithoutBodyError() {
    expect(this.error.body.error.statusCode).to.be.equal(
      ERRORS.missingBody.statusCode
    );
    expect(this.error.body.error.code).to.be.equal(ERRORS.missingBody.code);
  }

  @when(
    /The MetApprendo admin send a request to create a company educational path without {string}/
  )
  public async tryToCreateCompanyEducationalpath(property: string) {
    const companyEducationalpath: Partial<EducationalPath> = {
      ...EDUCATIONAL_PATH,
    };

    delete companyEducationalpath[property];

    const res = await this.client
      .post(EndpointsManager.createEducationaPathEndpoint())
      .send(companyEducationalpath);

    this.response = res;
  }

  @then(/The system return an error about the missing property {string}/)
  public async missingProperty(property: string) {
    expect(this.response.statusCode).to.be.equal(
      ERRORS.missingBodyParameter.statusCode
    );
    expect(this.error.details[0].info.missingProperty).to.be.equal(property);
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { when, then, binding } from "cucumber-tsflow";
import { expect } from "chai";
import EndpointsManager from "../../../services/endpointsManager.service";
import { CompanyEducationalAgenda } from "../../../models";
import { ERRORS, COMPANY_EDUCATIONAL_AGENDA } from "./mock-data";
import TestSetup from "./test-setup";

@binding()
export class CompanyEducationalAgendaTestScenario extends TestSetup {
  @when(
    /The MetApprendo admin send a request to create a company educational agenda providing all mandatory data/
  )
  public async createCompanyEducationalAgenda() {
    const res = await this.client
      .post(EndpointsManager.createCompanyEducationalAgendaEndpoint())
      .send(COMPANY_EDUCATIONAL_AGENDA);

    this.response = res;
  }

  @then(/The system send a successful confirmation/)
  public async createCompanyEducationalAgendaSuccess() {
    expect(this.response.statusCode).to.be.equal(200);
    expect(this.response.body.payload.idTask).to.be.equal(
      COMPANY_EDUCATIONAL_AGENDA.idTask
    );
    expect(this.response.body.payload.idPill).to.be.equal(
      COMPANY_EDUCATIONAL_AGENDA.idPill
    );
    expect(this.response.body.payload.idWorker).to.be.equal(
      COMPANY_EDUCATIONAL_AGENDA.idWorker
    );
  }

  @when(
    /The MetApprendo admin send a request to create a company educational agenda providing all mandatory data/
  )
  public async createCompanyEducationalAgendaWithoutBody() {
    const res = await this.client.post(
      EndpointsManager.createCompanyEducationalAgendaEndpoint()
    );

    this.error = res;
  }

  @then(/The system return an error telling that body is mandatory/)
  public async createCompanyEducationalAgendaWithoutBodyError() {
    expect(this.error.body.error.statusCode).to.be.equal(
      ERRORS.missingBody.statusCode
    );
    expect(this.error.body.error.code).to.be.equal(ERRORS.missingBody.code);
  }

  @when(
    /The MetApprendo admin send a request to create a company educational agenda without {string}/
  )
  public async tryToCreateCompanyEducationalAgenda(property: string) {
    const companyEducationalAgenda: Partial<CompanyEducationalAgenda> = {
      ...COMPANY_EDUCATIONAL_AGENDA,
    };

    delete companyEducationalAgenda[property];

    const res = await this.client
      .post(EndpointsManager.createCompanyEducationalAgendaEndpoint())
      .send(companyEducationalAgenda);

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

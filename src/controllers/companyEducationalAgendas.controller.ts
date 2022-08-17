import {inject} from '@loopback/core';
import {post, Request, requestBody, response, RestBindings} from '@loopback/rest';

export class CompanyEducationalAgendasController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @post('/company_educational_agendas')
  @response(200)
  createCompanyEducationalAgenda(@requestBody() companyEducationalAgenda: {}): {} {
    return {}
  }
}

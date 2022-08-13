import {inject} from '@loopback/core';
import {
  get, param, Request, requestBody, response, RestBindings
} from '@loopback/rest';

export class CompaniesController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @get('/companies/{companyId}/admin')
  @response(200, {})
  createNewCompanyGroupAdmin(
    @param.path.string('companyId') companyId: string,
    @requestBody() user: {}
  ): {} {
    return {
    };
  }
}

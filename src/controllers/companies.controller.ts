import {inject} from '@loopback/core';
import {property} from '@loopback/repository';
import {param, post, Request, requestBody, response, RestBindings} from '@loopback/rest';


class CreateNewCompanyGroupAdminBody {
  @property({
    type: 'string',
    required: true,
  })
  idUtente: string;
}
export class CompaniesController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @post('/companies/{companyId}/admin')
  @response(200, {})
  createNewCompanyGroupAdmin(
    @param.path.string('companyId') companyId: string,
    @requestBody() userId: CreateNewCompanyGroupAdminBody
  ): {} {
    return {
    };
  }
}

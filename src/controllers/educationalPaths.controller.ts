import {inject} from '@loopback/core';
import {post, Request, requestBody, response, RestBindings} from '@loopback/rest';

export class EducationalPathsController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @post('/educational_paths')
  @response(200)
  createEducationalPath(@requestBody() educationalPath: {}): {} {
    return {}
  }
}

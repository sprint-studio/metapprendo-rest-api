import {inject} from '@loopback/core';
import {
  post, Request, requestBody, response, RestBindings
} from '@loopback/rest';

export class EducationalPillsController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @post('/educational_pills')
  @response(200, {})
  createEducationalPill(@requestBody() educationalPill: {}): object {
    return {
    };
  }
}

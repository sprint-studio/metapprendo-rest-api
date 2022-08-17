import {inject} from '@loopback/core';
import {
  post, Request, requestBody, response, RestBindings
} from '@loopback/rest';

export class ProfilesController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @post('/profiles')
  @response(200, {})
  createProfile(@requestBody() profile: {}): object {
    return {
    };
  }
}

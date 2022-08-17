import {inject} from '@loopback/core';
import {
  get, post, Request, requestBody, response, RestBindings
} from '@loopback/rest';

export class AdminController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @get('/admin')
  @response(200, {})
  getAdmin(): {} {
    return {
    };
  }

  @post('/admin')
  @response(200, {})
  createAdmin(@requestBody() admin: {}): {} {
    return {
    };
  }
}

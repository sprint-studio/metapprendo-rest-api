import {inject} from '@loopback/core';
import {
  post, Request, requestBody, response, RestBindings
} from '@loopback/rest';

export class GroupsController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @post('/groups')
  @response(200, {})
  createGroup(@requestBody() group: {}): object {
    return {
    };
  }
}

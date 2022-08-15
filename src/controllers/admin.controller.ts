import {inject} from '@loopback/core';
import {
  get, post, Request, response, RestBindings
} from '@loopback/rest';
import {AdminUser} from '../models';

export class AdminController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @get('/admin')
  @response(200, AdminUser)
  getAdmin(): AdminUser {
    return new AdminUser({
      idUtente: "123",
      nomeCompleto: "MetApprendo Admin"
    });
  }

  @post('/admin')
  @response(200, AdminUser)
  createAdmin(): AdminUser {
    return new AdminUser({
      idUtente: "123",
      nomeCompleto: "MetApprendo Admin"
    });
  }
}

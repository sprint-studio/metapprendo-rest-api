import {inject} from '@loopback/core';
import {
  get, post, Request, requestBody, response, RestBindings
} from '@loopback/rest';
import {User} from '../models';

export class AdminController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @get('/admin')
  @response(200, User)
  getAdmin(): {} {
    return new User({
      idUtente: "123",
      nomeCompleto: "MetApprendo Admin",
      sesso: "M",
      dataNascita: "01/01/1980",
      username: "nomeCognome",
      email: "nome.cognome@gmail.com",
    });
  }

  @post('/admin')
  @response(200, {})
  createAdmin(@requestBody() admin: {}): {} {
    return {
    };
  }
}

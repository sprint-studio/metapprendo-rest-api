import {inject} from '@loopback/core';
import {del, param, post, Request, requestBody, response, RestBindings} from '@loopback/rest';

export class UsersController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}
  @del('/users/{userId}', {
    description: "Disabilita un utente dall'utilizzo del sistema",
    responses: {
      "200": {
        description: "Utente disabilitato con successo",
      },
    },
  })
  @response(200)
  deactivateUser(@param.path.string('userId') userId: string) {

  }

  @post('/users')
  @response(200)
  createUser(@requestBody() user: {}): {} {
    return {}
  }

  @post('/users/{userId}/dossier')
  @response(200)
  updateUserDossier(
    @param.path.string('userId') userId: string,
    @requestBody() dossierUpdate: {}): {} {
    return {}
  }
}

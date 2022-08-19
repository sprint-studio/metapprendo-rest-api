import {inject} from '@loopback/core';
import {model, property} from '@loopback/repository';
import {del, getModelSchemaRef, param, post, Request, requestBody, response, RestBindings} from '@loopback/rest';
import {User} from '../models';
import {BlockchainTransaction} from '../models/blockchainTransaction.model';

@model()
class UpdateUserDossier {
  @property({
    type: "string",
    required: true,
  })
  IdTask: string;
}
export class UsersController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}
  @del('/users/{userId}', {
    description: "Disabilita un utente dall'utilizzo del sistema",
    responses: {
      "200": {
        description: "Utente disabilitato con successo",
        content: {
          'application/json': {
            schema: getModelSchemaRef(BlockchainTransaction, {
              includeRelations: true
            })
          },
        },
      },
    },
  })
  @response(200)
  deactivateUser(@param.path.string('userId') userId: string) {
    return new BlockchainTransaction({
      idTrx: "33242rdfwfwer234rr2342",
      dataOraTrx: new Date("2022-08-17"),
    });
  }

  @post('/users')
  @response(200, {
    description: "Crea un nuovo utente per utilizzo del sistema blockchain",
    responses: {
      "200": {
        description: "Utente creato con successo",
        content: {
          'application/json': {
            schema: getModelSchemaRef(BlockchainTransaction, {
              includeRelations: true
            })
          },
        },
      },
    },
  })
  createUser(@requestBody() user: User): {} {
    return new BlockchainTransaction({
      idTrx: "33242rdfwfwer234rr2342",
      dataOraTrx: new Date("2022-08-17"),
    });
  }

  @post('/users/{userId}/dossier/education')
  @response(200, {
    description: "",
    responses: {
      "200": {
        description: "Aggiorna il dossier formativo dell'utente per inserire una nuova pillola formativa",
        content: {
          'application/json': {
            schema: getModelSchemaRef(BlockchainTransaction, {
              includeRelations: true
            })
          },
        },
      },
    },
  })
  updateUserDossier(
    @param.path.string('userId') userId: string,
    @requestBody() dossierUpdate: UpdateUserDossier): {} {
      return new BlockchainTransaction({
        idTrx: "33242rdfwfwer234rr2342",
        dataOraTrx: new Date("2022-08-17"),
      });
  }
}

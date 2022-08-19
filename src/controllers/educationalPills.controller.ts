import {inject} from '@loopback/core';
import {property} from '@loopback/repository';
import {
  getModelSchemaRef,
  post, Request, requestBody, response, RestBindings
} from '@loopback/rest';
import {BlockchainTransaction} from '../models';

class CreateNewEducationalPillBody {
  @property({
    type: "string",
    required: true,
  })
  idPillola: string;

  @property({
    type: "string",
    required: true,
  })
  titolo: string;
}
export class EducationalPillsController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @post('/educational_pills')
  @response(200, {
    description:
      "Crea una nuova pillola formativa",
    responses: {
      "200": {
        description:
          "Pillola formativa creata con successo",
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
  createEducationalPill(@requestBody() pill: CreateNewEducationalPillBody): BlockchainTransaction {
    return new BlockchainTransaction({
      idTrx: "33242rdfwfwer234rr2342",
      dataOraTrx: new Date("2022-08-17"),
    });;
  }
}

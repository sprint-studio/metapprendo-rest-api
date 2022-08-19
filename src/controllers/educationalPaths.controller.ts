import {inject} from '@loopback/core';
import {model, property} from '@loopback/repository';
import {getModelSchemaRef, post, Request, requestBody, response, RestBindings} from '@loopback/rest';
import {BlockchainTransaction} from '../models';


@model()
class CreateNewEducationalPathBody {
  @property({
    type: "string",
    required: true,
  })
  idPercorso: string;

  @property({
    type: "string",
    required: true,
  })
  titolo: string;

  @property({
    type: "string",
    required: true,
  })
  formazione: string;
}

export class EducationalPathsController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @post('/educational_paths', {
    description:
      "Crea una nuova agenda formativa per l'azienda",
    responses: {
      "200": {
        description:
          "Agenda formativa creata con successo",
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
  createEducationalPath(@requestBody() educationalPath: CreateNewEducationalPathBody): {} {
    return new BlockchainTransaction({
      idTrx: "33242rdfwfwer234rr2342",
      dataOraTrx: new Date("2022-08-17"),
    });
  }
}

import {inject} from '@loopback/core';
import {model, property} from '@loopback/repository';
import {getModelSchemaRef, post, Request, requestBody, response, RestBindings} from '@loopback/rest';
import {BlockchainTransaction} from '../models';

@model()
class CreateNewCompanyEducationalAgendaBody {
  @property({
    type: "string",
    required: true,
  })
  idTask: string;

  @property({
    type: "string",
    required: true,
  })
  obbligatorieta: string;

  @property({
    type: "string",
    required: true,
  })
  periodicita: string;
}

export class CompanyEducationalAgendasController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @post('/company_educational_agendas', {
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
  createCompanyEducationalAgenda(@requestBody() companyEducationalAgenda: CreateNewCompanyEducationalAgendaBody): BlockchainTransaction {
    return new BlockchainTransaction({
      idTrx: "33242rdfwfwer234rr2342",
      dataOraTrx: new Date("2022-08-17"),
    });
  }
}

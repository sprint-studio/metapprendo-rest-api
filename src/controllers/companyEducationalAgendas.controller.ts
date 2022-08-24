import { inject } from "@loopback/core";
import { model, property } from "@loopback/repository";
import {
  getModelSchemaRef,
  post,
  Request,
  requestBody,
  RestBindings,
} from "@loopback/rest";

import { BlockchainTransaction } from "../models";

@model()
class CreateCompanyEducationalAgendaBody {
  @property({
    type: "string",
    required: true,
  })
  idTask: string;

  @property({
    type: "string",
    required: true,
  })
  idPillola: string;

  @property({
    type: "string",
    required: true,
  })
  idLavoratore: string;

  @property({
    type: "string",
    required: true,
  })
  stato: string;
}

export class CompanyEducationalAgendasController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @post("/company_educational_agendas", {
    description: "Crea un'agenda formativa aziendale",
    responses: {
      "200": {
        description: "L'agenda formativa e' stata creata correttamente",
        content: {
          "application/json": {
            schema: getModelSchemaRef(BlockchainTransaction, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  createCompanyEducationalAgenda(
    @requestBody({
      description: "Dettagli per creare un'agenda formativa aziendale",
      required: true,
    })
    companyEducationalAgenda: CreateCompanyEducationalAgendaBody
  ): {} {
    return new BlockchainTransaction({
      idTrx: "33423422342dsdfew",
      dataOraTrx: new Date(),
    });
  }
}

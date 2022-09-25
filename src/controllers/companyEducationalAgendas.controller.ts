import { inject } from "@loopback/core";
import {
  getModelSchemaRef,
  post,
  get,
  Request,
  requestBody,
  RestBindings,
  param,
} from "@loopback/rest";

import { BlockchainTransaction, CompanyEducationalAgenda } from "../models";

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
    companyEducationalAgenda: CompanyEducationalAgenda
  ): {} {
    return new BlockchainTransaction({
      transactionId: "33423422342dsdfew",
      timestamp: new Date(),
      payload: companyEducationalAgenda,
    });
  }

  @get("/company_educational_agendas/{company_agenda_id}", {
    description: "Ritorna l'educational agenda passata come parametro",
    responses: {
      "200": {
        description: "L'educational agenda passata come parametro",
        content: {
          "application/json": {
            schema: getModelSchemaRef(
              BlockchainTransaction<CompanyEducationalAgenda>,
              {
                includeRelations: true,
              }
            ),
          },
        },
      },
    },
  })
  getCompanyEducationalAgenda(
    @param.path.string("companyAgendaId") companyAgendaId: string,
    @param.path.string("transactionId") transactionId: string
  ) {
    return new BlockchainTransaction<CompanyEducationalAgenda>({
      transactionId: "345354FRF345435342",
      timestamp: new Date(),
      payload: new CompanyEducationalAgenda(),
    });
  }
}

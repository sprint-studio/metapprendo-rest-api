import { inject } from "@loopback/core";
import { property } from "@loopback/repository";
import {
  post,
  Request,
  requestBody,
  response,
  RestBindings,
} from "@loopback/rest";

import { BlockchainTransaction } from "../models";

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

  @post("/company_educational_agendas")
  @response(200)
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

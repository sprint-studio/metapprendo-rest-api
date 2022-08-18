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

class CreateGroupBody {
  @property({
    type: "string",
    required: true,
  })
  idGruppo: string;

  @property({
    type: "string",
    required: true,
  })
  nome: string;

  @property({
    type: "string",
    required: true,
  })
  descrizione: string;

  @property({
    type: "string",
    required: true,
  })
  stato: string;
}

export class GroupsController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @post("/groups")
  @response(200, {})
  createGroup(
    @requestBody({
      description: "Dettagli per la creazione di un nuovo gruppo",
      required: true,
    })
    group: CreateGroupBody
  ): object {
    return new BlockchainTransaction({
      idTrx: "33423422342dsdfew",
      dataOraTrx: new Date(),
    });
  }
}

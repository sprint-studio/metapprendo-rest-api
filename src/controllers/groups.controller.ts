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

  @post("/groups", {
    description: "Endpoint per la creazione di un nuovo gruppo aziendale",
    responses: {
      "200": {
        description:
          "Transazione di conferma avvenuta creazione del gruppo aziendale",
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

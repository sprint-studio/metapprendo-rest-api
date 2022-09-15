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
class CreateProfileBody {
  @property({
    type: "string",
    required: true,
  })
  idProfile: string;

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
}

export class ProfilesController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @post("/profiles", {
    description: "Endpoint per la creazione di un nuovo profilo",
    responses: {
      "200": {
        description: "Transazione di conferma avvenuta creazione del profilo",
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
  createProfile(
    @requestBody({
      description: "Dettagli per la creazione del nuovo profilo",
      required: true,
    })
    profile: CreateProfileBody
  ): BlockchainTransaction {
    return new BlockchainTransaction({
      idTrx: "33423422342dsdfew",
      dataOraTrx: new Date(),
    });
  }
}

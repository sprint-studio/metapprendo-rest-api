import { inject } from "@loopback/core";
import { property } from "@loopback/repository";
import {
  getModelSchemaRef,
  post,
  Request,
  requestBody,
  response,
  RestBindings,
} from "@loopback/rest";

import { BlockchainTransaction } from "../models";

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

  @property({
    type: "string",
    required: true,
  })
  stato: string;
}
export class ProfilesController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @post("/profiles", {
    description: "",
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
      description: "Dettagli per la creazione del nuovo profile ",
      required: true,
    })
    profile: CreateProfileBody
  ): object {
    return new BlockchainTransaction({
      idTrx: "33423422342dsdfew",
      dataOraTrx: new Date(),
    });
  }
}

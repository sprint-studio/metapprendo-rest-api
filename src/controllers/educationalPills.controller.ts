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
class CreateEducationalPillBody {
  @property({
    type: "string",
    required: true,
  })
  idPillola: string;
}

export class EducationalPillsController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @post("/educational_pills", {
    description: "Endpoint per creare una nuova pilla formativa",
    responses: {
      "200": {
        description:
          "Transazione di conferma avvenuta creazione della nuova pillola formativa",
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
  createEducationalPill(
    @requestBody({
      description: "I dettagli della pillola da dover creare",
      required: true,
    })
    educationalPill: CreateEducationalPillBody
  ): BlockchainTransaction {
    return new BlockchainTransaction({
      idTrx: "33423422342dsdfew",
      dataOraTrx: new Date(),
    });
  }
}

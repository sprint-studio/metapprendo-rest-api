import { inject } from "@loopback/core";
import { model, property } from "@loopback/repository";
import {
  getModelSchemaRef,
  post,
  Request,
  requestBody,
  response,
  RestBindings,
} from "@loopback/rest";

import { BlockchainTransaction } from "../models";

@model()
class CreateTrainingPathBody {
  @property({
    type: "string",
    required: true,
  })
  idItem: string;

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

export class TrainingPathsController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @post("/training_paths", {
    description: "Endpoint per la creazione di un nuovo percorso di istruzione",
    responses: {
      "200": {
        description:
          "Transazione di conferma avvenuta creazione del percorso di istruzione",
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
  createTrainingPath(
    @requestBody({
      description: "Dettagli per la creazione del percorso di istruzione",
      required: true,
    })
    trainingPath: CreateTrainingPathBody
  ): {} {
    return new BlockchainTransaction({
      idTrx: "33423422342dsdfew",
      dataOraTrx: new Date(),
    });
  }
}

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

  @post("/training_paths")
  @response(200)
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

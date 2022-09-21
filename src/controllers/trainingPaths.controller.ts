import { inject } from "@loopback/core";
import { model, property } from "@loopback/repository";
import {
  getModelSchemaRef,
  post,
  get,
  Request,
  requestBody,
  RestBindings,
  param,
} from "@loopback/rest";

import { BlockchainTransaction } from "../models";
import TrainingPath from "../models/training-path";

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
            schema: getModelSchemaRef(BlockchainTransaction<TrainingPath>, {
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
    trainingPath: TrainingPath
  ): {} {
    return new BlockchainTransaction<TrainingPath>({
      idTrx: "33423422342dsdfew",
      dataOraTrx: new Date(),
      payload: trainingPath,
    });
  }

  @get("/training_path/{training_path_id}", {
    description: "Ritorna il training path passato come paramentro",
    responses: {
      "200": {
        description: "Il training path richiesto",
        content: {
          "application/json": getModelSchemaRef(
            BlockchainTransaction<TrainingPath>,
            {
              includeRelations: true,
            }
          ),
        },
      },
    },
  })
  getTrainingPath(
    @param.path.string("transactionId") transactionId: string,
    @param.path.string("trainingPathId") trainingPathId: string
  ): BlockchainTransaction<TrainingPath> {
    return new BlockchainTransaction({
      idTrx: "33423422342dsdfew",
      dataOraTrx: new Date(),
      payload: new TrainingPath({
        idItem: "3rfdw34r3r",
        idLavoratore: "3refret4w4",
      }),
    });
  }
}

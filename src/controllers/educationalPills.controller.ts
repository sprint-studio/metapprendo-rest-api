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

import { BlockchainTransaction, EducationalPill } from "../models";

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
    educationalPill: EducationalPill
  ): BlockchainTransaction<EducationalPill> {
    return new BlockchainTransaction({
      idTrx: "33423422342dsdfew",
      dataOraTrx: new Date(),
      payload: educationalPill,
    });
  }

  @get("/educational_pills/{educational_pill}", {
    description: "",
    responses: {
      "200": {
        describe: "",
        content: {
          "application/json": getModelSchemaRef(
            BlockchainTransaction<EducationalPill>,
            {
              includeRelations: true,
            }
          ),
        },
      },
    },
  })
  getEducationalPill(
    @param.path.string("educationalPill") educationalPill: string,
    @param.path.string("transactionId") transactionId: string
  ): BlockchainTransaction<EducationalPill> {
    return new BlockchainTransaction({
      idTrx: "33423422342dsdfew",
      dataOraTrx: new Date(),
      payload: new EducationalPill(),
    });
  }
}

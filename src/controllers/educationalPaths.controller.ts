import { inject } from "@loopback/core";
import {
  getModelSchemaRef,
  post,
  get,
  Request,
  requestBody,
  RestBindings,
} from "@loopback/rest";

import { BlockchainTransaction, EducationalPath } from "../models";

export class EducationalPathsController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @post("/educational_paths", {
    description: "Crea un nuovo percorso formativo",
    responses: {
      "200": {
        description: "Il percorso formativo e' stato creato correttamente",
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
  createEducationalPath(
    @requestBody({
      description:
        "Dettagli del percorso formativo che l'admin dell'azienda vuole creare",
      required: true,
    })
    educationalPath: EducationalPath
  ): {} {
    return new BlockchainTransaction({
      idTrx: "33423422342dsdfew",
      dataOraTrx: new Date(),
    });
  }

  @get("/educational_paths/{educational_path_id}", {
    description: "Ritorna l'education path richiesto come parametro",
    responses: {
      "200": {
        description: "L'education path richiesto",
        content: {
          "application/json": getModelSchemaRef(
            BlockchainTransaction<EducationalPath>,
            {
              includeRelations: true,
            }
          ),
        },
      },
    },
  })
  getEducationalPath(): BlockchainTransaction<EducationalPath> {
    return new BlockchainTransaction({
      idTrx: "343423432423432423d",
      dataOraTrx: new Date(),
      payload: new EducationalPath(),
    });
  }
}

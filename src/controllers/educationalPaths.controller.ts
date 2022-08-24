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
class CreateEducationalPathBody {
  @property({
    type: "string",
    required: true,
  })
  idPercorso: string;

  @property({
    type: "string",
    required: true,
  })
  titolo: string;

  @property({
    type: "string",
    required: true,
  })
  descrizione: string;

  @property({
    type: "string",
    required: true,
  })
  idGruppoAziendale: string;
}

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
        "Dettagli del percorso formativo che l'admin del gruppo aziendale vuole creare",
      required: true,
    })
    educationalPath: CreateEducationalPathBody
  ): {} {
    return new BlockchainTransaction({
      idTrx: "33423422342dsdfew",
      dataOraTrx: new Date(),
    });
  }
}

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

  @post("/educational_paths")
  @response(200)
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

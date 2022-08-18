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

class CreateEducationalPillBody {
  @property({
    type: "string",
    required: true,
  })
  idPillola: string;
}

export class EducationalPillsController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @post("/educational_pills")
  @response(200, {})
  createEducationalPill(
    @requestBody({
      description: "I dettagli della pillola da dover creare",
      required: true,
    })
    educationalPill: CreateEducationalPillBody
  ): object {
    return new BlockchainTransaction({
      idTrx: "33423422342dsdfew",
      dataOraTrx: new Date(),
    });
  }
}

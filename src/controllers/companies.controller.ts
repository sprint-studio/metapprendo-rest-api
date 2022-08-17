import { inject } from "@loopback/core";
import { model, property } from "@loopback/repository";
import {
  param,
  post,
  get,
  Request,
  requestBody,
  RestBindings,
} from "@loopback/rest";

@model()
class CreateNewCompanyGroupAdminBody {
  @property({
    type: "string",
    required: true,
  })
  idUtente: string;
}
export class CompaniesController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @post("/companies/{companyId}/admin", {
    description:
      "Autorizza un utente pre-esistente ad essere amministratore del gruppo aziendale",
    responses: {
      "200": {
        description:
          "Utente promosso ad Admin del gruppo aziendale con successo",
      },
    },
  })
  createNewCompanyGroupAdmin(
    @param.path.string("companyId") companyId: string,
    @requestBody({
      description: "a modified user",
      required: true,
    })
    userId: CreateNewCompanyGroupAdminBody
  ): {} {
    return {};
  }

  @get("/companies/{companyId}/admin", {
    description: "Ritorna l'amministratore del gruppo aziendale",
    responses: {
      "200": {
        description: "Admin del gruppo aziendale",
      },
    },
  })
  getCompanyGroupAdmin(@param.path.string("companyId") companyId: string): {} {
    return {};
  }
}

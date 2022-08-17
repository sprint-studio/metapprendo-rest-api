import { inject } from "@loopback/core";
import { model, property } from "@loopback/repository";
import {
  param,
  post,
  get,
  del,
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

  @post("/api/companies/{idAzienda}/worker/{idUtente}", {
    description: "Associa un lavoratore preesistente ad gruppo Aziendale",
    responses: {
      "200": {
        description:
          "L'utente e' stato correttamente aggiunto al gruppo aziendale",
      },
    },
  })
  addWorkerToCompanyGroup(
    @param.path.string("idAzienda") companayId: string,
    @param.path.string("idUtente") idUtente: string
  ): {} {
    return {};
  }

  @del("/api/companies/{idAzienda}/worker/{idUtente}", {
    description: "Rimuovo un lavoratore preesistente da gruppo Aziendale",
    responses: {
      "200": {
        description:
          "L'utente e' stato correttamente rimosso al gruppo aziendale",
      },
    },
  })
  deleteWorkerFromCompanyGroup(
    @param.path.string("idAzienda") companayId: string,
    @param.path.string("idUtente") idUtente: string
  ): {} {
    return {};
  }
}

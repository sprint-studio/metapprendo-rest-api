import { inject } from "@loopback/core";
import { model, property } from "@loopback/repository";
import {
  del,
  get,
  getModelSchemaRef,
  param,
  post,
  Request,
  requestBody,
  RestBindings,
} from "@loopback/rest";
import { BlockchainTransaction, User } from "../models";

@model()
class CreateNewCompanyGroupAdminBody {
  @property({
    type: "string",
    required: true,
  })
  idUtente: string;
}

@model()
class CreateNewCompanyGroupBody {
  @property({
    type: "string",
    required: true,
  })
  ragioneSociale: string;

  @property({
    type: "string",
    required: true,
  })
  CUA: string;

  @property({
    type: "string",
    required: true,
  })
  PIVA: string;

  @property({
    type: "string",
    required: true,
  })
  CF: string;
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
  createNewCompanyGroupAdmin(
    @param.path.string("companyId") companyId: string,
    @requestBody({
      description: "L'id utente da dover autorizzare come admin",
      required: true,
    })
    userId: CreateNewCompanyGroupAdminBody
  ): {} {
    return new BlockchainTransaction({
      idTrx: "33242rdfwfwer234rr2342",
      dataOraTrx: new Date("2022-08-17"),
    });
  }

  @post("/companies/{companyId}", {
    description: "Crea un nuovo gruppo aziendale",
    responses: {
      "200": {
        description: "Il nuovo gruppo aziendale e' stato creato con successo.",
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
  createNewCompanyGroup(
    @param.path.string("idAzienda") idAzienda: string,
    @requestBody({
      description: "I dettagli del nuovo gruppo da creare",
      required: true,
    })
    companyDetails: CreateNewCompanyGroupBody
  ): BlockchainTransaction {
    return new BlockchainTransaction({
      idTrx: "33242rdfwfwer234rr2342",
      dataOraTrx: new Date("2022-08-17"),
    });
  }

  @get("/companies/{companyId}/admin", {
    description: "Ritorna l'amministratore del gruppo aziendale",
    responses: {
      "200": {
        description: "L'admin del gruppo aziendale",
        content: {
          "application/json": {
            schema: getModelSchemaRef(User, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  getCompanyGroupAdmin(
    @param.path.string("companyId") companyId: string
  ): User {
    return new User({
      nomeCompleto: "User",
    });
  }

  @post("/companies/{idAzienda}/worker/{idUtente}", {
    description: "Associa un lavoratore preesistente ad un gruppo Aziendale",
    responses: {
      "200": {
        description:
          "L'utente e' stato correttamente aggiunto al gruppo aziendale",
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
  addWorkerToCompanyGroup(
    @param.path.string("idAzienda") companayId: string,
    @param.path.string("idUtente") idUtente: string
  ): BlockchainTransaction {
    return new BlockchainTransaction({
      idTrx: "124w2er2er23",
      dataOraTrx: new Date(),
    });
  }

  @del("/companies/{idAzienda}/worker/{idUtente}", {
    description: "Rimuovere un lavoratore preesistente da un gruppo Aziendale",
    responses: {
      "200": {
        description:
          "L'utente e' stato correttamente rimosso dal gruppo aziendale",
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
  deleteWorkerFromCompanyGroup(
    @param.path.string("idAzienda") companayId: string,
    @param.path.string("idUtente") idUtente: string
  ): {} {
    return new BlockchainTransaction({
      idTrx: "33242rdfwfwer234rr2342",
      dataOraTrx: new Date("2022-08-17"),
    });
  }
}

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
  userId: string;
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
      "Autorizza un utente pre-esistente ad essere amministratore dell'azienda",
    responses: {
      "200": {
        description: "Utente promosso ad Admin dell'azienda con successo",
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

  @get("/companies/{companyId}", {
    description: "Ritorna l'azienda passata come parametro",
    responses: {
      "200": {
        description: "L'azienda richiesta",
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
  getCompanyGroup(
    @param.path.string("companyId") companyId: string
  ): BlockchainTransaction {
    return new BlockchainTransaction({
      idTrx: "33242rdfwfwer234rr2342",
      dataOraTrx: new Date("2022-08-17"),
    });
  }

  @post("/companies/{companyId}", {
    description: "Crea una nuova azienda",
    responses: {
      "200": {
        description: "La nuova azienda e' stata creata con successo.",
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
    @param.path.string("companyId") companyId: string,
    @requestBody({
      description: "I dettagli della nuova azienda da creare",
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
    description: "Ritorna l'amministratore dell'azienda",
    responses: {
      "200": {
        description: "L'amministratore dell'azienda",
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

  @post("/companies/{companyId}/worker/{userId}", {
    description: "Associa un lavoratore preesistente ad un'azienda",
    responses: {
      "200": {
        description:
          "Il lavoratore e' stato correttamente associato all'azienda",
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
    @param.path.string("companyId") companayId: string,
    @param.path.string("userId") userId: string
  ): BlockchainTransaction {
    return new BlockchainTransaction({
      idTrx: "124w2er2er23",
      dataOraTrx: new Date(),
    });
  }

  @del("/companies/{companyId}/worker/{userId}", {
    description: "Rimuovere un lavoratore preesistente da un'azienda",
    responses: {
      "200": {
        description:
          "Il lavoratore e' stato correttamente rimosso dall'azienda",
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
    @param.path.string("companyId") companayId: string,
    @param.path.string("userId") userId: string
  ): {} {
    return new BlockchainTransaction({
      idTrx: "33242rdfwfwer234rr2342",
      dataOraTrx: new Date("2022-08-17"),
    });
  }
}

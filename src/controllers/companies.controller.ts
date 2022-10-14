import { inject } from "@loopback/core";
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
import { Contract } from "fabric-network";
import { AdminUser, BlockchainTransaction, User } from "../models";
import Company from "../models/company";

export class CompaniesController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject("microcredentialsChaincode")
    private microcredentialsChaincode: Contract
  ) {}

  @get("/companies/{companyId}", {
    description: "Ritorna l'azienda passata come parametro",
    responses: {
      "200": {
        description: "L'azienda richiesta",
        content: {
          "application/json": {
            schema: getModelSchemaRef(BlockchainTransaction<Company>, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async getCompany(
    @param.path.string("companyId") companyId: string,
    @param.query.string("transactionId") transactionId: string
  ): Promise<BlockchainTransaction<Company>> {
    await this.microcredentialsChaincode.evaluateTransaction("", ""); // TODO: Da capire come si comporta loopback con una promise in return

    return new BlockchainTransaction({
      transactionId: "33242rdfwfwer234rr2342",
      timestamp: new Date("2022-08-17"),
      payload: new Company({
        companyName: "Foobar company",
        CUA: "222",
        PIVA: "IT343434",
        CF: "333DDDWE3E",
      }),
    });
  }

  @post("/companies/{companyId}", {
    description: "Crea una nuova azienda",
    responses: {
      "200": {
        description: "La nuova azienda e' stata creata con successo.",
        content: {
          "application/json": {
            schema: getModelSchemaRef(BlockchainTransaction<Company>, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  createNewCompany(
    @param.path.string("companyId") companyId: string,
    @requestBody({
      description: "I dettagli della nuova azienda da creare",
      required: true,
    })
    companyDetails: Company
  ): BlockchainTransaction<Company> {
    return new BlockchainTransaction<Company>({
      transactionId: "33242rdfwfwer234rr2342",
      timestamp: new Date("2022-08-17"),
      payload: companyDetails,
    });
  }

  @get("/companies/{companyId}/admin", {
    description: "Ritorna l'amministratore dell'azienda",
    responses: {
      "200": {
        description: "L'amministratore dell'azienda",
        content: {
          "application/json": {
            schema: getModelSchemaRef(BlockchainTransaction<User>, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  getCompanyAdmin(
    @param.path.string("companyId") companyId: string,
    @param.query.string("transactionId") transactionId: string
  ): BlockchainTransaction<User> {
    return new BlockchainTransaction<User>({
      transactionId: "dfrrtetweewfrwer2334re",
      timestamp: new Date(),
      payload: new User({
        fullName: "Foobarz",
      }),
    });
  }

  @post("/companies/{companyId}/admin", {
    description:
      "Autorizza un utente pre-esistente ad essere amministratore dell'azienda",
    responses: {
      "200": {
        description: "Utente promosso ad Admin dell'azienda con successo",
        content: {
          "application/json": {
            schema: getModelSchemaRef(BlockchainTransaction<User>, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  createNewCompanyAdmin(
    @param.path.string("companyId") companyId: string,
    @requestBody({
      description: "L'utente da dover autorizzare come admin",
      required: true,
    })
    user: AdminUser
  ): {} {
    return new BlockchainTransaction({
      transactionId: "33242rdfwfwer234rr2342",
      timestamp: new Date("2022-08-17"),
      payload: user,
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
  addWorkerToCompany(
    @param.path.string("companyId") companayId: string,
    @param.path.string("userId") userId: string
  ): BlockchainTransaction<User> {
    return new BlockchainTransaction({
      transactionId: "124w2er2er23",
      timestamp: new Date(),
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
  deleteWorkerFromCompany(
    @param.path.string("companyId") companayId: string,
    @param.path.string("userId") userId: string
  ): {} {
    return new BlockchainTransaction({
      transactionId: "33242rdfwfwer234rr2342",
      timestamp: new Date("2022-08-17"),
    });
  }
}

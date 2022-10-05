import { inject } from "@loopback/core";
import {
  del,
  getModelSchemaRef,
  param,
  get,
  post,
  Request,
  requestBody,
  RestBindings,
} from "@loopback/rest";

import { User, UserDossier, BlockchainTransaction } from "../models";

export class UsersController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @del("/users/{userId}", {
    description: "Disabilita un utente dall'utilizzo del sistema",
    responses: {
      "200": {
        description: "Utente disabilitato con successo",
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
  deactivateUser(@param.path.string("userId") userId: string) {
    return new BlockchainTransaction({
      transactionId: "33242rdfwfwer234rr2342",
      timestamp: new Date("2022-08-17"),
    });
  }

  @post("/users", {
    description: "Crea un nuovo utente per l'utilizzo del sistema blockchain",
    responses: {
      "200": {
        description: "Utente creato con successo",
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
  createUser(
    @requestBody({
      description: "I dettagli dell'utente da creare",
      required: true,
    })
    user: User
  ): {} {
    return new BlockchainTransaction<User>({
      transactionId: "33242rdfwfwer234rr2342",
      timestamp: new Date("2022-08-17"),
      payload: user,
    });
  }

  @post("/users/{userId}/dossier/education", {
    description: "Aggiorna il dossier formativo dell'utente",
    responses: {
      "200": {
        description: "Dossier formativo aggiornato con successo",
        content: {
          "application/json": {
            schema: getModelSchemaRef(BlockchainTransaction<UserDossier>, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  updateUserDossier(
    @param.path.string("userId") userId: string,
    @requestBody({
      description:
        "Le nuove informazioni da inserire all'interno del dossier dell'utente.",
      required: true,
    })
    dossierUpdate: UserDossier
  ): {} {
    return new BlockchainTransaction<UserDossier>({
      transactionId: "33242rdfwfwer234rr2342",
      timestamp: new Date("2022-08-17"),
      payload: dossierUpdate,
    });
  }

  @get("/users/{userId}/dossier", {
    description: "Ritorna il dossier dell'utente passato come parametro",
    responses: {
      "200": {
        description: "Il dossier dell'utente passato come parametro",
        content: {
          "application/json": {
            schema: getModelSchemaRef(BlockchainTransaction<UserDossier>, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  getUserDossier(
    @param.path.string("userId") userId: string,
    @param.query.string("transactionId") transactionId: string
  ): BlockchainTransaction<UserDossier> {
    return new BlockchainTransaction<UserDossier>({
      transactionId: "33242rdfwfwer234rr2342",
      timestamp: new Date("2022-08-17"),
      payload: new UserDossier(),
    });
  }
}

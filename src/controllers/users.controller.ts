import {inject, intercept, service} from "@loopback/core";
import {
  del, get, getModelSchemaRef,
  param, post,
  Request,
  requestBody,
  RestBindings
} from "@loopback/rest";
import {ValidateUniqueFilesInterceptor} from '../interceptors';

import {BlockchainTransaction, User, UserDossier} from "../models";
import {UserDossierUpdate} from '../models/userDossierUpdate';
import {UserDossierService} from '../services';

// Add this line to apply interceptor to this class
@intercept(ValidateUniqueFilesInterceptor.BINDING_KEY)
export class UsersController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request,
  @service(UserDossierService) public userDossierService: UserDossierService) {}

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

  @post("/users/{userId}/dossier", {
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

  async updateUserDossier(
    @param.path.string("userId") userId: string,
    @requestBody({
      description:
        "Le nuove informazioni da inserire all'interno del dossier dell'utente.",
      required: true,
    })
    dossierUpdate: UserDossierUpdate
  ): Promise<BlockchainTransaction<UserDossierUpdate>> {
    await this.userDossierService.addActivityToUserDossier(dossierUpdate, userId);
    return new BlockchainTransaction<UserDossierUpdate>({
      transactionId: "33242rdfwfwer234rr2342",
      timestamp: new Date(),
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
  async getUserDossier(
    @param.path.string("userId") userId: string,
    @param.query.string("transactionId") transactionId: string
  ): Promise<BlockchainTransaction<UserDossier>> {
    const dossier = await this.userDossierService.getUserDossier(userId);
    return new BlockchainTransaction<UserDossier>({
      transactionId: "33242rdfwfwer234rr2342",
      timestamp: new Date("2022-08-17"),
      payload: dossier
    });
  }
}

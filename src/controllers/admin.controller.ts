import { inject } from "@loopback/core";
import {
  get,
  getModelSchemaRef,
  post,
  Request,
  RestBindings,
} from "@loopback/rest";
import { AdminUser } from "../models";

export class AdminController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @get("/admin", {
    description: "Ritorna l'utente Admin MetApprendo",
    responses: {
      "200": {
        description: `Utente Admin MetApprendo`,
        content: {
          "application/json": {
            schema: getModelSchemaRef(AdminUser, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  getAdmin(): AdminUser {
    return new AdminUser({
      userId: "123",
      nomeCompleto: "MetApprendo Admin",
    });
  }

  @post("/admin", {
    description: "Crea l'utente Admin MetApprendo e ritornalo nella risposta",
    responses: {
      "200": {
        description: "Utente Admin MetApprendo",
        content: {
          "application/json": {
            schema: getModelSchemaRef(AdminUser, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  createAdmin(): AdminUser {
    return new AdminUser({
      userId: "123",
      nomeCompleto: "MetApprendo Admin",
    });
  }
}

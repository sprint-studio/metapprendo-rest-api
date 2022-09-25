import { Entity, model, property } from "@loopback/repository";
import { User } from "./user.model";

@model()
export class UserDossier extends Entity {
  @property({
    type: "string",
    required: true
  })
  IdTask: string;

  @property({
    type: "object",
    required: true,
    description: "Questo campo non ha un'interfaccia definitiva per cui le informazioni passate possono avere una struttura arbitraria"
  })
  data: object;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserDossierRelations {
  // describe navigational properties here
}

export type UserDossierWithRelations = UserDossier & UserDossierRelations;
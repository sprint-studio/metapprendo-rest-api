import { Entity, model, property } from "@loopback/repository";

@model()
export class User extends Entity {
  @property({
    type: "string",
    id: true,
    generated: false,
    required: true,
  })
  userId: string;

  @property({
    type: "string",
    required: true,
  })
  nomeCompleto: string;

  @property({
    type: "string",
    required: true,
  })
  sesso: string;

  @property({
    type: "string",
    required: true,
  })
  dataNascita: string;

  @property({
    type: "string",
    required: true,
  })
  username: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;

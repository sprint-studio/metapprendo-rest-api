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
  fullName: string;

  @property({
    type: "string",
    required: true,
  })
  gender: string;

  @property({
    type: "string",
    required: true,
  })
  birthDay: string;

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

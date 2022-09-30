import { Entity, model, property } from "@loopback/repository";
import { getJsonSchema } from "@loopback/rest";
import { User } from "./user.model";

@model()
export class DossierActivity extends Entity {
  @property({
    type: "string",
    required: false,
  })
  type: string;

  @property({
    type: "string",
    required: false,
  })
  title: string;

  @property({
    type: "string",
    required: false,
  })
  acceptedFunding: string;
}

@model()
export class DossierActivitySupplier extends Entity {
  @property({
    type: "string",
    required: false,
  })
  type: string;

  @property({
    type: "number",
    required: false,
  })
  duration: number;

  @property({
    type: "string",
    required: false,
  })
  year: number;

  @property({
    type: "string",
    required: false,
  })
  contents: string;

  @property({
    type: "array",
    itemType: "string",
    required: false,
  })
  areas: Array<string>;
}

@model()
export class DossierDocument extends Entity {
  @property({
    type: "array",
    itemType: "object",
    required: false,
  })
  certification: unknown;

  @property({
    type: "array",
    itemType: "object",
    required: false,
  })
  endorsement: unknown;

  @property({
    type: "array",
    itemType: "object",
    required: false,
  })
  file: unknown;
}

@model()
export class UserDossier extends Entity {
  @property({
    type: "string",
    required: true,
    description: "L'id dell'utente da associare al dossier",
  })
  userId: string;

  @property({
    type: "object",
    jsonSchema: getJsonSchema(DossierActivity, {
      includeRelations: true,
    }),
    required: true,
    description: "L'attivitá formativa da registrare all'intenro del dossier",
  })
  activity: DossierActivity;

  @property({
    type: "object",
    jsonSchema: getJsonSchema(DossierActivitySupplier, {
      includeRelations: true,
    }),
    required: true,
    description: "L'ente che eroga le attivita' formative",
  })
  supplier: DossierActivitySupplier;

  @property({
    type: "object",
    jsonSchema: getJsonSchema(DossierDocument, {
      includeRelations: true,
    }),
    required: true,
    description: "I documenti allegati all'interno del dossier",
  })
  document: DossierDocument;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserDossierRelations {
  // describe navigational properties here
}

export type UserDossierWithRelations = UserDossier & UserDossierRelations;

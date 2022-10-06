import {Entity, model, property} from "@loopback/repository";
import {getJsonSchema} from "@loopback/rest";
import {DossierDocument} from '.';
import {User} from "./user.model";

export class ActivityFileNoContent extends Entity {
  @property({
    type: "string",
    itemType: "string",
    description: "Contenuto del file rappresentato in base64",
    required: true,
  })
  content: string;

  @property({
    type: "name",
    itemType: "string",
    description: "Nome del file",
    required: true,
  })
  name: string;
}

@model()
export class DossierActivityUpdate extends Entity {
  @property({
    type: "string",
    required: false,
  })
  id: string;

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

  @property({
    type: "string",
    required: false,
  })
  supplier: string;

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
export class DossierDocumentUpdate extends Entity {
  @property({
    type: "array",
    itemType: "object",
    jsonSchema: getJsonSchema(Array<ActivityFileNoContent>, {
      includeRelations: true,
    }),
    description: "Certification da allegare al dossier trasmessi in base64",
    required: false,
  })
  certification: ActivityFileNoContent[];

  @property({
    type: "array",
    itemType: "object",
    jsonSchema: getJsonSchema(Array<ActivityFileNoContent>, {
      includeRelations: true,
    }),
    description: "Endorsement da allegare al dossier trasmessi in base64",
    required: false,
  })
  endorsement: ActivityFileNoContent[];

  @property({
    type: "array",
    itemType: "object",
    description: "Files da allegare al dossier trasmessi in base64",
    required: false,
  })
  file: ActivityFileNoContent[];

  constructor(data?: Partial<DossierDocument>) {
    super(data);
  }
}

@model()
export class UserDossierUpdate extends Entity {
  @property({
    type: "string",
    required: true,
    description: "L'id dell'utente da associare al dossier",
  })
  userId: string;

  @property({
    type: "object",
    jsonSchema: getJsonSchema(DossierActivityUpdate, {
      includeRelations: false,
    }),
    required: false,
    description: "L'attivitá formativa da registrare all'intenro del dossier",
  })
  activity: DossierActivityUpdate;

  @property({
    type: "object",
    jsonSchema: getJsonSchema(DossierDocumentUpdate, {
      includeRelations: true,
    }),
    required: false,
    description: "I documenti allegati all'interno del dossier",
  })
  document: DossierDocumentUpdate;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserDossierUpdateRelations {
  // describe navigational properties here
}

export type UserDossierUpdateWithRelations = UserDossierUpdate & UserDossierUpdateRelations;

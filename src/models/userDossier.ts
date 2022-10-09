import {Entity, model, property} from "@loopback/repository";
import {getJsonSchema} from "@loopback/rest";
import {User} from './user.model';


@model()
export class ActivityFile extends Entity {
  @property({
    type: "string",
    itemType: "string",
    description: "Contenuto del file rappresentato in base64",
    required: false,
  })
  content: string;

  @property({
    type: "string",
    itemType: "string",
    description: "Nome del file",
    required: false,
  })
  fileName: string;

  @property({
    type: "sha256checksum",
    itemType: "string",
    description: "Checksum del file",
    required: false,
  })
  sha256checksum: string;

  constructor(data?: Partial<ActivityFile>) {
    super(data);
  }
}
@model()
export class DossierDocument extends Entity {
  @property({
    type: "array",
    itemType: "object",
    jsonSchema: getJsonSchema(Array<ActivityFile>, {
      includeRelations: true,
    }),
    description: "Certification da allegare al dossier trasmessi in base64",
    required: false,
  })
  certification: ActivityFile[];

  @property({
    type: "array",
    itemType: "object",
    jsonSchema: getJsonSchema(Array<ActivityFile>, {
      includeRelations: true,
    }),
    description: "Endorsement da allegare al dossier trasmessi in base64",
    required: false,
  })
  endorsement: ActivityFile[];

  @property({
    type: "array",
    itemType: "object",
    description: "Files da allegare al dossier trasmessi in base64",
    required: false,
  })
  file: ActivityFile[];

  constructor(data?: Partial<DossierDocument>) {
    super(data);
  }
}

@model()
export class DossierActivity extends Entity {
  @property({
    type: "string",
    required: true,
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
    required: true,
  })
  contents: string;

  @property({
    type: "array",
    itemType: "string",
    required: true,
  })
  areas: Array<string>;

  @property({
    type: "object",
    jsonSchema: getJsonSchema(DossierDocument, {
      includeRelations: true,
    }),
    required: false,
    description: "I documenti allegati all'interno del dossier",
  })
  document: DossierDocument;

  constructor(data?: Partial<DossierActivity>) {
    super(data);
  }
}

@model()
export class UserDossier extends Entity {
  @property({
    type: "object",
    required: true,
    description: "L'utente associato al dossier",
    jsonSchema: getJsonSchema(User, {
      includeRelations: false,
    }),
  })
  user: User;

  @property({
    type: "array",
    itemType: "string",
    description: "Le attività del dossier",
    required: false,
    jsonSchema: getJsonSchema(Array<DossierActivity>, {
      includeRelations: false,
    }),
  })
  activities: DossierActivity[];

  constructor(data?: Partial<UserDossier>) {
    super(data);
  }
}


export interface UserDossierRelations {
  // describe navigational properties here
}

export type UserDossierWithRelations = UserDossier & UserDossierRelations;

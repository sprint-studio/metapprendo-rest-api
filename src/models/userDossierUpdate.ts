import {Entity, model, property} from "@loopback/repository";
import {getJsonSchema} from "@loopback/rest";

@model()
export class ActivityFileNoShasum extends Entity {
  @property({
    type: "string",
    description: "Contenuto del file rappresentato in base64",
    required: true,
  })
  content: string;

  @property({
    type: "string",
    description: "Nome del file",
    required: true,
  })
  fileName: string;

  constructor(data?: Partial<ActivityFileNoShasum>) {
    super(data);
  }
}

@model()
export class DossierActivityUpdate extends Entity {
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
    required: false,
  })
  contents: string;

  @property({
    type: "array",
    itemType: "string",
    required: false,
  })
  areas: Array<string>;

  constructor(data?: Partial<DossierActivityUpdate>) {
    super(data);
  }
}

@model()
export class DossierDocumentUpdate extends Entity {
  @property.array(Object, {
    jsonSchema: getJsonSchema(ActivityFileNoShasum)
  })
  certification: ActivityFileNoShasum[];

  @property.array(Object, {
    jsonSchema: getJsonSchema(ActivityFileNoShasum)
  })
  endorsement: ActivityFileNoShasum[];


  @property.array(Object, {
    jsonSchema: getJsonSchema(ActivityFileNoShasum)
  })
  file: ActivityFileNoShasum[];

  constructor(data?: Partial<DossierDocumentUpdate>) {
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
    required: true,
    description: "L'attivitá formativa da registrare all'intenro del dossier",
  })
  activity: DossierActivityUpdate;

  @property({
    type: "object",
    jsonSchema: getJsonSchema(DossierDocumentUpdate, {
      includeRelations: true,
    }),
    required: true,
    description: "I documenti allegati all'interno del dossier",
  })
  document: DossierDocumentUpdate;

  constructor(data?: Partial<UserDossierUpdate>) {
    super(data);
  }
}

export interface UserDossierUpdateRelations {
  // describe navigational properties here
}

export type UserDossierUpdateWithRelations = UserDossierUpdate & UserDossierUpdateRelations;

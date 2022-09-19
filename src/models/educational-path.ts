import { Entity, model, property } from "@loopback/repository";

@model()
export class EducationalPath extends Entity {
  @property({
    type: "string",
    required: true,
  })
  idPercorso: string;

  @property({
    type: "string",
    required: true,
  })
  titolo: string;

  @property({
    type: "string",
    required: true,
  })
  descrizione: string;

  @property({
    type: "string",
    required: true,
  })
  idGruppoAziendale: string;

  constructor(data?: Partial<EducationalPath>) {
    super();
  }
}

export interface EducationalPathRelations {
  // describe navigational properties here
}

export type EducationalPathWithRelations = EducationalPath &
  EducationalPathRelations;

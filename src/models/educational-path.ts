import { Entity, model, property } from "@loopback/repository";

@model()
export class EducationalPath extends Entity {
  @property({
    type: "string",
    required: true,
  })
  idPath: string;

  @property({
    type: "string",
    required: true,
  })
  title: string;

  @property({
    type: "string",
    required: true,
  })
  description: string;

  @property({
    type: "string",
    required: true,
  })
  idCompany: string;

  @property({
    type: "object",
    required: false,
    description: "Questo campo non ha un'interfaccia definitiva per cui le informazioni passate possono avere una struttura arbitraria"
  })
  data: object;

  constructor(data?: Partial<EducationalPath>) {
    super(data);
  }
}

export interface EducationalPathRelations {
  // describe navigational properties here
}

export type EducationalPathWithRelations = EducationalPath &
  EducationalPathRelations;

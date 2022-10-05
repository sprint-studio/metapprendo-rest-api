import { Entity, model, property } from "@loopback/repository";

@model()
export class EducationalPill extends Entity {
  @property({
    type: "string",
    required: true,
  })
  idPill: string;

  @property({
    type: "object",
    required: false,
    description: "Questo campo non ha un'interfaccia definitiva per cui le informazioni passate possono avere una struttura arbitraria"
  })
  data: object;

  constructor(data?: Partial<EducationalPill>) {
    super(data);
  }
}

export interface EducationalPillRelations {
  // describe navigational properties here
}

export type EducationalPillWithRelations = EducationalPill &
  EducationalPillRelations;

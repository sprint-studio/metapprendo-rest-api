import { Entity, model, property } from "@loopback/repository";

@model()
export class EducationalPill extends Entity {
  @property({
    type: "string",
    required: true,
  })
  idPillola: string;

  constructor(data?: Partial<EducationalPill>) {
    super(data);
  }
}

export interface EducationalPillRelations {
  // describe navigational properties here
}

export type EducationalPillWithRelations = EducationalPill &
  EducationalPillRelations;

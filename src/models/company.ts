import { Entity, model, property } from "@loopback/repository";

@model()
export default class Company extends Entity {
  @property({
    type: "string",
    required: true,
    description: "Rappresenta la Ragione Sociale dell'azienda",
  })
  companyName: string;

  @property({
    type: "string",
    required: true,
  })
  CUA: string;

  @property({
    type: "string",
    required: false,
  })
  PIVA: string;

  @property({
    type: "string",
    required: false,
  })
  CF: string;

  constructor(data?: Partial<Company>) {
    super(data);
  }
}

export interface CompanyRelations {
  // describe navigational properties here
}

export type CompanyWithRelations = Company & CompanyRelations;

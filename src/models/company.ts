import { Entity, model, property } from "@loopback/repository";

@model()
export default class Company extends Entity {
  @property({
    type: "string",
    required: true,
    description: "Rappresenta la Ragione Sociale dell'azienda"
  })
  companyName: string;

  @property({
    type: "string",
    required: true,
  })
  CUA: string;

  @property({
    type: "string",
    required: true,
  })
  PIVA: string;

  @property({
    type: "string",
    required: true,
  })
  CF: string;

  constructor(data?: Partial<Company>) {
    super(data);
  }
}

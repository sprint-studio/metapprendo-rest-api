import { Entity, model, property } from "@loopback/repository";

@model()
export default class TrainingPath extends Entity {
  @property({
    type: "string",
    required: true,
  })
  idItem: string;

  @property({
    type: "string",
    required: true,
    description: "Questo campo rappresenta l'id di un altro utente all'interno del sistema"
  })
  idWorker: string;

  constructor(data?: Partial<TrainingPath>) {
    super(data);
  }
}

export interface TrainingPathRelations {}

export type TrainingPathWithRelations = TrainingPath & TrainingPathRelations;

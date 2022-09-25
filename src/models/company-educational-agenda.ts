import { Entity, model, property } from "@loopback/repository";

@model()
export class CompanyEducationalAgenda extends Entity {
  @property({
    type: "string",
    required: true,
  })
  idTask: string;

  @property({
    type: "string",
    required: true,
  })
  idPill: string;

  @property({
    type: "string",
    required: true,
    description: "Questo campo rappresenta l'id di un altro utente all'interno del sistema"
  })
  idWorker: string;
}

export interface CompanyEducationalAgendaRelations {
  // describe navigational properties here
}

export type CompanyEducationalAgendaWithRelations = CompanyEducationalAgenda &
  CompanyEducationalAgendaRelations;

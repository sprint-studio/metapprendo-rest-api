import {Entity, model, property} from '@loopback/repository';

@model()
export class AdminUser extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  idUtente: string;

  @property({
    type: 'string',
    required: true,
  })
  nomeCompleto: string;

  constructor(data?: Partial<AdminUser>) {
    super(data);
  }
}

export interface AdminUserRelations {
  // describe navigational properties here
}

export type AdminUserWithRelations = AdminUser & AdminUserRelations;

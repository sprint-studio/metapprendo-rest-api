import { Entity, model, property } from "@loopback/repository";

@model()
export class BlockchainTransaction<T> extends Entity {
  @property({
    id: true,
    type: "string",
    required: true,
    generated: false,
  })
  idTrx: string;

  @property({
    type: "date",
    required: true,
  })
  timestamp: Date;

  @property({
    type: "object",
    required: false,
  })
  payload: T;

  constructor(data?: Partial<BlockchainTransaction<T>>) {
    super(data);
  }
}

export interface BlockchainTransactionRelations {
  // describe navigational properties here
}

export type BlockchainTransactionWithRelations =
  BlockchainTransaction<unknown> & BlockchainTransactionRelations;

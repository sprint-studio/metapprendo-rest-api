import { Entity, model, property } from "@loopback/repository";

@model()
export class BlockchainTransaction extends Entity {
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
  dataOraTrx: Date;

  constructor(data?: Partial<BlockchainTransaction>) {
    super(data);
  }
}

export interface BlockchainTransactionRelations {
  // describe navigational properties here
}

export type BlockchainTransactionWithRelations = BlockchainTransaction &
  BlockchainTransactionRelations;

import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class CardDto extends Model {
  @property()
  value: string;
  @property()
  suit: string;
  @property()
  code: string;

  constructor(data?: Partial<CardDto>) {
    super(data);
  }
}

export interface CardDtoRelations {
  // describe navigational properties here
}

export type CardDtoWithRelations = CardDto & CardDtoRelations;

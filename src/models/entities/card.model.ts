import {hasMany, model, property} from '@loopback/repository';
import {Deckcard} from './deckcard.model';
import {Suit} from '../../enum/suit';
import {BaseEntity} from './baseentity.model';

@model({
  settings: {
    postgresql: {schema: 'cards', table: 'card'},
  },
})
export class Card extends BaseEntity {
  @property({
    type: 'string',
    jsonSchema: {
      enum: Object.values(Suit),
    },
  })
  suit: Suit;

  @property({
    type: 'number',
  })
  rank: number;

  @hasMany(() => Deckcard)
  deckcards: Deckcard[];

  constructor(data?: Partial<Card>) {
    super(data);
  }
}

export interface CardRelations {
  // describe navigational properties here
}

export type CardWithRelations = Card & CardRelations;

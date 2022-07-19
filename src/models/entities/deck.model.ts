import {hasMany, model, property} from '@loopback/repository';
import {BaseEntity} from './baseentity.model';
import {Deckcard} from './deckcard.model';
import {DeckType} from '../../enum/deck-type';

@model({
    settings: {
        postgresql: {schema: 'cards', table: 'deck'}
    }
})
export class Deck extends BaseEntity {
    @property({
        type: 'boolean'
    })
    shuffled: boolean;

  @property({
    type: 'string',
    jsonSchema: {
      enum: Object.values(DeckType),
    }
  })
  decktype: DeckType;

  @hasMany(() => Deckcard)
  deckcards: Deckcard[];
}
export interface DeckRelations {
}

export type DeckWithRelations = Deck & DeckRelations

import {belongsTo, model, property} from '@loopback/repository';
import {BaseEntity} from './baseentity.model';
import {Card, CardWithRelations} from './card.model';
import {Deck, DeckWithRelations} from './deck.model';

@model({
  settings: {
    postgresql: {schema: 'cards', table: 'deckcard'},
  },
})
export class Deckcard extends BaseEntity {
  @property({
    type: 'number',
  })
  sort: number;

  @property({
    type: 'boolean',
    required: true,
    default: false,
  })
  drawn: boolean;

  @belongsTo(() => Deck)
  deckId: string;

  @belongsTo(() => Card, {name: 'card'})
  cardId: string;

  constructor(data: Partial<Deckcard>) {
    super(data);
  }
}
export interface DeckcardRelations {
  card?: CardWithRelations;
  deck?: DeckWithRelations;
}
export type DeckcardWithRelations = Deckcard & DeckcardRelations;

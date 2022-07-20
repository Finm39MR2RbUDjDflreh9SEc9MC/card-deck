import {Model, model, property} from '@loopback/repository';
import {DeckType} from '../../enum/deck-type';

@model()
export class CreateDeck extends Model {
  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(DeckType),
    },
  })
  deckType: DeckType;
  @property({
    type: 'boolean',
    required: true,
  })
  shuffle: boolean;

  constructor(data?: Partial<CreateDeck>) {
    super(data);
  }
}

export interface CreateDeckRelations {
  // describe navigational properties here
}

export type CreateDeckWithRelations = CreateDeck & CreateDeckRelations;

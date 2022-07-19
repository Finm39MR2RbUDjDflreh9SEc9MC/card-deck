import {Model, model, property} from '@loopback/repository';
import {DeckType} from '../../enum/deck-type';
import {CardDto} from './card-dto.model';

@model()
export class DeckDto extends Model {
  @property()
  deckId: string;
  @property()
  remaining: number;
  @property()
  shuffled: boolean;
  @property()
  decktype: DeckType;
  @property.array(CardDto)
  cards: CardDto[]
  
  constructor(data?: Partial<DeckDto>) {
    super(data);
  }
}

export interface DeckDtoRelations {
  // describe navigational properties here
}

export type CreatedDeckDtoWithRelations = DeckDto & DeckDtoRelations;

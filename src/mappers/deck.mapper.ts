import {Deck, DeckDto} from '../models';
import {CardMapper} from './card.mapper';

export class DeckMapper {
  static map = (deck: Deck): DeckDto => {
    return new DeckDto({
      deckId: deck.id,
      remaining: deck.deckcards?.length,
      shuffled: deck.shuffled,
      decktype: deck.decktype,
      cards: deck.deckcards?.map(card => CardMapper.map(card)),
    });
  };
}

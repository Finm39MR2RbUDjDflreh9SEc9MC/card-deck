import {CardDto, DeckcardWithRelations} from '../models';
import {CardValue} from '../enum/card-value';

export class CardMapper {
  static map = (card: DeckcardWithRelations): CardDto => {
    const hasFaceValue = CardValue[card.card!.rank];
    const cardValue = CardValue[card.card!.rank] ?? card.card?.rank;

    return new CardDto({
      value: cardValue.toString(),
      suit: card.card?.suit,
      code: `${
        hasFaceValue ? cardValue.substring(0, 1) : cardValue
      }${card.card?.suit.substring(0, 1)}`,
    });
  };
}

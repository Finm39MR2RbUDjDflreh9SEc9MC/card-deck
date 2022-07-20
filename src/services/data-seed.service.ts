import {BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {CardRepository} from '../repositories';
import {Card} from '../models';
import {Suit} from '../enum/suit';
import {CardConstants} from '../constants/card-constants';

@injectable({scope: BindingScope.TRANSIENT})
export class DataSeedService {
  constructor(
    @repository(CardRepository) private cardRepository: CardRepository,
  ) {}

  async seedCards(): Promise<void> {
    const cardCount = await this.getCardCount();
    if (cardCount.count > 0) return;

    await this.cardRepository.createAll(this.createCards());
  }

  private async getCardCount() {
    return this.cardRepository.count();
  }

  private createCards() {
    const suits = Object.values(Suit);
    const cards: Array<Card> = [];

    suits.forEach(suit => {
      for (
        let i = CardConstants.CARD_MIN_VALUE;
        i < CardConstants.CARD_MIN_VALUE + CardConstants.CARD_COUNT;
        i++
      ) {
        cards.push(
          new Card({
            suit: suit,
            rank: i,
          }),
        );
      }
    });

    return cards;
  }
}

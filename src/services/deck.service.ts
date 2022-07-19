import {BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {CardRepository, DeckcardRepository, DeckRepository} from '../repositories';
import {Card, DeckDto, CreateDeck, Deck, Deckcard} from '../models';
import {DeckType} from '../enum/deck-type';
import {HttpErrors} from '@loopback/rest';
import {CardConstants} from '../constants/card-constants';

@injectable({scope: BindingScope.TRANSIENT})
export class DeckService {
  constructor(
    @repository(DeckRepository) private deckRepository: DeckRepository,
    @repository(CardRepository) private cardRepository: CardRepository,
    @repository(DeckcardRepository) private deckCardRepository: DeckcardRepository) {
  }

  async createDeck(createDeck: CreateDeck): Promise<DeckDto> {
    const deck = {
      shuffled: createDeck.shuffle,
      decktype: createDeck.deckType,
    };

    const deckId = await this.deckRepository.create(deck);
    const deckCards = await this.getDeckCardsForDeckCreating(createDeck, deckId);

    await this.deckCardRepository.createAll(deckCards);

    return new DeckDto({
      remaining: deckCards.length,
      deckId: deckId.id,
      decktype: deckId.decktype,
      shuffled: deckId.shuffled,
    });
  }

  private async getDeckCardsForDeckCreating(createDeck: CreateDeck, deckId: Deck) {
    let cards = await this.cardRepository.find({
      where: {
        rank: {gte: createDeck.deckType === DeckType.FULL ? 2 : CardConstants.SHORT_DECK_FROM},
      },
    });

    if (createDeck.shuffle) {
      cards = this.shuffleCards(cards);
    }

    return cards.map((card, index): Deckcard => new Deckcard({
      deckId: deckId.id,
      cardId: card.id,
      drawn: false,
      sort: index,
    }));
  }

  private shuffleCards(cards: Card[]) {
    return cards
      .map(value => ({value, sort: Math.random()}))
      .sort((a, b) => a.sort - b.sort)
      .map(({value}) => value);
  }

  async openDeck(id: string) {
    return this.deckRepository.findById(id, {
      include: [{
        relation: 'deckcards',
        scope: {
          where: {
            drawn: false
          },
          include: ['card']
        }
      }]
    });
  }

  async drawCard(deckId: string, count: number) {
    await this.validateDeckForDrawing(deckId, count);

    const cardsToDraw = await this.deckCardRepository.find({
      where: {drawn: false, deckId: deckId},
      order: ['sort DESC'],
      include: [
        {
          relation: 'card',
        },
      ],
      limit: count
    });
    
    await this.setCardsDrawn(cardsToDraw)
    
    return cardsToDraw;
  }

  private async getDeckAvailableCardCount(deckId: string) {
    return this.deckCardRepository.count({
      drawn: false,
      deckId: deckId,
    });
  }

  private async validateDeckForDrawing(deckId: string, count: number) {
    if (count === 0) throw new HttpErrors.BadRequest(`Can't draw 0 cards!`);

    const exists = await this.deckRepository.exists(deckId);
    if (!exists) throw new HttpErrors.NotFound(`Deck with id ${deckId} doesn't exist!`);
    
    const cardCount = await this.getDeckAvailableCardCount(deckId);
    if (cardCount.count === 0) throw new HttpErrors.BadRequest(`No cards left in deck!`);
    if (cardCount.count < count) throw new HttpErrors.BadRequest(`Not enough cards left in deck!`);
  }

  private async setCardsDrawn(cards: Deckcard[]) {
    await this.deckCardRepository.updateAll({drawn: true}, {
      or: cards.map(card => ({id: card.id}))
    });
  }

}

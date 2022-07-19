import {
  post,
  param,
  get,
  getModelSchemaRef,
  requestBody,
  response,
} from '@loopback/rest';
import {CardDto, DeckDto, CreateDeck} from '../models';
import {service} from '@loopback/core';
import {DeckService} from '../services';
import {CardMapper} from '../mappers/card.mapper';
import {DeckMapper} from '../mappers/deck.mapper';

export class DeckController {
  constructor(
    @service(DeckService) public deckService: DeckService,
  ) {
  }

  @post('/deck/create')
  @response(200, {
    description: 'Create new deck',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DeckDto, {includeRelations: true}),
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreateDeck, {
            title: 'NewDeck',
          }),
        },
      },
    })
      deck: CreateDeck,
  ): Promise<DeckDto> {
    return this.deckService.createDeck(deck);
  }

  @get('/decks/{id}/open')
  @response(200, {
    description: 'Get deck info with all cards left in deck',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DeckDto, {includeRelations: true}),
      },
    },
  })
  async openById(
    @param.path.string('id') id: string,
  ): Promise<DeckDto> {
    const deck = await this.deckService.openDeck(id);

    return DeckMapper.map(deck);
  }

  @post('/decks/{id}/draw')
  @response(200, {
    description: 'Draw a card from deck',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CardDto),
        },
      },
    },
  })
  async drawCards(
    @param.path.string('id') id: string,
    @param.query.number('count') count: number = 1,
  ): Promise<CardDto[] | null> {
    const drawnCards = await this.deckService.drawCard(id, count);

    return drawnCards.map((card) => (CardMapper.map(card)));
  }
}

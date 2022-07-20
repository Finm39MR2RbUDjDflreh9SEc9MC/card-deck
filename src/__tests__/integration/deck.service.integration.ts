import {testdb} from '../helpers/datasource/test.datasource';
import {DeckService} from '../../services';
import {
  CardRepository,
  DeckcardRepository,
  DeckRepository,
} from '../../repositories';
import {DeckType} from '../../enum/deck-type';
import {CreateDeck} from '../../models';
import {expect} from '@loopback/testlab';
import {DataSeedService} from '../../services';

describe('Deck flow', () => {
  let db;
  let deckRepo: DeckRepository;
  let cardRepo: CardRepository;
  let deckCardRepo: DeckcardRepository;
  let deckService: DeckService;
  let deckId: string;
  let dataSeedService: DataSeedService;

  before(async () => {
    db = testdb;
    deckCardRepo = new DeckcardRepository(
      db,
      async () => cardRepo,
      async () => deckRepo,
    );
    cardRepo = new CardRepository(
      db,
      async () => deckCardRepo,
      async () => deckRepo,
    );
    deckRepo = new DeckRepository(
      db,
      async () => deckCardRepo,
      async () => cardRepo,
    );
    deckService = new DeckService(deckRepo, cardRepo, deckCardRepo);
    dataSeedService = new DataSeedService(cardRepo);
    await dataSeedService.seedCards();
  });

  it('Should create full length deck', async () => {
    const createDeck = new CreateDeck({
      deckType: DeckType.FULL,
      shuffle: true,
    });

    const deck = await deckService.createDeck(createDeck);
    deckId = deck.deckId;

    expect(deck).to.not.eql(null);
    expect(deck.remaining).to.eql(52);
  });

  it('Should draw top card from deck', async () => {
    const card = await deckService.drawCard(deckId, 1);

    expect(card[0]).to.not.eql(null);
    expect(card[0].sort).to.eql(51);
  });

  it('Should have full deck length of cards minus 1 drawn', async () => {
    const card = await deckService.openDeck(deckId);

    expect(card.deckcards.length).to.eql(51);
  });

  after(async () => {
    await deckCardRepo.deleteAll();
    await deckRepo.deleteAll();
    await deckRepo.deleteAll();
  });
});

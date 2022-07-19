import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {AppdatasourceDataSource} from '../datasources';
import {Card, Deck, Deckcard, DeckcardRelations} from '../models';
import {CardRepository} from './card.repository';
import {DeckRepository} from './deck.repository';

export class DeckcardRepository extends DefaultCrudRepository<Deckcard,
  typeof Deckcard.prototype.id,
  DeckcardRelations> {
  public readonly card: BelongsToAccessor<Card, typeof Card.prototype.id>;
  public readonly deck: BelongsToAccessor<Deck, typeof Deck.prototype.id>;

  constructor(
    @inject('datasources.appdatasource') dataSource: AppdatasourceDataSource,
    @repository.getter('CardRepository')
      cardRepositoryGetter: Getter<CardRepository>,
    @repository.getter('DeckRepository')
      deckRepositoryGetter: Getter<DeckRepository>,
  ) {
    super(Deckcard, dataSource);
    this.card = this.createBelongsToAccessorFor('card', cardRepositoryGetter);
    this.deck = this.createBelongsToAccessorFor('deck', deckRepositoryGetter);
    this.registerInclusionResolver('card', this.card.inclusionResolver);
  }
}

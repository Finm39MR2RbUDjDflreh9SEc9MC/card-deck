import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  HasManyThroughRepositoryFactory,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {AppdatasourceDataSource} from '../datasources';
import {Card, CardRelations, Deck, Deckcard} from '../models';
import {DeckcardRepository} from './deckcard.repository';
import {DeckRepository} from './deck.repository';

export class CardRepository extends DefaultCrudRepository<
  Card,
  typeof Card.prototype.id,
  CardRelations
> {
  public readonly decks: HasManyThroughRepositoryFactory<
    Deck,
    typeof Deck.prototype.id,
    Deckcard,
    typeof Card.prototype.id
  >;

  public readonly deckcards: HasManyRepositoryFactory<
    Deckcard,
    typeof Card.prototype.id
  >;

  constructor(
    @inject('datasources.appdatasource') dataSource: AppdatasourceDataSource,
    @repository.getter('DeckcardRepository')
    protected deckcardRepositoryGetter: Getter<DeckcardRepository>,
    @repository.getter('DeckRepository')
    protected deckRepositoryGetter: Getter<DeckRepository>,
  ) {
    super(Card, dataSource);
    this.deckcards = this.createHasManyRepositoryFactoryFor(
      'deckcards',
      deckcardRepositoryGetter,
    );
    this.registerInclusionResolver(
      'deckcards',
      this.deckcards.inclusionResolver,
    );
  }
}

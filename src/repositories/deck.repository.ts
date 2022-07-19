import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {AppdatasourceDataSource} from '../datasources';
import {Deck, DeckRelations, Card, Deckcard} from '../models';
import {DeckcardRepository} from './deckcard.repository';
import {CardRepository} from './card.repository';

export class DeckRepository extends DefaultCrudRepository<
  Deck,
  typeof Deck.prototype.id,
  DeckRelations
> {

  public readonly cards: HasManyThroughRepositoryFactory<Card, typeof Card.prototype.id,
          Deckcard,
          typeof Deck.prototype.id
        >;

  public readonly deckcards: HasManyRepositoryFactory<Deckcard, typeof Deck.prototype.id>;

  constructor(
    @inject('datasources.appdatasource') dataSource: AppdatasourceDataSource, @repository.getter('DeckcardRepository') protected deckcardRepositoryGetter: Getter<DeckcardRepository>, @repository.getter('CardRepository') protected cardRepositoryGetter: Getter<CardRepository>,
  ) {
    super(Deck, dataSource);
    this.deckcards = this.createHasManyRepositoryFactoryFor('deckcards', deckcardRepositoryGetter);
    this.registerInclusionResolver('deckcards', this.deckcards.inclusionResolver);
  }
}

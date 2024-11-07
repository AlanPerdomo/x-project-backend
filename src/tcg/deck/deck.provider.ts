import { DataSource } from 'typeorm';
import { Deck } from './deck.entity';

export const deckProviders = [
  {
    provide: 'DECK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Deck),
    inject: ['DATA_SOURCE'],
  },
];

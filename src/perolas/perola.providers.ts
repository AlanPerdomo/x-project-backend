import { DataSource } from 'typeorm';
import { Perola } from './perola.entity';

export const perolaProviders = [
  {
    provide: 'PEROLA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Perola),
    inject: ['DATA_SOURCE'],
  },
];

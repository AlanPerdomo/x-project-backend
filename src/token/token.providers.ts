import { DataSource } from 'typeorm';
import { Token } from './token.entity';

export const tokenProviders = [
    {
        provide: 'TOKEN_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Token),
        inject: ['DATA_SOURCE'],
    },
];


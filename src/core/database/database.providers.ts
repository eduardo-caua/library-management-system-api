import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from '../constants';
import { databaseConfig } from './database.config';
import { Book } from '../../modules/books/book.entity';
import { Customer } from '../../modules/customers/customer.entity';
import { Tracking } from '../../modules/tracking/tracking.entity';

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        const config:any = databaseConfig.environment;
        const sequelize = new Sequelize(config);
        sequelize.addModels([Book, Customer, Tracking]);
        await sequelize.sync();
        return sequelize;
    },
}];
import { Customer } from './customer.entity';
import { CUSTOMER_REPOSITORY } from '../../core/constants';

export const customersProviders = [{
    provide: CUSTOMER_REPOSITORY,
    useValue: Customer,
}];
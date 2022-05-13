import { Injectable, Inject } from '@nestjs/common';
import { Customer } from './customer.entity';
import { CustomerDto } from './dto/customer.dto';
import { CUSTOMER_REPOSITORY } from '../../core/constants';

@Injectable()
export class CustomersService {

    constructor(@Inject(CUSTOMER_REPOSITORY) private readonly customerRepository: typeof Customer) { }

    async create(customer: CustomerDto): Promise<Customer> {
        return await this.customerRepository.create<Customer>(customer);
    }

    async find(): Promise<Customer[]> {
        return await this.customerRepository.findAll<Customer>();
    }

    async findOneById(id: number): Promise<Customer> {
        return await this.customerRepository.findOne<Customer>({ where: { id } });
    }

    async update(id: number, customer: CustomerDto): Promise<[Number]> {
        return await this.customerRepository.update<Customer>(customer, { where: { id } });
    }

    async delete(id: number): Promise<Boolean> {
        return await this.customerRepository.destroy<Customer>({ where: { id } }) == 1;
    }
}
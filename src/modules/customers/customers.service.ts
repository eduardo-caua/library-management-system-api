import { Injectable, Inject } from '@nestjs/common';
import { Customer } from './customer.entity';
import { CustomerDto } from './dto/customer.dto';
import { CustomersDto } from './dto/customers.dto';
import { CUSTOMER_REPOSITORY } from '../../core/constants';
import { Op } from 'sequelize';

@Injectable()
export class CustomersService {

    constructor(@Inject(CUSTOMER_REPOSITORY) private readonly customerRepository: typeof Customer) { }

    async find(name:string, offset:number, limit:number): Promise<CustomersDto> {
        let options:object = {
            limit: limit,
            offset: offset,
            order: [
                ['name', 'ASC']
            ]
        };

        if (name) {
            options['where'] = {
                name:{
                    [Op.iLike]: `%${name}%`
                }
            };
        }

        return await this.customerRepository.findAndCountAll<Customer>(options);
    }

    async findOneById(id: number): Promise<Customer> {
        return await this.customerRepository.findOne<Customer>({ where: { id } });
    }

    async create(customer: CustomerDto): Promise<Customer> {
        return await this.customerRepository.create<Customer>(customer);
    }

    async update(id: number, customer: CustomerDto): Promise<[Number]> {
        return await this.customerRepository.update<Customer>(customer, { where: { id } });
    }

    async delete(id: number): Promise<Boolean> {
        return await this.customerRepository.destroy<Customer>({ where: { id } }) == 1;
    }
}
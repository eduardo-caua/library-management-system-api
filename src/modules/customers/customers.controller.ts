import { Controller, Body, Post, Get, Put, Delete, Param } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomerDto } from '../customers/dto/customer.dto';

@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService) {}

    @Get()
    async findCustomers() {
        return await this.customersService.find();
    }

    @Get('/:id')
    async findOneCustomerById(@Param('id') id: number) {
        return await this.customersService.findOneById(id);
    }

    @Post()
    async create(@Body() customer: CustomerDto) {
        return await this.customersService.create(customer);
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() customer: CustomerDto) {
        return await this.customersService.update(id, customer);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number) {
        return await this.customersService.delete(id);
    }
}
import { Controller, Body, Post, Get, Put, Delete, Param, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { OFFSET, LIMIT }  from '../../core/constants';
import { CustomersService } from './customers.service';
import { CustomerDto } from '../customers/dto/customer.dto';

@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async findCustomers(
        @Query('_offset') offset: number,
        @Query('_limit') limit: number,
        @Query('name') name: string
    ) {
        return await this.customersService.find(name, offset || OFFSET, limit || LIMIT);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async findOneCustomerById(@Param('id') id: number) {
        return await this.customersService.findOneById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() customer: CustomerDto) {
        return await this.customersService.create(customer);
    }

    @Put('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async update(@Param('id') id: number, @Body() customer: CustomerDto) {
        return await this.customersService.update(id, customer);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: number) {
        return await this.customersService.delete(id);
    }
}
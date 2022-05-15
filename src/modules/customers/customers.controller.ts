import { Controller, Body, Post, Get, Put, Delete, Param, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { OFFSET, LIMIT }  from '../../core/constants';
import { CustomersService } from './customers.service';
import { CustomerDto } from '../customers/dto/customer.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomersDto } from './dto/customers.dto';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Find for customers' })
    @ApiResponse({ status: 200, description: 'Successfully requested.', type: CustomersDto })
    async findCustomers(
        @Query('_offset') offset?: number,
        @Query('_limit') limit?: number,
        @Query('name') name?: string
    ) {
        return await this.customersService.find(name, offset || OFFSET, limit || LIMIT);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Find for a customer by Id' })
    @ApiResponse({ status: 200, description: 'Successfully requested.', type: CustomerDto })
    async findOneCustomerById(@Param('id') id: number) {
        return await this.customersService.findOneById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a customer' })
    @ApiResponse({ status: 201, description: 'Successfully requested.', type: CustomerDto })
    async create(@Body() customer: CustomerDto) {
        return await this.customersService.create(customer);
    }

    @Put('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Update a customer by Id' })
    @ApiResponse({ status: 204, description: 'Successfully requested.' })
    async update(@Param('id') id: number, @Body() customer: CustomerDto) {
        return await this.customersService.update(id, customer);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a customer by Id' })
    @ApiResponse({ status: 204, description: 'Successfully requested.' })
    async delete(@Param('id') id: number) {
        return await this.customersService.delete(id);
    }
}
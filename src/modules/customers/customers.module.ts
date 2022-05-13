import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { customersProviders } from './customers.providers';

@Module({
    controllers: [CustomersController],
    providers: [CustomersService, ...customersProviders],
    exports: [CustomersService],
})
export class CustomersModule {}
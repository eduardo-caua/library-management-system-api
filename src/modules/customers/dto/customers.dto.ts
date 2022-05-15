import { ApiProperty } from '@nestjs/swagger';
import { CustomerDto } from './customer.dto';

export class CustomersDto {
    @ApiProperty({ type: CustomerDto, isArray: true, description: 'Customers list'})
    rows: CustomerDto[];

    @ApiProperty({ example: 1, description: 'The total count of customer' })
    count: number;
}
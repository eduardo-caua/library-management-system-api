import { ApiProperty } from "@nestjs/swagger";

export class CustomerDto {
    @ApiProperty({ example: 'John Doe', description: 'The customer name' })
    readonly name: string;

    @ApiProperty({ example: 'john.doe@gmail.com', description: 'The customer email' })
    readonly email: string;

    @ApiProperty({ example: '+1 222 333 4444', description: 'The customer phone number' })
    readonly phone: string;
}
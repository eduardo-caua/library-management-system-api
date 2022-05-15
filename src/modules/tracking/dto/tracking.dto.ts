import { ApiProperty } from "@nestjs/swagger";

export class TrackingDto {
    @ApiProperty({ example: 1, description: 'Unique identifier from a book' })
    readonly bookId: number;

    @ApiProperty({ example: 1, description: 'Unique identifier from a customer' })
    readonly customerId: number;

    @ApiProperty({ example: 'CHECK IN', enum: ['CHECK IN','CHECK OUT'], description: 'The taken action by customer' })
    readonly action: string;
}
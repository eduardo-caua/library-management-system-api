import { ApiProperty } from "@nestjs/swagger";

export class BookTrackingDto {
    @ApiProperty({ example: 1, description: 'Unique identifier from a book' })
    readonly bookId: number;

    @ApiProperty({ example: 1, description: 'Unique identifier from a customer' })
    readonly customerId: number;

    @ApiProperty({ example: 'CHECK IN', enum: ['CHECK IN','CHECK OUT'], description: 'The taken action by customer' })
    readonly action: string;

    @ApiProperty({ example: null, description: 'When the book was checked out it will have a due Date to return it' })
    readonly dueDate: string;
}
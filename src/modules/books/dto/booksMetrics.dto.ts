import { ApiProperty } from "@nestjs/swagger";

export class BooksMetricsDto {
    @ApiProperty({ example: 1, description: 'The number of books available' })
    readonly available: number;

    @ApiProperty({ example: 1, description: 'The number of books checked out' })
    readonly checkedOut: number;

    @ApiProperty({ example: 1, description: 'The number of books delayed' })
    readonly delayed: number;
}
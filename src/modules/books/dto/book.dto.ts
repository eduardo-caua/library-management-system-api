import { ApiProperty } from "@nestjs/swagger";

export class BookDto {
    @ApiProperty({ example: 'High Output Management', description: 'The book title' })
    readonly title: string;

    @ApiProperty({ example: 'Grove, Andrew S.', description: 'The book author' })
    readonly author: string;

    @ApiProperty({ example: '978-0-679-76288-1', description: 'The books isbn' })
    readonly isbn: string;

    @ApiProperty({ example: 'An organizational Baedeker for managers at all levels.... A highly credible handbook for organizing work and directing and developing employees.', description: 'The books list' })
    readonly description: string;

    @ApiProperty({ example: 'AVAILABLE', enum: ['AVAILABLE','CHECKED OUT'], description: 'The books status' })
    readonly status: string;

    @ApiProperty({ example: '2022-05-15', description: 'When the book was checked out it will have a due Date to return it' })
    readonly dueDate?: string;
}
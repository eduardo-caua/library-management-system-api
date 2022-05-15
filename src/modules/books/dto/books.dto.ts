import { ApiProperty } from '@nestjs/swagger';
import { BookDto } from './book.dto';

export class BooksDto {
    @ApiProperty({ type: BookDto, isArray: true, description: 'Books list'})
    readonly rows: BookDto[];

    @ApiProperty({ example: 1, description: 'The total count of books' })
    readonly count: number;
}

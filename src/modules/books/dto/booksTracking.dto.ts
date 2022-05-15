import { ApiProperty } from '@nestjs/swagger';
import { TrackingDto } from 'src/modules/tracking/dto/tracking.dto';
import { BookDto } from './book.dto';

export class BooksTrackingDto {
    @ApiProperty({ type: BookDto, description: 'Book entity'})
    book: BookDto;

    @ApiProperty({ type: TrackingDto, isArray: true, description: 'Tracking list'})
    rows: TrackingDto[];

    @ApiProperty({ example: 1, description: 'The total count of tracking' })
    count: number;
}

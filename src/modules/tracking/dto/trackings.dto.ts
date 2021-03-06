import { ApiProperty } from '@nestjs/swagger';
import { TrackingDto } from './tracking.dto';

export class TrackingsDto {
    @ApiProperty({ type: TrackingDto, isArray: true, description: 'Tracking list'})
    rows: TrackingDto[];

    @ApiProperty({ example: 1, description: 'The total count of tracking' })
    count: number;
}
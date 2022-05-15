import { Controller, Body, Get, Patch, Delete, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrackingDto } from './dto/tracking.dto';
import { TrackingService } from './tracking.service';

@ApiTags('Tracking')
@Controller('tracking')
export class TrackingController {
    constructor(private trackingService: TrackingService) {}

    @Get('/:id')
    @ApiOperation({ summary: 'Find for a tracking by Id' })
    @ApiResponse({ status: 200, description: 'Successfully requested.', type: TrackingDto })
    async findTrackingById(@Param('id') id: number) {
        return await this.trackingService.findById(id);
    }
}
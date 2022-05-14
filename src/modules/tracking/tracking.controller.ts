import { Controller, Body, Get, Patch, Delete, Param } from '@nestjs/common';
import { TrackingService } from './tracking.service';

@Controller('tracking')
export class TrackingController {
    constructor(private trackingService: TrackingService) {}

    @Get('/:id')
    async findTrackingById(@Param('id') id: number) {
        return await this.trackingService.findById(id);
    }
}
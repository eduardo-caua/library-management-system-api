import { Controller, Body, Post, Get, Put, Patch, Delete, Param, UnprocessableEntityException, Logger } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { TrackingDto } from '../tracking/dto/tracking.dto';

const logger = new Logger('NestApplication');

@Controller('tracking')
export class TrackingController {
    constructor(private trackingService: TrackingService) {}

    @Get('/:id')
    async findTrackingById(@Param('id') id: number) {
        return await this.trackingService.findById(id);
    }

    @Patch('/:id')
    async updateTracking(@Param('id') id: number, @Body() tracking: TrackingDto) {
        return await this.trackingService.update(id, tracking);
    }

    @Delete('/:id')
    async deleteTracking(@Param('id') id: number) {
        return await this.trackingService.delete(id);
    }
}
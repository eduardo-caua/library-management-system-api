import { Module } from '@nestjs/common';
import { TrackingController } from './tracking.controller';
import { TrackingService } from './tracking.service';
import { trackingProviders } from './tracking.providers';

@Module({
    controllers: [TrackingController],
    providers: [TrackingService, ...trackingProviders],
    exports: [TrackingService],
})
export class TrackingModule {}
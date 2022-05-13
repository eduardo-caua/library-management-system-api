import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { booksProviders } from './books.providers';
import { TrackingService } from '../tracking/tracking.service';
import { trackingProviders } from '../tracking/tracking.providers';

@Module({
    controllers: [BooksController],
    providers: [BooksService, ...booksProviders, TrackingService, ...trackingProviders],
    exports: [BooksService, TrackingService],
})
export class BooksModule {}
import { Controller, Body, Post, Get, Put, Patch, Delete, Param, UnprocessableEntityException, Logger } from '@nestjs/common';
import { BooksService } from './books.service';
import { TrackingService } from '../tracking/tracking.service';
import { BookDto } from '../books/dto/book.dto';
import { TrackingDto } from '../tracking/dto/tracking.dto';

const logger = new Logger('NestApplication');

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService, private trackingService: TrackingService) {}

    @Get()
    async findBooks() {
        return await this.booksService.find();
    }

    @Get('/:id')
    async findOneBookById(@Param('id') id: number) {
        return await this.booksService.findOneById(id);
    }

    @Post()
    async create(@Body() book: BookDto) {
        return await this.booksService.create(book);
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() book: BookDto) {
        return await this.booksService.update(id, book);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number) {
        return await this.booksService.delete(id);
    }

    @Get('/:bookId/tracking')
    async findTrackingByBookId(@Param('bookId') bookId: number) {
        return {
            book: await this.booksService.findOneById(bookId),
            tracking: await this.trackingService.findByBookId(bookId)
        }
    }

    @Post('/:bookId/tracking')
    async createTracking(@Param('bookId') bookId: number, @Body() tracking: TrackingDto) {
        let result: [Number];

        if (tracking.action == 'IN') {
            result = await this.booksService.checkIn(bookId);
        } else {
            result = await this.booksService.checkOut(bookId);
        }

        if (result) {
            return await this.trackingService.create(tracking);
        }

        throw new UnprocessableEntityException();
    }
}
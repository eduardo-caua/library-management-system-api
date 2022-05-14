import { Controller, Body, Post, Get, Put, Delete, Patch, Param, UnprocessableEntityException, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { TrackingService } from '../tracking/tracking.service';
import { BookTrackingDto } from './dto/bookTracking.dto';
import { OFFSET, LIMIT }  from '../../core/constants';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService, private trackingService: TrackingService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async findBooks(
        @Query('_offset') offset: number,
        @Query('_limit') limit: number,
        @Query('title') title: string
    ) {
        return await this.booksService.find(title, offset || OFFSET, limit || LIMIT);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async findOneBookById(@Param('id') id: number) {
        return await this.booksService.findOneById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() book: BookDto) {
        return await this.booksService.create(book);
    }

    @Put('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async update(@Param('id') id: number, @Body() book: BookDto) {
        return await this.booksService.update(id, book);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: number) {
        return await this.booksService.delete(id);
    }

    @Get('/:bookId/tracking')
    @HttpCode(HttpStatus.OK)
    async findTrackingByBookId(
        @Param('bookId') bookId: number,
        @Query('_offset') offset: number,
        @Query('_limit') limit: number,
    ) {
        return {
            book: await this.booksService.findOneById(bookId),
            ... await this.trackingService.findByBookId(bookId, offset || OFFSET, limit || LIMIT)
        }
    }

    @Post('/:bookId/tracking')
    @HttpCode(HttpStatus.CREATED)
    async createTracking(@Param('bookId') bookId: number, @Body() tracking: BookTrackingDto) {
        let result: [Number];

        if (tracking.action == 'CHECK IN') {
            result = await this.booksService.checkIn(bookId);
        } else {
            result = await this.booksService.checkOut(bookId, tracking.dueDate);
        }

        if (result) {
            return await this.trackingService.create(tracking);
        }

        throw new UnprocessableEntityException();
    }

    @Patch('/:bookId/tracking/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async updateTracking(@Param('bookId') bookId: number, @Param('id') id: number, @Body() tracking: BookTrackingDto) {
        let result: [Number];

        console.log(tracking);

        if (tracking.action == 'CHECK IN') {
            result = await this.booksService.checkIn(bookId);
        } else {
            result = await this.booksService.checkOut(bookId, tracking.dueDate);
        }

        if (result) {
            return await this.trackingService.update(id, tracking);
        }

        throw new UnprocessableEntityException();
    }
}
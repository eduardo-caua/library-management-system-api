import { Controller, Body, Post, Get, Put, Delete, Patch, Param, UnprocessableEntityException, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { TrackingService } from '../tracking/tracking.service';
import { BookTrackingDto } from './dto/bookTracking.dto';
import { OFFSET, LIMIT }  from '../../core/constants';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';
import { BooksDto } from './dto/books.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrackingDto } from '../tracking/dto/tracking.dto';
import { BooksTrackingDto } from './dto/booksTracking.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService, private trackingService: TrackingService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Find for books' })
    @ApiResponse({ status: 200, description: 'Successfully requested.', type: BooksDto })
    async findBooks(
        @Query('_offset') offset: number,
        @Query('_limit') limit: number,
        @Query('title') title: string,
        @Query('status') status: string,
    ) {
        return await this.booksService.find(title, status, offset || OFFSET, limit || LIMIT);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Find for a book by Id' })
    @ApiResponse({ status: 200, description: 'Successfully requested.', type: BookDto })
    async findOneBookById(@Param('id') id: number) {
        return await this.booksService.findOneById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a book' })
    @ApiResponse({ status: 201, description: 'Successfully requested.', type: BookDto })
    async create(@Body() book: BookDto) {
        return await this.booksService.create(book);
    }

    @Put('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Update a book by Id' })
    @ApiResponse({ status: 204, description: 'Successfully requested.' })
    async update(@Param('id') id: number, @Body() book: BookDto) {
        return await this.booksService.update(id, book);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a book by Id' })
    @ApiResponse({ status: 204, description: 'Successfully requested.' })
    async delete(@Param('id') id: number) {
        return await this.booksService.delete(id);
    }

    @Get('/:bookId/tracking')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Find tracking by Book Id' })
    @ApiResponse({ status: 200, description: 'Successfully requested.', type: BooksTrackingDto })
    async findTrackingByBookId(
        @Param('bookId') bookId: number,
        @Query('_offset') offset: number,
        @Query('_limit') limit: number,
    ) {
        const tracking: BooksTrackingDto = { 
            book: await this.booksService.findOneById(bookId), 
            ...await this.trackingService.findByBookId(bookId, offset || OFFSET, limit || LIMIT)
        };
        return tracking;
    }

    @Post('/:bookId/tracking')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create tracking for a Book' })
    @ApiResponse({ status: 201, description: 'Successfully requested.', type: TrackingDto })
    @ApiResponse({ status: 422, description: 'Unprocessable entity.'})
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
    @ApiOperation({ summary: 'Update tracking for a Book' })
    @ApiResponse({ status: 201, description: 'Successfully requested.', type: TrackingDto })
    @ApiResponse({ status: 422, description: 'Unprocessable entity.'})
    async updateTracking(@Param('bookId') bookId: number, @Param('id') id: number, @Body() tracking: BookTrackingDto) {
        let result: [Number];

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
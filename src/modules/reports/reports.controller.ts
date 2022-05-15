import { Controller, Get, HttpCode, HttpStatus, Query, Res } from '@nestjs/common';
import { BooksService } from '../books/books.service';
import { ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Parser as CsvParser} from 'json2csv';
import { Response } from 'express';
import { BooksMetricsDto } from '../books/dto/booksMetrics.dto';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
    constructor(private booksService: BooksService) {}

    @Get('/books')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Download book reports' })
    @ApiResponse({ status: 200, description: 'Successfully requested.'})
    @ApiProduces('text/csv')
    async findBooks(
        @Res() res: Response,
        @Query('title') title?: string,
        @Query('status') status?: string,
    ) {
        const books = await this.booksService.findAll(title, status);
        const fields = ["id","title","author","isbn","description","status","dueDate","createdAt","updatedAt"];
        const csvParser = new CsvParser({ fields });
        const csv = csvParser.parse(books);

        return res
            .set('Content-Type', 'text/csv')
            .set('Content-Disposition', `attachment; filename=books-report-${new Date().toISOString()}.csv`)
            .status(200)
            .end(csv);
    }

    @Get('/books-metrics')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Find for books metrics' })
    @ApiResponse({ status: 200, description: 'Successfully requested.', type: BooksMetricsDto })
    async findBooksMetrics() {
        return await this.booksService.findMetrics();
    }
}
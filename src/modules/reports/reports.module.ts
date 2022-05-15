import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { BooksService } from '../books/books.service';
import { booksProviders } from '../books/books.providers';

@Module({
    controllers: [ReportsController],
    providers: [BooksService, ...booksProviders],
    exports: [BooksService],
})
export class ReportsModule {}
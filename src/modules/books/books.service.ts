import { Injectable, Inject } from '@nestjs/common';
import { Op } from 'sequelize';
import { BOOK_REPOSITORY, DELAYED, CHECKED_OUT, AVAILABLE } from '../../core/constants';
import { Book } from './book.entity';
import { BookDto } from './dto/book.dto';
import { BooksDto } from './dto/books.dto';

@Injectable()
export class BooksService {

    constructor(@Inject(BOOK_REPOSITORY) private readonly bookRepository: typeof Book) { }

    async find(title: string, status: string, offset: number, limit: number): Promise<BooksDto> {
        let options: object = {
            limit: limit,
            offset: offset,
            order: [
                ['title', 'ASC']
            ]
        };

        options['where'] = {};

        if (title) {
            options['where']['title'] = {
                [Op.iLike]: `%${title}%`
            };
        }

        if (status) {
            if (status == DELAYED) {
                options['where']['status'] = CHECKED_OUT;
                options['where']['dueDate'] = {
                    [Op.lte]: new Date()
                }
            } else {
                options['where']['status'] = status;
            }
        }

        return await this.bookRepository.findAndCountAll<Book>(options);
    }

    async findOneById(id: number): Promise<Book> {
        return await this.bookRepository.findOne<Book>({ where: { id } });
    }

    async findOneByIdAndStatus(id: number, status: string): Promise<Book> {
        return await this.bookRepository.findOne<Book>({ where: { id, status } });
    }

    async count(): Promise<Number> {
        return await this.bookRepository.count();
    }

    async create(book: BookDto): Promise<Book> {
        return await this.bookRepository.create<Book>(book);
    }

    async update(id: number, book: BookDto): Promise<[Number]> {
        return await this.bookRepository.update<Book>(book, { where: { id } });
    }

    async delete(id: number): Promise<Boolean> {
        return await this.bookRepository.destroy<Book>({ where: { id } }) == 1;
    }

    async checkOut(id: number, dueDate: string): Promise<[Number]> {
        return await this.bookRepository.update<Book>({ status: CHECKED_OUT, dueDate: dueDate }, { where: { id } });
    }

    async checkIn(id: number): Promise<[Number]> {
        return await this.bookRepository.update<Book>({ status: AVAILABLE, dueDate: null }, { where: { id } });
    }
}
import { Injectable, Inject } from '@nestjs/common';
import { Book } from './book.entity';
import { BookDto } from './dto/book.dto';
import { BOOK_REPOSITORY } from '../../core/constants';

@Injectable()
export class BooksService {

    constructor(@Inject(BOOK_REPOSITORY) private readonly bookRepository: typeof Book) { }

    async find(): Promise<Book[]> {
        return await this.bookRepository.findAll<Book>({
            order: [['title', 'ASC']]
        });
    }

    async findOneById(id: number): Promise<Book> {
        return await this.bookRepository.findOne<Book>({ where: { id } });
    }

    async findOneByIdAndStatus(id: number, status: string): Promise<Book> {
        return await this.bookRepository.findOne<Book>({ where: { id, status } });
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
        return await this.bookRepository.update<Book>({ status: 'CHECKED-OUT', dueDate: dueDate }, { where: { id } });
    }

    async checkIn(id: number): Promise<[Number]> {
        return await this.bookRepository.update<Book>({ status: 'AVAILABLE', dueDate: null }, { where: { id } });
    }
}
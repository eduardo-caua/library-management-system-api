import { Book } from './book.entity';
import { BOOK_REPOSITORY } from '../../core/constants';

export const booksProviders = [{
    provide: BOOK_REPOSITORY,
    useValue: Book,
}];
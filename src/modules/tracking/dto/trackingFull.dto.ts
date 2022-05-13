import { BookDto } from '../../books/dto/book.dto';
import { CustomerDto } from '../../customers/dto/customer.dto';

export class TrackingFullDto {
    readonly book: BookDto;
    readonly bookId: number;
    readonly customer: CustomerDto;
    readonly customerId: number;
    readonly dueDate: string;
    readonly action: string;
}
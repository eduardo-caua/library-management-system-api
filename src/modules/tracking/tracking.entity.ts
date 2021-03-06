import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Book } from '../books/book.entity';
import { Customer } from '../customers/customer.entity';

@Table
export class Tracking extends Model<Tracking> {
    @ForeignKey(() => Book)
    @Column
    bookId: number;

    @BelongsTo(() => Book)
    book: Book;

    @ForeignKey(() => Customer)
    @Column
    customerId: number;

    @BelongsTo(() => Customer)
    customer: Customer;

    @Column({
        type: DataType.ENUM,
        values: ['CHECK IN', 'CHECK OUT'],
        allowNull: false,
    })
    action: string;
}
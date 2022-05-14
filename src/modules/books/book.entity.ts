import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Book extends Model<Book> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    author: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    isbn: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;

    @Column({
        type: DataType.ENUM,
        values: ['IN', 'OUT'],
        allowNull: false,
        defaultValue: 'IN',
    })
    status: string;

    @Column({
        type: DataType.DATEONLY,
        allowNull: true,
    })
    dueDate: string;
}
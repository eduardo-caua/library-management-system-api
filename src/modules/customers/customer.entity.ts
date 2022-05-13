import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Customer extends Model<Customer> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    address: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    phone: string;
}
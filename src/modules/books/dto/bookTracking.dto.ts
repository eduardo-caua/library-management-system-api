export class BookTrackingDto {
    readonly bookId: number;
    readonly customerId: number;
    readonly action: string;
    readonly dueDate: string;
}
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './modules/books/books.module';
import { CustomersModule } from './modules/customers/customers.module';
import { TrackingModule } from './modules/tracking/tracking.module';
import { DatabaseModule } from './core/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    BooksModule,
    CustomersModule,
    TrackingModule
  ],
})
export class AppModule {}

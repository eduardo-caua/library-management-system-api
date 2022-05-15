import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';
import { BooksService } from '../books/books.service';

describe('ReportsController', () => {
  let controller: ReportsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ReportsController],
      providers: [BooksService],
    }).compile();

    controller = app.get<ReportsController>(ReportsController);
  });

  describe('root', () => {
    it('should return empty list', () => {
      expect([]).toBe([]);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('BooksController', () => {
  let controller: BooksController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    }).compile();

    controller = app.get<BooksController>(BooksController);
  });

  describe('root', () => {
    it('should return empty list', () => {
      expect(controller.findBooks()).toBe([]);
    });
  });
});

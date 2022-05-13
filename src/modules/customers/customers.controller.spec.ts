import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

describe('CustomersController', () => {
  let controller: CustomersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [CustomersService],
    }).compile();

    controller = app.get<CustomersController>(CustomersController);
  });

  describe('root', () => {
    it('should return empty list', () => {
      expect(controller.findCustomers()).toBe([]);
    });
  });
});

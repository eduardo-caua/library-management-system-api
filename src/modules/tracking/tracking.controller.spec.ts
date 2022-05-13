import { Test, TestingModule } from '@nestjs/testing';
import { TrackingController } from './tracking.controller';
import { TrackingService } from './tracking.service';

describe('TrackingController', () => {
  let controller: TrackingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TrackingController],
      providers: [TrackingService],
    }).compile();

    controller = app.get<TrackingController>(TrackingController);
  });

  describe('root', () => {
    it('should return empty list', () => {
      expect(controller.findTrackingById(1)).toBe([]);
    });
  });
});

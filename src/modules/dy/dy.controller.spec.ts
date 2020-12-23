import { Test, TestingModule } from '@nestjs/testing';
import { DyController } from './dy.controller';

describe('DyController', () => {
  let controller: DyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DyController],
    }).compile();

    controller = module.get<DyController>(DyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

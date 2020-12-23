import { Test, TestingModule } from '@nestjs/testing';
import { DyService } from './dy.service';

describe('DyService', () => {
  let service: DyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DyService],
    }).compile();

    service = module.get<DyService>(DyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

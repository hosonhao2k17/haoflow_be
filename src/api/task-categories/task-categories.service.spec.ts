import { Test, TestingModule } from '@nestjs/testing';
import { TaskCategoriesService } from './task-categories.service';

describe('TaskCategoriesService', () => {
  let service: TaskCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskCategoriesService],
    }).compile();

    service = module.get<TaskCategoriesService>(TaskCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

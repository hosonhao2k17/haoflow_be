import { Test, TestingModule } from '@nestjs/testing';
import { TaskCategoriesController } from './task-categories.controller';
import { TaskCategoriesService } from './task-categories.service';

describe('TaskCategoriesController', () => {
  let controller: TaskCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskCategoriesController],
      providers: [TaskCategoriesService],
    }).compile();

    controller = module.get<TaskCategoriesController>(TaskCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

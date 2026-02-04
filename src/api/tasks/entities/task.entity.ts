import { DailyPlanEntity } from "src/api/daily-plans/entities/daily-plan.entity";
import { TaskCategoryEntity } from "src/api/task-categories/entities/task-category.entity";
import { TaskStatus } from "src/common/constants/app.constant";
import { AbstractEntity } from "src/database/entities/abstract.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('tasks')
export class TaskEntity extends AbstractEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    todo: string;

    @Column({
        type: 'date'
    })
    startTime: Date;

    @Column({
        type: 'date'
    })
    endTime: Date;

    @Column({
        type: 'int',
        default: 0
    })
    orderIndex: number;

    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.TODO
    })
    status: TaskStatus;

    @ManyToOne(() => TaskCategoryEntity, (taskCategory) => taskCategory.tasks)
    category: TaskCategoryEntity;

    @ManyToOne(() => DailyPlanEntity, (dailyPlan) => dailyPlan.tasks)
    dailyPlan: DailyPlanEntity
}

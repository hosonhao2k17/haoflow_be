import { DailyPlanEntity } from "src/api/daily-plans/entities/daily-plan.entity";
import { TaskCategoryEntity } from "src/api/task-categories/entities/task-category.entity";
import { TaskStatus } from "src/common/constants/app.constant";
import { Priority } from "src/common/constants/priority.constant";
import { AbstractEntity } from "src/database/entities/abstract.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('tasks')
export class TaskEntity extends AbstractEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    todo: string;

    @Column({nullable: true})
    description?: string;

    @Column({
        type: 'enum',
        enum: Priority,
        default: Priority.MEDIUM
    })
    priority: Priority;

    @Column({
        type: 'time'
    })
    startTime: string;

    @Column({
        type: 'time'
    })
    endTime: string;

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

    @Column()
    categoryId: string;

    @Column()
    dailyPlanId: string;

    @ManyToOne(() => TaskCategoryEntity, (taskCategory) => taskCategory.tasks)
    category: TaskCategoryEntity;

    @ManyToOne(() => DailyPlanEntity, (dailyPlan) => dailyPlan.tasks)
    dailyPlan: DailyPlanEntity
}

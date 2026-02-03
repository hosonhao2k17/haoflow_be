import { TaskCategoryEntity } from "src/api/task-categories/entities/task-category.entity";
import { TaskStatus } from "src/common/constants/app.constant";
import { AbstractEntity } from "src/database/entities/abstract.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('tasks')
export class TaskEntity extends AbstractEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({
        type: 'text',
        nullable: true
    })
    description?: string;

    @Column({
        type: 'date'
    })
    startTime: Date;

    @Column({
        type: 'date'
    })
    endTime: Date;

    @Column({
        type: 'int'
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
}

import { TaskEntity } from "src/api/tasks/entities/task.entity";
import { AbstractEntity } from "src/database/entities/abstract.entity";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('task_categories')
export class TaskCategoryEntity extends AbstractEntity{

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
        nullable: true
    })
    thumbnail?: string;

    @DeleteDateColumn()
    deletedAt?: Date;

    @OneToMany(() => TaskEntity, (tasks) => tasks.category )
    tasks: TaskEntity[];

}

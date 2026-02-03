import { TaskEntity } from "src/api/tasks/entities/task.entity";
import { AbstractEntity } from "src/database/entities/abstract.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('daily_plans')
export class DailyPlanEntity extends AbstractEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'date'
    })
    date: Date;

    @OneToMany(() => TaskEntity, (tasks) => tasks.dailyPlan)
    tasks: TaskEntity;
}

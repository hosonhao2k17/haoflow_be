import { TaskEntity } from "src/api/tasks/entities/task.entity";
import { AbstractEntity } from "src/database/entities/abstract.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TimeBlockEntity } from "./time-block.entity";

@Entity('daily_plans')
export class DailyPlanEntity extends AbstractEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({
        nullable: true
    })
    description: string;

    @Column({
        type: 'date'
    })
    date: Date;

    @OneToMany(() => TaskEntity, (tasks) => tasks.dailyPlan)
    tasks: TaskEntity;

    @OneToOne(() => TimeBlockEntity)
    @JoinColumn()
    timeBlock: TimeBlockEntity

    
}

import { AbstractEntity } from "src/database/entities/abstract.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('time_blocks')
export class TimeBlockEntity extends AbstractEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    startTime: Date;

    @Column()
    endTime: Date;
}
import { AbstractEntity } from "src/database/entities/abstract.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('time_blocks')
export class TimeBlockEntity extends AbstractEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'time'
    })
    startTime: string;

    @Column({
        type: 'time'
    })
    endTime: string;
}
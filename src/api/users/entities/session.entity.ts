import { timestamp } from "rxjs";
import { AbstractEntity } from "src/database/entities/abstract.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";


@Entity('sessions')
export class SessionEntity extends AbstractEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'timestamp'
    })
    expiresAt: Date;

    @Column()
    userId: string;

    @ManyToOne(() => UserEntity, (user) => user.sessions)
    user: UserEntity;


}
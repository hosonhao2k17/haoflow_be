import { AbstractEntity } from "src/database/entities/abstract.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";


@Entity('verifies')
export class VerifyEntity extends AbstractEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, (user) => user.verifies)
    user: UserEntity;

    @Column()
    token: string;

    @Column()
    expiresAt: Date;

    @Column({
        default: false 
    })
    used: boolean
}
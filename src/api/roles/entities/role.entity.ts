import { RoleStatus } from "src/common/constants/status.constant";
import { AbstractEntity } from "src/database/entities/abstract.entity";
import {  Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class RoleEntity extends AbstractEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @Column()
    title: string;

    @Column({
        type: 'enum', 
        enum: RoleStatus, 
        default: RoleStatus.ACTIVE 
    })
    status: RoleStatus;

    @Column({ nullable: true })
    description?: string;

    @DeleteDateColumn({ nullable: true })
    deletedAt?: Date;
    
}

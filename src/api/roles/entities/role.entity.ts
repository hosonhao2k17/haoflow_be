import { RoleStatus } from "src/common/constants/status.constant";
import { BaseEntity, Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class RoleEntity extends BaseEntity {

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

import { RoleEntity } from "src/api/roles/entities/role.entity";
import { Gender, UserStatus } from "src/common/constants/app.constant";
import { AbstractEntity } from "src/database/entities/abstract.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity extends AbstractEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    email: string;

    @Column({
        nullable: true
    })
    avatar?: string

    @Column()
    fullName: string;

    @Column({
        nullable: true
    })
    password?: string;

    @Column({
        type: 'enum',
        enum: Gender,
        nullable: true
    })
    gender?: Gender;

    @Column({
        type: 'datetime',
        nullable: true,
    })
    birthDate?: Date;

    @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.ACTIVE
    })
    status: UserStatus

    @ManyToOne(() => RoleEntity, (role) => role.users, {
        nullable: false
    })
    role: RoleEntity;
}

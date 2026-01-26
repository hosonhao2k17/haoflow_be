import { ActionPermission } from "src/common/constants/app.constant";
import { AbstractEntity } from "src/database/entities/abstract.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('permissions')
export class PermissionEntity extends AbstractEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: ActionPermission
    })
    action: ActionPermission;

    @Column({
        length: 150
    })
    subject: string;

}
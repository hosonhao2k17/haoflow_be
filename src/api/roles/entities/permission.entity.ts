import { ActionRole } from "src/common/constants/app.constant";
import { AbstractEntity } from "src/database/entities/abstract.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('permissions')
export class PermissionEntity extends AbstractEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: ActionRole
    })
    action: ActionRole;

    @Column({
        length: 150
    })
    subject: string;

}
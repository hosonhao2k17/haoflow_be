import { NotificationType } from "src/common/constants/notification.constant";
import { AbstractEntity } from "src/database/entities/abstract.entity";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('notifications')
export class NotificationEntity extends AbstractEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: NotificationType
    })
    type: NotificationType;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column({
        type: 'json',
        nullable: true
    })
    metaData: Record<string, any>

    @Column({
        type: Boolean,
        default: false
    })
    isRead: boolean;

    @Column({
        type: Date,
        nullable: true
    })
    readAt?: Date;

    @BeforeInsert()
    updateReadAt() {
        if(this.isRead) {
            this.readAt = new Date()
        }
    }
}
import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Repository } from 'typeorm';
import { NotificationEntity } from './entities/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class NotificationsService {


    constructor(@InjectRepository(NotificationEntity) private notificationRepository: Repository<NotificationEntity>) {

    }

    create(dto: CreateNotificationDto) {
        const notification = this.notificationRepository.create(dto).save();
        return notification;
    }
}

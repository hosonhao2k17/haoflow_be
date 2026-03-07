import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Repository } from 'typeorm';
import { NotificationEntity } from './entities/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { InjectQueue } from '@nestjs/bullmq';
import { delay, Queue } from 'bullmq';
import { ScheduleAlarmDto } from './dto/schedule-alarm.dto';
import { NotificationType } from 'src/common/constants/notification.constant';
import { JobName } from 'src/common/constants/job.constant';

@Injectable()
export class NotificationsService {


    constructor(
        @InjectRepository(NotificationEntity) private notificationRepository: Repository<NotificationEntity>,
        @InjectQueue('notifications') private notificationQueue: Queue
    ) {

    }

    create(dto: CreateNotificationDto) {
        return this.notificationRepository.create(dto).save();
    }       
    
    async scheduleAlarm(dto: ScheduleAlarmDto) {

        const notification = await this.create({
            type: NotificationType.TASK_ALARM,
            title: "Bạn có một công việc quan trọng",
            body: dto.title,
            metadata: {
                taskId: dto.id
            }
        })

        const delay = new Date(dto.date).getTime() - Date.now()
        this.notificationQueue.add(JobName.TASK_ALARM,
        {
            taskId: dto.id,
            notification
        }, {
            delay,
            jobId: `task-alarm:${dto.id}`
        })
    }
}

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
import { requestContext } from 'src/common/context/request.context';
import { getDelay } from 'src/utils/delay';
import { AlertThresholdDto } from './dto/alert-threshold.dto';

@Injectable()
export class NotificationsService {


    constructor(
        @InjectRepository(NotificationEntity) private notificationRepository: Repository<NotificationEntity>,
        @InjectQueue('notifications') private notificationQueue: Queue
    ) {

    }

    async create(dto: CreateNotificationDto) {
        const notification = await this.notificationRepository.create(dto).save();
        return notification;
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

        const delay = getDelay(dto.date, dto.startTime);
        await  this.notificationQueue.add(JobName.TASK_ALARM,
        {
            taskId: dto.id,
            notificationId: notification.id,
            userId: requestContext.getStore()?.userId,
            title: notification.title,
            body: notification.body
        }, {
            delay,
            jobId: `task-alarm-${dto.id}`
        })
    }

    async alertThreshold(dto: AlertThresholdDto) {
        const { id, categoryTitle } = dto;
        const notification = await this.create({
            type: NotificationType.BUDGET_THRESHOLD,
            title: "Cảnh báo ngân sách",
            body: `${categoryTitle}: đã dùng ${dto.percentage}%`,
            metadata: { budgetId: id }
        });

        await this.notificationQueue.add(JobName.ALERT_THRESHOLD, {
            ...dto,
            userId: requestContext.getStore()?.userId,  
            notificationId: notification.id,
            title: notification.title,
            body: notification.body
        });
    }
}

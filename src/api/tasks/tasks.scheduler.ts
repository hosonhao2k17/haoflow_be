import { Injectable } from "@nestjs/common";
import { Cron, Interval } from "@nestjs/schedule";
import { TasksService } from "./tasks.service";
import { NotificationsService } from "../notifications/notifications.service";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskEntity } from "./entities/task.entity";
import { Repository } from "typeorm";
import { requestContext } from "src/common/context/request.context";
import { Priority } from "src/common/constants/priority.constant";


@Injectable()
export class TasksCheduler {

    constructor(
        @InjectRepository(TaskEntity) private tasksRepository: Repository<TaskEntity>,
        private notificationsService: NotificationsService
    ){}

    @Cron('0 */3 * * *')
    async remindTask() {
        const today = new Date().toISOString().split('T')[0];
        const tasks = await this.tasksRepository.find({
            where: {
                priority: Priority.CRITICAL,
                dailyPlan: {
                    date: today
                }
            }
        }); 
        for(const item of tasks) {
            await this.notificationsService.remindTask({
                userId: item.createdBy,
                dailyPlanId: item.dailyPlanId,
                title: "Bạn còn việc quan trọng",
                body: item.todo
            })
        }

    }
}
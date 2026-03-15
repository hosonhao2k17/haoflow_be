import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { EventGatewayEnum } from "src/common/constants/gateway.constant";
import { JobName } from "src/common/constants/job.constant";
import { EventsGateway } from "src/gateway/events.gateway";


@Processor('notifications')
export class NotificationConsumer extends WorkerHost {

    constructor(private eventsGateway: EventsGateway) {
        super()
    }
    async process(job: Job): Promise<any> {
        
        const {userId, ...data} = job.data
        switch(job.name) {
            case JobName.TASK_ALARM: 
                this.eventsGateway.sendToUser(userId, EventGatewayEnum.TASK_ALARM, data)
            break;
            case JobName.ALERT_THRESHOLD: 
                this.eventsGateway.sendToUser(userId, EventGatewayEnum.ALERT_THRESHOLD, data)
            break;
            case JobName.REMIND_TASK:
                this.eventsGateway.sendToUser(userId, EventGatewayEnum.REMIND_TASK, data)
        }
    }

}
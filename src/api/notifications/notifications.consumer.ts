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
    async process(job: Job, token?: string): Promise<any> {
        switch(job.name) {
            case JobName.TASK_ALARM: 
                const {userId, ...data} = job.data
                this.eventsGateway.sendToUser(userId, EventGatewayEnum.TASK_ALARM, data)
            break;
        }
    }

}
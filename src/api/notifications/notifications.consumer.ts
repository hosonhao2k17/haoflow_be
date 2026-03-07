import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { JobName } from "src/common/constants/job.constant";


@Processor('notifications')
export class NotificationConsumer extends WorkerHost {

    async process(job: Job, token?: string): Promise<any> {
        switch(job.name) {
            case JobName.TASK_ALARM: 
            
            break;
        }
    }

}
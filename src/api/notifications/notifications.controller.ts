import { Controller, Get, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { QueryNotificationDto } from './dto/query-notification.dto';
import { OffsetPaginatedRdo } from 'src/common/rdo/offset-paginated.rdo';
import { NotificationRdo } from './rdo/notification.rdo';
import { ApiEndpoint } from 'src/decorators/http.decorator';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiEndpoint({
    responseType: NotificationRdo,
    isPaginated: true,
    paginationType: 'offset'
  })
  findAll(@Query() queryDto: QueryNotificationDto) :Promise<OffsetPaginatedRdo<NotificationRdo>> {
    return this.notificationsService.findAll(queryDto)
  }
}

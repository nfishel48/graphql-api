import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateNotificationInput } from '../model/create-notification.input';
import { UpdateNotificationInput } from '../model/update-notification.input';
import { NotificationService } from '../service/notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  create(@Body() body: CreateNotificationInput) {
    return this.notificationService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateNotificationInput) {
    return this.notificationService.update({ id }, body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne({ id });
  }

  @Get()
  find(@Query() { userId, targetId, id }: { userId?: string; targetId?: string; id?: string }) {
    if (userId && !targetId && !id) {
      return this.notificationService.findByUserId(userId);
    }
    if (targetId && !userId && !id) {
      return this.notificationService.findByTargetId(targetId);
    }
    if (!targetId && !userId && id) {
      return this.notificationService.findById(id);
    }
    throw new BadRequestException();
  }
}

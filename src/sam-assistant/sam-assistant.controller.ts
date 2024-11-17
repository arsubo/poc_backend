import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { SamAssistantService } from './sam-assistant.service';
import { QuestionDto } from './dtos/question.dto';

@Controller('sam-assistant')
export class SamAssistantController {
  constructor(private readonly samAssistantService: SamAssistantService) {}

  @Post('create-thread')
  async createThread() {
    return await this.samAssistantService.createThread();
  }
  @Delete('delete-thread/:threadId')
  async deleteThread(@Param('threadId') threadId: string) {
    return await this.samAssistantService.deleteThread(threadId);
  }
  @Post('user-question')
  async userQuestion(@Body() questionDto: QuestionDto) {
    return await this.samAssistantService.userQuestion(questionDto);
  }
}

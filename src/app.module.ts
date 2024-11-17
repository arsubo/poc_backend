import { ConfigModule } from '@nestjs/config';
import { GptModule } from './gpt/gpt.module';
import { Module } from '@nestjs/common';
import { SamAssistantModule } from './sam-assistant/sam-assistant.module';

@Module({
  imports: [GptModule, ConfigModule.forRoot(), SamAssistantModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

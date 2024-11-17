import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import {
  checkCompleteStatusUseCase,
  createMessageUseCase,
  createRunUseCase,
  createThreadUseCase,
  deleteThreadUseCase,
  getMessageListUseCase,
} from './use-cases';
import { QuestionDto } from './dtos/question.dto';

@Injectable()
export class SamAssistantService {
  private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  async createThread() {
    return await createThreadUseCase(this.openai);
  }

  async deleteThread(threadId: string) {
    return await deleteThreadUseCase(this.openai, { threadId });
  }

  async userQuestion(questionDto: QuestionDto) {
    const { threadId, question } = questionDto;

    const message = await createMessageUseCase(this.openai, {
      threadId,
      question,
    });

    const run = await createRunUseCase(this.openai, { threadId });

    //chequeo de las ejecuciones del run
    await checkCompleteStatusUseCase(this.openai, { runId: run.id, threadId });

    //obtener los mensajes
    const messages = await getMessageListUseCase(this.openai, { threadId });

    return messages.reverse();
  }
}

import OpenAI from 'openai';
import { threadId } from 'worker_threads';

interface Options {
  threadId: string;
}
export const getMessageListUseCase = async (
  openAi: OpenAI,
  options: Options,
) => {
  const { threadId } = options;

  try {
    const messageList = await openAi.beta.threads.messages.list(threadId);

    //console.log({ lista: messageList });

    const messages = messageList.data.map((message) => ({
      role: message.role,
      content: message.content.map((content) => (content as any).text.value),
    }));

    return messages;
  } catch (error) {
    console.log({ 'Errorcito: ': error });
    return [];
  }
};

import OpenAI from 'openai';

interface Options {
  threadId: string;
  question: string;
}
export const createMessageUseCase = async (
  openAi: OpenAI,
  options: Options,
) => {
  const { threadId, question } = options;

  try {
    const message = await openAi.beta.threads.messages.create(threadId, {
      role: 'user',
      content: question,
    });

    return message;
  } catch (error) {
    console.log({ 'Errorcito: ': error });
  }
};

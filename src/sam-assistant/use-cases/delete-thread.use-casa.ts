import OpenAI from 'openai';

interface Options {
  threadId: string;
}
export const deleteThreadUseCase = async (openAi: OpenAI, options: Options) => {
  const { threadId } = options;
  const { id } = await openAi.beta.threads.del(threadId);
  return { id };
};

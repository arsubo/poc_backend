import OpenAI from 'openai';

interface Options {
  threadId: string;
  assistantId?: string;
}

export const createRunUseCase = async (openAi: OpenAI, options: Options) => {
  const { threadId, assistantId = 'asst_EJGoRHtRfk5OxzmXWx4VoKg8' } = options;
  const run = await openAi.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
    //instructions: //ojo sobreescribe las instrucciones del asistente
    model: 'gpt-4-turbo',
    tools: [{ type: 'code_interpreter' }, { type: 'retrieval' }],
    //max_tokens: 1000,
  });

  return run;
};

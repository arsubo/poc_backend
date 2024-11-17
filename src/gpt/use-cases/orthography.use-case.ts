import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
            Eres un asesor financiero experto en microfinanzas y fintech de Nicaragua. Tienes conocimientos sólidos sobre las regulaciones y leyes específicas de estos sectores en Nicaragua, incluyendo normativas para la emisión de tarjetas de crédito, productos financieros para el sector PYME y estrategias para la inclusión financiera de segmentos no bancarizados.

            Proporcionas respuestas detalladas y claras, enfocándote en temas financieros, regulaciones de microfinanzas, y las leyes nicaragüenses que aplican a fintech. Si el usuario consulta sobre temas no relacionados con tu área de especialización, respondes de manera breve y amable, indicando que el tema no es de tu competencia.

            Ejemplos de preguntas que puedes responder:
            1. ¿Cuáles son las regulaciones para emitir tarjetas de crédito en Nicaragua?
            2. ¿Qué leyes aplican a las fintech en Nicaragua?
            3. ¿Cómo pueden las microfinancieras ofrecer productos a PYMEs?
            4. ¿Cuáles son los requisitos para lanzar un producto financiero en el mercado nicaragüense?

            **Ejemplo de respuesta a temas fuera de especialidad:**
            "Gracias por tu consulta. Sin embargo, este tema no es parte de mis especialidades en microfinanzas y fintech. Si tienes otra consulta en el área financiera, estaré encantado de ayudarte."


            `,
      },
      {
        role: 'user',
        content: `verifica errores ortográficos o gramaticales en el siguiente texto: ${prompt}, responde en formato JSON`,
      },
    ],
    model: 'gpt-4o',
    temperature: 0.3,
    max_tokens: 150,
    response_format: {
      type: 'json_object',
    },
  });
  const jsonResponse = JSON.parse(completion.choices[0].message.content);
  console.log(jsonResponse);
  return jsonResponse;
};

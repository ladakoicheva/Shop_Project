import type { MessageItem } from "../../redux/supportChat/type";
import supportSystemPromptRaw from "../../prompts/support_system_prompt.md?raw";

export const generateSupportReply = async (
  messagesMap: { [time: string]: MessageItem },
  userEmail: string
): Promise<string> => {
  // Sort messages chronologically
  const times = Object.keys(messagesMap).filter(
    (key) => key !== 'isIncoming' && key !== 'isIncomingAdmin'
  );
  times.sort((a, b) => Number(a) - Number(b));

  const conversationHistory = times.map((t) => {
    const item = messagesMap[t];
    return `${item.is ? 'Admin' : 'Client'}: ${item.message || '(Image attachment)'}`;
  });

  const lastClientMessage = [...times]
    .reverse()
    .map((t) => messagesMap[t])
    .find((item) => !item.is)?.message;

  const rawApiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY;
  const apiKey = rawApiKey ? rawApiKey.trim() : '';

  const systemInstruction = supportSystemPromptRaw.replace('{{userEmail}}', userEmail);

  if (apiKey) {
    try {
      const contents = [
        {
          role: 'user',
          parts: [
            {
              text: `${systemInstruction}\n\nВот история переписки с клиентом:\n${conversationHistory.join(
                '\n'
              )}\n\nСгенерируй следующий краткий и вежливый ответ от имени службы поддержки:`,
            },
          ],
        },
      ];

      // Primary: gemini-2.0-flash
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ contents }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText && candidateText.trim()) {
          return candidateText.trim();
        }
      } else {
        const errText = await response.text();
        console.warn('Gemini 2.0 Flash call failed status:', response.status, errText);

        // Fallback: gemini-1.5-flash
        const fallbackResp = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents }),
          }
        );
        if (fallbackResp.ok) {
          const fallbackData = await fallbackResp.json();
          const text = fallbackData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text && text.trim()) return text.trim();
        } else {
          const fallbackErrText = await fallbackResp.text();
          console.error('Gemini 1.5 Flash fallback call failed status:', fallbackResp.status, fallbackErrText);
        }
      }
    } catch (err) {
      console.error('Error calling Gemini API:', err);
    }
  } else {
    console.warn('No Gemini API key found in VITE_GEMINI_API_KEY or VITE_FIREBASE_API_KEY');
  }

  // Smart fallback if API Key is not set or API call fails
  return getFallbackReply(lastClientMessage || '');
};

const getFallbackReply = (clientMessage: string): string => {
  const lowerMsg = clientMessage.toLowerCase();

  if (
    lowerMsg.includes('привет') ||
    lowerMsg.includes('здравствуйте') ||
    lowerMsg.includes('добрый день') ||
    lowerMsg.includes('hello') ||
    lowerMsg.includes('hi')
  ) {
    return 'Здравствуйте! Рады приветствовать вас в нашем магазине. Чем я могу вам помочь?';
  }
  if (
    lowerMsg.includes('доставк') ||
    lowerMsg.includes('отправк') ||
    lowerMsg.includes('где заказ') ||
    lowerMsg.includes('трек')
  ) {
    return 'Доставка осуществляется курьерскими службами и почтой. Подробный статус вашего заказа можно отследить в личном кабинете. Подсказать детали по конкретному заказу?';
  }
  if (
    lowerMsg.includes('возврат') ||
    lowerMsg.includes('обмен') ||
    lowerMsg.includes('брак')
  ) {
    return 'Вы можете оформить возврат или обмен товара в течение 14 дней с момента получения. Свяжитесь с нами, и мы подскажем детали!';
  }
  if (
    lowerMsg.includes('оплат') ||
    lowerMsg.includes('карт') ||
    lowerMsg.includes('чек') ||
    lowerMsg.includes('платеж')
  ) {
    return 'Мы принимаем оплату банковскими картами и электронными платежами. Все транзакции защищены.';
  }
  if (
    lowerMsg.includes('скидк') ||
    lowerMsg.includes('промокод') ||
    lowerMsg.includes('акци')
  ) {
    return 'У нас регулярно проходят акции и спецпредложения! Проверьте главную страницу нашего магазина для текущих скидок.';
  }
  if (
    lowerMsg.includes('оператор') ||
    lowerMsg.includes('человек') ||
    lowerMsg.includes('админ')
  ) {
    return 'Я передал ваше сообщение старшему администратору. Он ответит вам в ближайшее время!';
  }

  return 'Спасибо за ваше обращение! Наш специалист поддержки уже изучает ваш вопрос и ответит в ближайшее время.';
};

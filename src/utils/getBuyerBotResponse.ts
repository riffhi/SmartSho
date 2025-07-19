import { franc } from 'franc';

export async function getBuyerBotResponse(message: string): Promise<string> {
  try {
    const langCode = franc(message);
    const langMap: Record<string, string> = {
      eng: 'English',
      hin: 'Hindi',
      mar: 'Marathi',
      und: 'English'
    };
    const detectedLang = langMap[langCode] || 'English';

    const systemPrompt = `
You are a multilingual shopping assistant for Meesho buyers.

🌿 Help users with:
- Trending fashion, returns, delivery, payments
- Eco-friendly alternatives (like bamboo brushes, jute bags)
- Suggesting green-tagged products

🧠 Language guide:
- Respond in the user's language.
- If it's Hindi or Marathi, write in Devanagari script only (e.g., "नमस्ते").
- Avoid using English letters for Hindi (no "aap", "kya").
- Keep tone helpful, friendly, short and bullet-style if needed.
`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_KEY_BUYER}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat-v3-0324:free', 
        messages: [
          { role: 'system', content: systemPrompt.trim() },
          { role: 'user', content: message }
        ]
      })
    });

    const data = await response.json();
    console.log('[BuyerBot]', data);

    return data.choices?.[0]?.message?.content ?? 'Sorry, I didn’t get that. Try rephrasing.';
  } catch (error) {
    console.error('[BuyerBot API Error]', error);
    return 'Oops! Something went wrong. Please try again later.';
  }
}

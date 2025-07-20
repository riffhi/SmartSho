// import { franc } from 'franc';

// export async function getBuyerBotResponse(message: string): Promise<string> {
//   try {
//     const langCode = franc(message);
//     const langMap: Record<string, string> = {
//       eng: 'English',
//       hin: 'Hindi',
//       mar: 'Marathi',
//       und: 'English'
//     };
//     const detectedLang = langMap[langCode] || 'English';

//     const systemPrompt = `
// You are a multilingual shopping assistant for Meesho buyers.

// 🌿 Help users with:
// - Trending fashion, returns, delivery, payments
// - Eco-friendly alternatives (like bamboo brushes, jute bags)
// - Suggesting green-tagged products

// 🧠 Language guide:
// - Respond in the user's language.
// - If it's Hindi or Marathi, write in Devanagari script only (e.g., "नमस्ते").
// - Avoid using English letters for Hindi (no "aap", "kya").
// - Keep tone helpful, friendly, short and bullet-style if needed.
// `;

//     const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_KEY_BUYER}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         model: 'deepseek/deepseek-chat-v3-0324:free', 
//         messages: [
//           { role: 'system', content: systemPrompt.trim() },
//           { role: 'user', content: message }
//         ]
//       })
//     });

//     const data = await response.json();
//     console.log('[BuyerBot]', data);

//     return data.choices?.[0]?.message?.content ?? 'Sorry, I didn’t get that. Try rephrasing.';
//   } catch (error) {
//     console.error('[BuyerBot API Error]', error);
//     return 'Oops! Something went wrong. Please try again later.';
//   }
// }

import { franc } from 'franc';

export async function getBuyerBotResponse(message: string): Promise<string> {
  try {
    // Improved language detection with fallback logic
    const detectLanguage = (text: string): string => {
      // First try franc
      const langCode = franc(text);
      
      // Enhanced language mapping
      const langMap: Record<string, string> = {
        eng: 'English',
        hin: 'Hindi',
        mar: 'Marathi',
        und: 'English' // undefined defaults to English
      };
      
      // Fallback detection for short messages
      if (langCode === 'und' || text.length < 10) {
        // Check for Hindi/Devanagari characters
        if (/[\u0900-\u097F]/.test(text)) {
          return 'Hindi';
        }
        // Check for common Hindi romanized words
        if (/\b(kya|hai|hain|aap|main|mujhe|chahiye|product|delivery)\b/i.test(text)) {
          return 'Hindi';
        }
        // Default to English for short messages
        return 'English';
      }
      
      return langMap[langCode] || 'English';
    };

    const detectedLang = detectLanguage(message);
    console.log(`[BuyerBot] Detected language: ${detectedLang} for message: "${message}"`);

    const systemPrompt = `
You are a multilingual shopping assistant for Meesho buyers.

🌿 IMPORTANT: You MUST respond in ${detectedLang} language ONLY.

${detectedLang === 'Hindi' ? `
- Write ONLY in Devanagari script (नमस्ते, धन्यवाद)
- DO NOT use English letters for Hindi words (avoid "aap", "kya", "product")
- Use proper Hindi: आपका, क्या, उत्पाद, डिलीवरी
` : detectedLang === 'English' ? `
- Write ONLY in English
- Use clear, simple English
- Avoid mixing other languages
` : `
- Write ONLY in ${detectedLang}
- Use the native script for this language
`}

Help users with:
- Fashion trends, returns, delivery, payments
- Eco-friendly alternatives (bamboo brushes, jute bags, steel bottles)
- Green-tagged sustainable products
- Order tracking and customer support

Keep responses:
- Helpful and friendly
- Concise (2-3 sentences max)
- Use bullet points when listing options
- Include relevant emojis

CRITICAL: Respond ONLY in ${detectedLang}. Do not mix languages.
`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_KEY_BUYER}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Meesho Buyer Assistant'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat-v3-0324:free',
        messages: [
          { role: 'system', content: systemPrompt.trim() },
          { 
            role: 'user', 
            content: `[User wrote in ${detectedLang}]: ${message}` 
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('[BuyerBot Response]', data);

    const botResponse = data.choices?.[0]?.message?.content;
    
    if (!botResponse) {
      return detectedLang === 'Hindi' 
        ? 'क्षमा करें, मुझे आपका संदेश समझ नहीं आया। कृपया दोबारा कोशिश करें।'
        : 'Sorry, I didn\'t get that. Try rephrasing.';
    }

    return botResponse;

  } catch (error) {
    console.error('[BuyerBot API Error]', error);
    
    // Return error message in detected language if possible
    const quickLangCheck = /[\u0900-\u097F]/.test(message);
    return quickLangCheck 
      ? 'माफ करें! कुछ गलत हुआ है। कृपया बाद में कोशिश करें।'
      : 'Oops! Something went wrong. Please try again later.';
  }
}
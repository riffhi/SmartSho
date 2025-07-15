export async function getBuyerBotResponse(message: string): Promise<string> {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_KEY_BUYER}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          {
            role: 'system',
            content: `You are a friendly and helpful AI shopping assistant for Meesho buyers.

Your job is to assist users with:
- Shopping help (e.g., finding trendy clothes, category suggestions)
- Order tracking, returns, refunds, delivery and payment queries
- Recommending Meesho products based on fashion trends and needs

When asked about “trendy clothes” or what’s in style, reply with:
1. 🎉 Popular Categories: Ethnic wear, Western wear, Activewear, Accessories, Beauty
2. ✅ Specific examples like sarees, kurtis, co-ord sets, crop tops, handbags, skincare kits
3. 📱 Navigation tip: Recommend using the "Trending Now" section on the Meesho app or homepage

Keep your tone friendly, clear, concise, and helpful. Avoid long-winded answers. Respond naturally and conversationally.`
          },
          {
            role: 'user',
            content: message
          }
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

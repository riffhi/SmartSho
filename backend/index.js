import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import cors from 'cors';
import bodyParser from 'body-parser';
import { loadCSV, salesData } from './src/utils/csvLoader.js';
import { franc } from 'franc';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// 🔧 Prompt builder for matching product
function buildPrompt(product, userQuery) {
  return `
📦 Seller Product Insights:

Product: ${product.product_name}
Category: ${product.category}
Units Sold: ${product.units_sold}
Stock Left: ${product.stock_left}
Returns: ${product.returns}
Average Daily Sale: ${product.average_daily_sale}
Peak Week: ${product.peak_week}
Promotion Boost: ${product.promotion_effect}%

👤 Seller asked: "${userQuery}"

📊 Give data-driven, practical, and friendly advice for the seller.
`;
}

// 🔥 Main chatbot route
app.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ reply: 'Missing user message.' });

  // 🧠 Language detection
  const langCode = franc(message);
  const langMap = {
    eng: 'English',
    hin: 'Hindi',
    mar: 'Marathi',
    und: 'English'
  };
  const detectedLang = langMap[langCode] || 'English';

  // 🔍 Match product from sales dataset
  const product = salesData.find(p =>
    message.toLowerCase().includes(p.product_name.toLowerCase())
  );

  const productPrompt = product ? buildPrompt(product, message) : message;

  // 🧾 Smart system prompt
  const systemPrompt = `
You are a smart multilingual assistant for Meesho sellers.

🎯 Tasks:
- Answer queries about inventory, top products, restocking, trends.
- Give data-backed advice using product metrics (sales, returns, stock).
- Suggest growth tips, sustainable packaging, and marketing ideas.

🌐 Language Instructions:
- Detect user's language.
- For Hindi or Marathi, respond only in native Devanagari script.
  (e.g., "नमस्ते", "आपका उत्पाद" — do NOT use Roman script like "aap").
- Keep responses short, friendly, and clear.

🧪 Example Hindi:
"आपका उत्पाद अच्छी बिक्री कर रहा है। स्टॉक भरने पर विचार करें।"

Use bullet points or emojis for clarity when helpful.
`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat-v3-0324:free', 
        messages: [
          { role: 'system', content: systemPrompt.trim() },
          { role: 'user', content: productPrompt }
        ]
      })
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content ?? '⚠️ No reply from AI.';
    res.json({ reply });
  } catch (err) {
    console.error('❌ OpenRouter Error:', err);
    res.status(500).json({ reply: 'Error contacting OpenRouter.' });
  }
});

// 🚀 CSV and server start
console.log('🧠 Starting server...');
loadCSV().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
  });
});

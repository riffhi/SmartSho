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

// 🌐 Enhanced language detection and mapping
function getLanguageInstructions(message) {
  const langCode = franc(message);
  
  const languageMap = {
    eng: {
      name: 'English',
      instruction: 'Respond in English only.'
    },
    hin: {
      name: 'Hindi',
      instruction: 'Respond ONLY in Hindi using Devanagari script. Do NOT use Roman/English script. Example: "आपका उत्पाद अच्छी बिक्री कर रहा है।"'
    },
    mar: {
      name: 'Marathi',
      instruction: 'Respond ONLY in Marathi using Devanagari script. Do NOT use Roman/English script.'
    },
    guj: {
      name: 'Gujarati',
      instruction: 'Respond ONLY in Gujarati script.'
    },
    ben: {
      name: 'Bengali',
      instruction: 'Respond ONLY in Bengali script.'
    },
    tam: {
      name: 'Tamil',
      instruction: 'Respond ONLY in Tamil script.'
    },
    tel: {
      name: 'Telugu',
      instruction: 'Respond ONLY in Telugu script.'
    },
    kan: {
      name: 'Kannada',
      instruction: 'Respond ONLY in Kannada script.'
    },
    mal: {
      name: 'Malayalam',
      instruction: 'Respond ONLY in Malayalam script.'
    },
    und: {
      name: 'English',
      instruction: 'Respond in English only.'
    }
  };

  return languageMap[langCode] || languageMap['eng'];
}

// 🔥 Main chatbot route
app.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ reply: 'Missing user message.' });

  // 🧠 Enhanced language detection
  const languageInfo = getLanguageInstructions(message);
  
  console.log(`🌐 Detected language: ${languageInfo.name}`);

  // 🔍 Match product from sales dataset
  const product = salesData.find(p =>
    message.toLowerCase().includes(p.product_name.toLowerCase())
  );

  const productPrompt = product ? buildPrompt(product, message) : message;

  // 🧾 Dynamic system prompt based on detected language
  const systemPrompt = `
You are a smart multilingual assistant for Meesho sellers.

🎯 Tasks:
- Answer queries about inventory, top products, restocking, trends.
- Give data-backed advice using product metrics (sales, returns, stock).
- Suggest growth tips, sustainable packaging, and marketing ideas.

🌐 CRITICAL LANGUAGE INSTRUCTION:
${languageInfo.instruction}

📝 Response Guidelines:
- Keep responses short, friendly, and clear.
- Use bullet points or emojis for clarity when helpful.
- Be conversational and supportive.

REMEMBER: You must respond in the same language the user is using. If user writes in Hindi, respond ONLY in Hindi Devanagari script.
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
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content ?? '⚠️ No reply from AI.';
    
    // Log for debugging
    console.log(`📝 User (${languageInfo.name}): ${message}`);
    console.log(`🤖 AI Reply: ${reply.substring(0, 100)}...`);
    
    res.json({ 
      reply,
      detectedLanguage: languageInfo.name
    });
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
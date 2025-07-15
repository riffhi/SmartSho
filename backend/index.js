import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import cors from 'cors';
import bodyParser from 'body-parser';
import { loadCSV, salesData } from './src/utils/csvLoader.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

function buildPrompt(product, userQuery) {
  return `
You are an intelligent assistant for sellers. Use the following 1-month sales data to answer their question:

Product: ${product.product_name}
Category: ${product.category}
Units Sold: ${product.units_sold}
Stock Left: ${product.stock_left}
Returns: ${product.returns}
Average Daily Sale: ${product.average_daily_sale}
Peak Week: ${product.peak_week}
Promotion Boost: ${product.promotion_effect}%

Seller's Query: "${userQuery}"

Respond with data-backed advice. Be clear and specific.
`;
}

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ reply: 'Missing user message.' });

  const product = salesData.find(p =>
    message.toLowerCase().includes(p.product_name.toLowerCase())
  );

  const prompt = product
    ? buildPrompt(product, message)
    : `The seller asked: "${message}". Respond helpfully even if it's casual like "hi".`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          { role: 'system', content: 'You are a helpful AI assistant for sellers.' },
          { role: 'user', content: prompt }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || '⚠️ No reply from AI.';
    res.json({ reply });
  } catch (err) {
    console.error('❌ OpenRouter Error:', err);
    res.status(500).json({ reply: 'Error contacting OpenRouter.' });
  }
});

// 🚀 Load CSV then start server
console.log('🧠 Starting server...');
loadCSV().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
  });
});

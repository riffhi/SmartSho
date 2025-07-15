// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { Product } from '../types';

// const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Try newer model

// export async function getSustainabilityScore(description: string, productName?: string): Promise<number> {
//   const productInfo = productName ? `${productName} - ${description}` : description;
//   const prompt = `You are a sustainability expert. Rate this product's environmental impact on a scale of 1-10, where:
// - 1-2: Very harmful to environment (high carbon footprint, toxic materials, single-use)
// - 3-4: Harmful (some environmental concerns)
// - 5-6: Neutral/Mixed impact
// - 7-8: Environmentally friendly (sustainable materials, energy efficient)
// - 9-10: Excellent for environment (renewable, biodegradable, minimal footprint)

// Product: ${productInfo}

// Respond with only a single digit between 1 and 10. No explanation, no text, just the number.`;

//   try {
//     const result = await model.generateContent({
//       contents: [{ role: 'user', parts: [{ text: prompt }] }],
//       generationConfig: {
//         temperature: 0.1,
//         topK: 1,
//         topP: 0.1,
//         maxOutputTokens: 5,
//         stopSequences: ['\n', ' ', '.'],
//       },
//     });
    
//     const text = result.response.text().trim();
    
//     console.log('=== GEMINI DEBUG ===');
//     console.log('Product description:', description);
//     console.log('Raw response:', JSON.stringify(text));
//     console.log('Raw response chars:', [...text].map(c => c.charCodeAt(0)));
    
//     // More robust number extraction
//     const cleanText = text.replace(/[^\d]/g, '');
//     console.log('Cleaned text:', cleanText);
    
//     let score = 5; // default fallback
    
//     if (cleanText.length > 0) {
//       const extractedNumber = parseInt(cleanText.charAt(0), 10);
//       if (!isNaN(extractedNumber) && extractedNumber >= 1 && extractedNumber <= 10) {
//         score = extractedNumber;
//         console.log('Successfully extracted:', score);
//       } else {
//         console.log('Invalid number extracted:', extractedNumber);
//       }
//     } else {
//       console.log('No digits found in response');
//     }
    
//     console.log('Final score:', score);
//     console.log('=== END DEBUG ===');
    
//     return score;
//   } catch (error) {
//     console.error('Gemini error:', error);
//     return 5;
//   }
// }

// // Alternative approach with structured output
// export async function getSustainabilityScoreStructured(description: string): Promise<number> {
//   const prompt = `Rate the sustainability of this product: ${description}

// Consider factors like:
// - Material sourcing and recyclability
// - Production process environmental impact
// - Transportation and packaging
// - End-of-life disposal
// - Energy efficiency during use

// Provide your response in this exact format:
// SCORE: [number from 1-10]`;

//   try {
//     const result = await model.generateContent({
//       contents: [{ role: 'user', parts: [{ text: prompt }] }],
//       generationConfig: {
//         temperature: 0.2,
//         maxOutputTokens: 50,
//       },
//     });
    
//     const text = result.response.text().trim();
//     console.log('Structured response:', text);
    
//     // Look for "SCORE: X" pattern
//     const scoreMatch = text.match(/SCORE:\s*(\d+)/i);
//     if (scoreMatch) {
//       const score = parseInt(scoreMatch[1], 10);
//       if (score >= 1 && score <= 10) {
//         return score;
//       }
//     }
    
//     // Fallback to general number extraction
//     const numberMatch = text.match(/\b(\d+)\b/);
//     if (numberMatch) {
//       const score = parseInt(numberMatch[1], 10);
//       if (score >= 1 && score <= 10) {
//         return score;
//       }
//     }
    
//     return 5;
//   } catch (error) {
//     console.error('Structured method error:', error);
//     return 5;
//   }
// }

// // Test function with better error handling
// export async function testGeminiAPI(): Promise<void> {
//   try {
//     console.log('Testing Gemini API...');
//     console.log('API Key present:', !!import.meta.env.VITE_GEMINI_API_KEY);
//     console.log('API Key length:', import.meta.env.VITE_GEMINI_API_KEY?.length);
    
//     // First test basic connectivity
//     console.log('\n=== BASIC CONNECTIVITY TEST ===');
//     const basicTest = await model.generateContent('Respond with exactly: 7');
//     console.log('Basic test response:', JSON.stringify(basicTest.response.text()));
//     console.log('Basic test response type:', typeof basicTest.response.text());
    
//     // Test simple number generation
//     console.log('\n=== SIMPLE NUMBER TEST ===');
//     const numberTest = await model.generateContent('Give me a number between 1 and 10');
//     console.log('Number test response:', JSON.stringify(numberTest.response.text()));
    
//     // Test with one product manually
//     console.log('\n=== MANUAL PRODUCT TEST ===');
//     const manualTest = await model.generateContent('Rate the sustainability of a plastic water bottle from 1-10. Reply with just the number.');
//     console.log('Manual test response:', JSON.stringify(manualTest.response.text()));
    
//     // Test with different products
//     const testProducts = [
//       'Plastic water bottle',
//       'Solar panel',
//       'Reusable metal water bottle'
//     ];
    
//     console.log('\n=== TESTING PRODUCTS ===');
//     for (const product of testProducts) {
//       console.log(`\n--- Testing: ${product} ---`);
//       const score1 = await getSustainabilityScore(product);
//       console.log(`Method 1 result: ${score1}`);
      
//       // Add delay to avoid rate limiting
//       await new Promise(resolve => setTimeout(resolve, 1000));
//     }
//   } catch (error) {
//     console.error('API test failed:', error);
//     console.error('Error details:', {
//       message: error.message,
//       stack: error.stack,
//       name: error.name
//     });
//   }
// }

// // Simple fallback method
// export async function getSustainabilityScoreSimple(description: string): Promise<number> {
//   try {
//     console.log('\n=== SIMPLE METHOD TEST ===');
//     console.log('Description:', description);
    
//     const result = await model.generateContent(`Rate sustainability 1-10: ${description}`);
//     const text = result.response.text();
    
//     console.log('Raw response:', text);
//     console.log('Response length:', text.length);
    
//     // Extract any number from 1-10
//     const numbers = text.match(/[1-9]|10/g);
//     console.log('Found numbers:', numbers);
    
//     if (numbers && numbers.length > 0) {
//       const score = parseInt(numbers[0], 10);
//       console.log('Using score:', score);
//       return score;
//     }
    
//     return 5;
//   } catch (error) {
//     console.error('Simple method error:', error);
//     return 5;
//   }
// }

// // Check if API key is working
// export async function checkAPIKey(): Promise<boolean> {
//   try {
//     const result = await model.generateContent('Hello');
//     return true;
//   } catch (error) {
//     console.error('API Key check failed:', error);
//     return false;
//   }
// }
// export async function batchGetSustainabilityScores(descriptions: string[]): Promise<number[]> {
//   const scores: number[] = [];
  
//   for (let i = 0; i < descriptions.length; i++) {
//     try {
//       const score = await getSustainabilityScore(descriptions[i]);
//       scores.push(score);
//       console.log(`Processed ${i + 1}/${descriptions.length}: ${descriptions[i]} -> ${score}`);
      
//       // Rate limiting
//       if (i < descriptions.length - 1) {
//         await new Promise(resolve => setTimeout(resolve, 200));
//       }
//     } catch (error) {
//       console.error(`Error processing item ${i}:`, error);
//       scores.push(5); // fallback
//     }
//   }
  
//   return scores;
// }
// src/lib/openai.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

// In-memory storage for sustainability scores
interface ScoreCache {
  [key: string]: {
    score: number;
    timestamp: number;
  };
}

let scoreCache: ScoreCache = {};

// Initialize cache from localStorage if available
function initializeCache() {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const cached = localStorage.getItem('sustainability_scores');
      if (cached) {
        scoreCache = JSON.parse(cached);
      }
    } catch (error) {
      console.warn('Failed to load cache from localStorage:', error);
    }
  }
}

// Save cache to localStorage
function saveCache() {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.setItem('sustainability_scores', JSON.stringify(scoreCache));
    } catch (error) {
      console.warn('Failed to save cache to localStorage:', error);
    }
  }
}

// Generate a cache key from description
function getCacheKey(description: string): string {
  return description.toLowerCase().trim();
}

// Check if cached score is still valid (24 hours)
function isCacheValid(timestamp: number): boolean {
  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  return Date.now() - timestamp < CACHE_DURATION;
}

async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 500): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    if (
      retries > 0 &&
      (error?.message?.includes('overloaded') || error?.message?.includes('429'))
    ) {
      console.warn(`Retrying... (${3 - retries + 1})`);
      await new Promise(res => setTimeout(res, delay));
      return withRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}

export async function getSustainabilityScore(description: string, forceRefresh = false): Promise<number> {
  // Initialize cache if not done already
  if (Object.keys(scoreCache).length === 0) {
    initializeCache();
  }

  const cacheKey = getCacheKey(description);
  const cached = scoreCache[cacheKey];

  // Return cached score if valid and not forcing refresh
  if (!forceRefresh && cached && isCacheValid(cached.timestamp)) {
    console.log(`Using cached score for "${description}": ${cached.score}`);
    return cached.score;
  }

  // Import static scores as fallback
  const { getStaticSustainabilityScore } = await import('../data/staticSustainabilityScores');
  
  // For now, use static scores instead of API to avoid quota issues
  const staticScore = getStaticSustainabilityScore(description);
  
  // Cache the static score
  scoreCache[cacheKey] = {
    score: staticScore,
    timestamp: Date.now()
  };
  
  // Save to localStorage
  saveCache();
  
  console.log(`Using static score for "${description}": ${staticScore}`);
  return staticScore;

  const prompt = `You are a sustainability expert. Rate this product's environmental impact on a scale of 1 to 10.
- 1 = Very harmful (plastic, fast fashion, non-recyclable)
- 10 = Extremely sustainable (biodegradable, renewable, reusable)

Product Description: "${description}"

Respond with just the number.`;

  const callOpenAI = async () => {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.1,
      max_tokens: 5,
    });

    const text = completion.choices[0]?.message?.content?.trim() || '';
    const clean = text.replace(/[^\d]/g, '');
    const score = parseInt(clean.charAt(0), 10);

    return score >= 1 && score <= 10 ? score : 5;
  };

  try {
    // TEMPORARILY DISABLED - Use static scores to avoid quota issues
    // console.log(`Computing sustainability score for "${description}"...`);
    // const score = await withRetry(callOpenAI);
    
    // Use static scores instead
    const { getStaticSustainabilityScore } = await import('../data/staticSustainabilityScores');
    const score = getStaticSustainabilityScore(description);
    
    // Cache the score
    scoreCache[cacheKey] = {
      score,
      timestamp: Date.now()
    };
    
    // Save to localStorage
    saveCache();
    
    console.log(`Using static score for "${description}": ${score}`);
    return score;
  } catch (error) {
    console.error('Error getting sustainability score:', error);
    
    // Return cached score if available, even if expired
    if (cached) {
      console.log(`Using expired cached score for "${description}": ${cached.score}`);
      return cached.score;
    }
    
    // Final fallback to static score
    const { getStaticSustainabilityScore } = await import('../data/staticSustainabilityScores');
    return getStaticSustainabilityScore(description);
  }
}

export async function batchGetSustainabilityScores(descriptions: string[], forceRefresh = false): Promise<number[]> {
  const scores: number[] = [];

  for (let i = 0; i < descriptions.length; i++) {
    try {
      const score = await getSustainabilityScore(descriptions[i], forceRefresh);
      scores.push(score);
      console.log(`Processed ${i + 1}/${descriptions.length}: ${descriptions[i]} -> ${score}`);
      
      // Only add delay if we actually made an API call (not cached)
      const cacheKey = getCacheKey(descriptions[i]);
      const cached = scoreCache[cacheKey];
      if (!cached || !isCacheValid(cached.timestamp) || forceRefresh) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    } catch (error) {
      console.error(`Error processing item ${i}:`, error);
      scores.push(5);
    }
  }

  return scores;
}

// Utility functions for cache management
export function getCacheStats(): { totalEntries: number; validEntries: number; expiredEntries: number } {
  if (Object.keys(scoreCache).length === 0) {
    initializeCache();
  }
  
  const now = Date.now();
  let validEntries = 0;
  let expiredEntries = 0;
  
  Object.values(scoreCache).forEach(entry => {
    if (isCacheValid(entry.timestamp)) {
      validEntries++;
    } else {
      expiredEntries++;
    }
  });
  
  return {
    totalEntries: Object.keys(scoreCache).length,
    validEntries,
    expiredEntries
  };
}

export function clearExpiredCache(): number {
  if (Object.keys(scoreCache).length === 0) {
    initializeCache();
  }
  
  const now = Date.now();
  let removedCount = 0;
  
  Object.keys(scoreCache).forEach(key => {
    if (!isCacheValid(scoreCache[key].timestamp)) {
      delete scoreCache[key];
      removedCount++;
    }
  });
  
  if (removedCount > 0) {
    saveCache();
  }
  
  return removedCount;
}

export function clearAllCache(): void {
  scoreCache = {};
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem('sustainability_scores');
  }
}

export function precomputeScores(descriptions: string[]): Promise<number[]> {
  console.log(`Pre-computing sustainability scores for ${descriptions.length} items...`);
  return batchGetSustainabilityScores(descriptions, false);
}

export function getAllCachedScores(): ScoreCache {
  if (Object.keys(scoreCache).length === 0) {
    initializeCache();
  }
  return { ...scoreCache };
}

// Export for testing
export async function testOpenAIApi(): Promise<void> {
  try {
    console.log('Testing OpenAI API...');
    const basicTest = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Respond with exactly: 7' }],
    });
    console.log('Basic test response:', JSON.stringify(basicTest.choices[0]?.message?.content));

    const testProducts = [
      'Plastic water bottle',
      'Bamboo toothbrush',
      'Solar panel',
      'Gasoline car',
      'Organic cotton t-shirt',
      'LED light bulb',
      'Fast fashion clothing',
      'Reusable metal water bottle'
    ];

    console.log('\nTesting with caching:');
    for (const product of testProducts) {
      const score = await getSustainabilityScore(product);
      console.log(`${product}: ${score}`);
    }
    
    console.log('\nTesting cache retrieval (should be instant):');
    for (const product of testProducts) {
      const score = await getSustainabilityScore(product);
      console.log(`${product}: ${score}`);
    }
    
    console.log('\nCache stats:', getCacheStats());
  } catch (error) {
    console.error('API test failed:', error);
  }
}
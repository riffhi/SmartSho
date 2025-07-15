
// Translation service with Google Translate API integration
class TranslationService {
  private apiKey: string;
  private cache: Map<string, string> = new Map();

  constructor() {
    this.apiKey = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY || '';
  }

  async translateText(text: string, targetLanguage: string): Promise<string> {
    if (targetLanguage === 'en') return text;
    
    const cacheKey = `${targetLanguage}-${text}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            q: text,
            target: targetLanguage,
            source: 'en'
          })
        }
      );

      const data = await response.json();
      const translatedText = data.data.translations[0].translatedText;
      
      this.cache.set(cacheKey, translatedText);
      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  }
}

export const translationService = new TranslationService();
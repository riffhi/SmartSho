// backend/src/utils/cache.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CACHE_FILE = path.join(__dirname, '..', '..', 'cache.json'); // Adjust path as needed
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export let scoreCache = {};

export function initializeCache() {
    try {
        if (fs.existsSync(CACHE_FILE)) {
            const data = fs.readFileSync(CACHE_FILE, 'utf8');
            scoreCache = JSON.parse(data);
            console.log('[Cache] Cache loaded from file.');
        }
    } catch (error) {
        console.error('[Cache] Error loading cache:', error);
        scoreCache = {}; // Reset cache on error
    }
}

export function saveCache() {
    try {
        fs.writeFileSync(CACHE_FILE, JSON.stringify(scoreCache, null, 2), 'utf8');
        console.log('[Cache] Cache saved to file.');
    } catch (error) {
        console.error('[Cache] Error saving cache:', error);
    }
}

export function getCacheKey(description) {
    return description.toLowerCase().replace(/\s+/g, '-');
}

export function isCacheValid(timestamp) {
    return Date.now() - timestamp < CACHE_DURATION;
}

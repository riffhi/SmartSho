import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';

// Create __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const salesData = [];

export async function loadCSV() {
  const filePath = path.resolve(__dirname, '../../seller_sales_data.csv');
  console.log(`📄 Loading CSV from: ${filePath}`);

  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => results.push(row))
      .on('end', () => {
        salesData.push(...results);
        console.log(`✅ Loaded ${salesData.length} products from CSV`);
        resolve();
      })
      .on('error', (err) => {
        console.error('❌ CSV Load Error:', err);
        reject(err);
      });
  });
}

export { salesData };
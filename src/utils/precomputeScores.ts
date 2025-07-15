// src/scripts/precomputeScores.ts
import { precomputeScores, getCacheStats } from '../utils/generateSustainabilityScores';

// Common product descriptions you might encounter
const commonProducts = [
  // Electronics
  'Smartphone',
  'Laptop computer',
  'LED TV',
  'Wireless headphones',
  'Tablet',
  'Smart watch',
  'Gaming console',
  'Bluetooth speaker',
  'Digital camera',
  'Portable charger',
  
  // Clothing & Fashion
  'Cotton t-shirt',
  'Organic cotton t-shirt',
  'Polyester shirt',
  'Denim jeans',
  'Leather jacket',
  'Synthetic jacket',
  'Wool sweater',
  'Running shoes',
  'Leather shoes',
  'Fast fashion dress',
  
  // Home & Kitchen
  'Stainless steel water bottle',
  'Plastic water bottle',
  'Glass water bottle',
  'Ceramic coffee mug',
  'Disposable coffee cup',
  'Bamboo cutting board',
  'Plastic cutting board',
  'LED light bulb',
  'Incandescent light bulb',
  'Solar panel',
  
  // Personal Care
  'Bamboo toothbrush',
  'Plastic toothbrush',
  'Electric toothbrush',
  'Organic soap',
  'Liquid soap in plastic bottle',
  'Shampoo bar',
  'Plastic shampoo bottle',
  'Reusable menstrual cup',
  'Disposable pads',
  'Safety razor',
  
  // Transportation
  'Electric car',
  'Gasoline car',
  'Hybrid car',
  'Bicycle',
  'Electric scooter',
  'Motorcycle',
  'Public bus',
  'Airplane ticket',
  'Train ticket',
  'Walking',
  
  // Food & Beverages
  'Organic vegetables',
  'Conventional vegetables',
  'Grass-fed beef',
  'Conventional beef',
  'Plant-based protein',
  'Bottled water',
  'Tap water',
  'Organic coffee',
  'Conventional coffee',
  'Local honey',
  
  // Household Items
  'Rechargeable batteries',
  'Disposable batteries',
  'Solar charger',
  'Plastic bags',
  'Reusable shopping bags',
  'Paper towels',
  'Cloth towels',
  'Biodegradable detergent',
  'Conventional detergent',
  'Compost bin',
  
  // Office Supplies
  'Recycled paper',
  'Regular paper',
  'Refillable pen',
  'Disposable pen',
  'Digital notebook',
  'Paper notebook',
  'Reusable folder',
  'Plastic folder',
  'Solar calculator',
  'Battery calculator',
  
  // Garden & Outdoor
  'Organic fertilizer',
  'Chemical fertilizer',
  'Rain water collection',
  'Sprinkler system',
  'Native plants',
  'Exotic plants',
  'Compost',
  'Plastic planters',
  'Ceramic planters',
  'Solar garden lights'
];

async function runPrecomputation() {
  console.log('Starting pre-computation of sustainability scores...');
  console.log(`Processing ${commonProducts.length} common products`);
  
  const startTime = Date.now();
  
  try {
    const scores = await precomputeScores(commonProducts);
    
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    console.log('\n=== Pre-computation Complete ===');
    console.log(`Processed ${commonProducts.length} products in ${duration.toFixed(2)} seconds`);
    console.log(`Average: ${(duration / commonProducts.length).toFixed(2)} seconds per product`);
    
    const stats = getCacheStats();
    console.log('\nCache Statistics:');
    console.log(`Total entries: ${stats.totalEntries}`);
    console.log(`Valid entries: ${stats.validEntries}`);
    console.log(`Expired entries: ${stats.expiredEntries}`);
    
    // Show sample results
    console.log('\nSample Results:');
    commonProducts.slice(0, 10).forEach((product, index) => {
      console.log(`${product}: ${scores[index]}`);
    });
    
  } catch (error) {
    console.error('Pre-computation failed:', error);
  }
}

// Run if this file is executed directly
if (typeof window !== 'undefined') {
  // Browser environment - you can call this function manually
  (window as any).runPrecomputation = runPrecomputation;
  console.log('Pre-computation function available as window.runPrecomputation()');
} else {
  // Node environment - run immediately
  runPrecomputation();
}
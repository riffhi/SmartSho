// src/data/staticSustainabilityScores.ts
export const staticSustainabilityScores: Record<string, number> = {
  // Electronics (Generally 3-5, depends on lifecycle)
  'smartphone': 3,
  'laptop computer': 3,
  'led tv': 4,
  'wireless headphones': 3,
  'tablet': 3,
  'smart watch': 3,
  'gaming console': 2,
  'bluetooth speaker': 3,
  'digital camera': 3,
  'portable charger': 4,
  'led light bulb': 8,
  'incandescent light bulb': 2,
  'solar panel': 9,
  'solar charger': 8,
  'rechargeable batteries': 6,
  'disposable batteries': 2,

  // Clothing & Fashion
  'cotton t-shirt': 5,
  'organic cotton t-shirt': 8,
  'polyester shirt': 3,
  'denim jeans': 4,
  'leather jacket': 3,
  'synthetic jacket': 3,
  'wool sweater': 6,
  'running shoes': 4,
  'leather shoes': 4,
  'fast fashion dress': 2,
  'fast fashion clothing': 2,
  'organic clothing': 8,
  'recycled clothing': 7,

  // Water Bottles & Containers
  'stainless steel water bottle': 8,
  'reusable metal water bottle': 8,
  'plastic water bottle': 2,
  'glass water bottle': 7,
  'ceramic coffee mug': 7,
  'disposable coffee cup': 1,
  'reusable coffee cup': 8,

  // Kitchen & Home
  'bamboo cutting board': 9,
  'plastic cutting board': 3,
  'wooden cutting board': 7,
  'cast iron pan': 8,
  'non-stick pan': 4,
  'glass containers': 8,
  'plastic containers': 3,
  'paper towels': 3,
  'cloth towels': 8,
  'microfiber cloth': 6,

  // Personal Care
  'bamboo toothbrush': 9,
  'plastic toothbrush': 2,
  'electric toothbrush': 4,
  'organic soap': 8,
  'liquid soap in plastic bottle': 3,
  'shampoo bar': 9,
  'plastic shampoo bottle': 2,
  'reusable menstrual cup': 9,
  'disposable pads': 2,
  'safety razor': 8,
  'disposable razor': 1,
  'organic skincare': 8,
  'conventional skincare': 4,

  // Transportation
  'electric car': 7,
  'gasoline car': 2,
  'hybrid car': 5,
  'bicycle': 10,
  'electric scooter': 7,
  'motorcycle': 3,
  'public bus': 8,
  'train ticket': 8,
  'airplane ticket': 1,
  'walking': 10,
  'electric bike': 8,

  // Food & Beverages
  'organic vegetables': 9,
  'conventional vegetables': 6,
  'grass-fed beef': 4,
  'conventional beef': 2,
  'plant-based protein': 8,
  'bottled water': 2,
  'tap water': 9,
  'organic coffee': 7,
  'conventional coffee': 4,
  'local honey': 8,
  'imported honey': 5,
  'organic milk': 6,
  'plant-based milk': 7,
  'local produce': 8,
  'imported produce': 4,

  // Household Items
  'plastic bags': 1,
  'reusable shopping bags': 9,
  'paper bags': 5,
  'biodegradable detergent': 8,
  'conventional detergent': 3,
  'compost bin': 10,
  'trash bags': 2,
  'biodegradable trash bags': 6,
  'air freshener': 2,
  'essential oil diffuser': 7,

  // Office Supplies
  'recycled paper': 8,
  'regular paper': 4,
  'refillable pen': 7,
  'disposable pen': 2,
  'digital notebook': 6,
  'paper notebook': 4,
  'reusable folder': 6,
  'plastic folder': 3,
  'solar calculator': 8,
  'battery calculator': 3,

  // Garden & Outdoor
  'organic fertilizer': 9,
  'chemical fertilizer': 2,
  'rain water collection': 10,
  'sprinkler system': 4,
  'native plants': 9,
  'exotic plants': 5,
  'compost': 10,
  'plastic planters': 3,
  'ceramic planters': 7,
  'solar garden lights': 9,
  'traditional garden lights': 3,

  // Cleaning Products
  'vinegar cleaner': 9,
  'baking soda': 9,
  'eco-friendly cleaner': 8,
  'conventional cleaner': 3,
  'microfiber mop': 7,
  'disposable wipes': 2,
  'reusable cleaning cloths': 8,
  'paper napkins': 3,
  'cloth napkins': 8,

  // Beauty & Cosmetics
  'organic makeup': 7,
  'conventional makeup': 3,
  'refillable makeup': 8,
  'single-use makeup': 2,
  'natural deodorant': 8,
  'conventional deodorant': 4,
  'reusable cotton pads': 9,
  'disposable cotton pads': 2,

  // Baby & Kids
  'cloth diapers': 8,
  'disposable diapers': 2,
  'organic baby food': 8,
  'conventional baby food': 5,
  'wooden toys': 8,
  'plastic toys': 3,
  'organic baby clothes': 8,
  'conventional baby clothes': 5,

  // Health & Wellness
  'reusable water filter': 8,
  'bottled vitamin water': 2,
  'organic supplements': 6,
  'conventional supplements': 4,
  'yoga mat (natural)': 7,
  'yoga mat (pvc)': 3,
  'exercise bike': 6,
  'gym membership': 7,

  // Default categories for common terms
  'organic': 8,
  'biodegradable': 9,
  'recyclable': 7,
  'reusable': 8,
  'disposable': 2,
  'plastic': 2,
  'bamboo': 9,
  'wood': 7,
  'glass': 7,
  'metal': 6,
  'solar': 9,
  'electric': 6,
  'natural': 7,
  'synthetic': 3,
  'local': 8,
  'imported': 4,
  'handmade': 7,
  'mass produced': 3,
  'eco-friendly': 8,
  'sustainable': 8,
  'green': 8,
  'conventional': 4,
  'chemical': 2,
  'natural fiber': 7,
  'recycled material': 8,
  'renewable': 9,
  'biodegradable packaging': 8,
  'minimal packaging': 8,
  'excessive packaging': 2,
};

// Function to get sustainability score from static data
export function getStaticSustainabilityScore(description: string): number {
  const normalizedDescription = description.toLowerCase().trim();
  
  // Direct match
  if (staticSustainabilityScores[normalizedDescription]) {
    return staticSustainabilityScores[normalizedDescription];
  }
  
  // Keyword matching for partial matches
  const keywords = Object.keys(staticSustainabilityScores);
  
  for (const keyword of keywords) {
    if (normalizedDescription.includes(keyword)) {
      return staticSustainabilityScores[keyword];
    }
  }
  
  // Category-based scoring
  if (normalizedDescription.includes('organic') || normalizedDescription.includes('eco')) {
    return 8;
  }
  
  if (normalizedDescription.includes('plastic') || normalizedDescription.includes('disposable')) {
    return 2;
  }
  
  if (normalizedDescription.includes('solar') || normalizedDescription.includes('renewable')) {
    return 9;
  }
  
  if (normalizedDescription.includes('bamboo') || normalizedDescription.includes('biodegradable')) {
    return 9;
  }
  
  if (normalizedDescription.includes('reusable') || normalizedDescription.includes('refillable')) {
    return 8;
  }
  
  if (normalizedDescription.includes('recycled')) {
    return 7;
  }
  
  // Default score for unknown items
  return 5;
}
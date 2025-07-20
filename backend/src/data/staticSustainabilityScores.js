// backend/src/data/staticSustainabilityScores.js
// This file provides fallback static sustainability scores if AI generation fails.

const staticScores = {
    'eco-friendly cleaning kit': 8,
    'recycled plastic bottle': 9,
    'organic cotton t-shirt': 7,
    'bamboo toothbrush': 8,
    'solar powered charger': 9,
    // Add more static scores for common product descriptions as needed
};

export function getStaticSustainabilityScore(description) {
    const normalizedDescription = description.toLowerCase().trim();
    // Simple lookup for exact matches, or return a default score
    return staticScores[normalizedDescription] || 5; // Default score of 5
}

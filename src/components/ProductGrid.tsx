// import React from 'react';
// import { Product } from '../types';
// import ProductCard from './ProductCard';

// interface ProductGridProps {
//   products: Product[];
//   title: string;
//   onProductClick: (product: Product) => void;
// }

// const ProductGrid: React.FC<ProductGridProps> = ({ products, title, onProductClick }) => {
//   return (
//     <section className="py-12 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4">
//         <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{title}</h2>
        
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <ProductCard
//               key={product.id}
//               product={product}
//               onProductClick={onProductClick}
//             />
//           ))}
//         </div>
        
//         {products.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-lg">No products found</p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default ProductGrid;
import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { getSustainabilityScore } from '../utils/generateSustainabilityScores';
import { getStaticSustainabilityScore } from '../data/staticSustainabilityScores';

interface ProductGridProps {
  products: Product[];
  title: string;
  onProductClick: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title, onProductClick }) => {
  const [scoredProducts, setScoredProducts] = useState<Product[]>(products);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function enrichScores() {
      // Don't process if products already have scores
      const needsScoring = products.some(p => p.sustainabilityScore === undefined);
      if (!needsScoring) {
        setScoredProducts(products);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const updated = await Promise.all(
          products.map(async (product) => {
            // Skip if already has score
            if (product.sustainabilityScore !== undefined) {
              return product;
            }

            try {
              // Try to get score from cache/static first
              const score = await getSustainabilityScore(product.description || product.name);
              return { ...product, sustainabilityScore: score };
            } catch (error) {
              console.error(`Error getting score for ${product.name}:`, error);
              
              // Fallback to static score
              const fallbackScore = getStaticSustainabilityScore(product.description || product.name);
              return { ...product, sustainabilityScore: fallbackScore };
            }
          })
        );

        setScoredProducts(updated);
      } catch (error) {
        console.error('Error enriching scores:', error);
        setError('Failed to load sustainability scores');
        
        // Fallback: use static scores for all products
        const fallbackScored = products.map(product => ({
          ...product,
          sustainabilityScore: product.sustainabilityScore ?? 
            getStaticSustainabilityScore(product.description || product.name)
        }));
        setScoredProducts(fallbackScored);
      } finally {
        setLoading(false);
      }
    }

    enrichScores();
  }, [products]);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center">{title}</h2>
          {loading && (
            <div className="ml-4 flex items-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
              <span className="ml-2 text-sm text-gray-600">Loading scores...</span>
            </div>
          )}
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              ⚠️ {error}. Using estimated sustainability scores.
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {scoredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={onProductClick}
            />
          ))}
        </div>
        
        {scoredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
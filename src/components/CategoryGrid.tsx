import React from 'react';
import { Category } from '../types';

interface CategoryGridProps {
  categories: Category[];
  onCategoryClick: (category: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onCategoryClick }) => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Shop by Category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => onCategoryClick(category.name)}
              className="text-center cursor-pointer group"
            >
              <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-gray-100 group-hover:shadow-lg transition-shadow">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-sm font-medium text-gray-700 group-hover:text-pink-600 transition-colors">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
import { Product, Category } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Women Ethnic',
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300',
    subcategories: ['Sarees', 'Kurtas & Suits', 'Lehenga Cholis', 'Ethnic Wear']
  },
  {
    id: '2',
    name: 'Women Western',
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300',
    subcategories: ['Tops', 'Dresses', 'Jeans', 'Western Wear']
  },
  {
    id: '3',
    name: 'Men',
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=300',
    subcategories: ['Shirts', 'T-Shirts', 'Jeans', 'Formal Wear']
  },
  {
    id: '4',
    name: 'Kids',
    image: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=300',
    subcategories: ['Boys Clothing', 'Girls Clothing', 'Baby Clothing', 'Kids Accessories']
  },
  {
    id: '5',
    name: 'Home & Kitchen',
    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=300',
    subcategories: ['Kitchen Appliances', 'Home Decor', 'Furniture', 'Storage']
  },
  {
    id: '6',
    name: 'Beauty & Health',
    image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=300',
    subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Health Supplements']
  },
  {
    id: '7',
    name: 'Jewellery & Accessories',
    image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=300',
    subcategories: ['Earrings', 'Necklaces', 'Rings', 'Watches']
  },
  {
    id: '8',
    name: 'Bags & Footwear',
    image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=300',
    subcategories: ['Handbags', 'Shoes', 'Sandals', 'Sneakers']
  }
];

// More natural descriptions that still contain sustainability scoring cues

export const products: Product[] = [
  {
    id: '1',
    name: 'Women Floral Print Kurta Set',
    price: 599,
    originalPrice: 1299,
    discount: 54,
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [],
    category: 'Women Ethnic',
    subcategory: 'Kurtas & Suits',
    rating: 4.2,
    reviews: 1247,
    description: 'Beautiful floral print kurta set crafted from soft organic cotton using traditional block printing techniques. The intricate handwoven fabric feels luxurious against the skin while the natural dyes ensure vibrant, long-lasting colors. Perfect for casual outings or festive occasions. Comes in eco-friendly packaging.',
    features: [],
    inStock: true,
    seller: { name: 'Fashion Hub', rating: 4.3, location: 'Mumbai' },
    delivery: { days: 7, charge: 0, cashOnDelivery: true }
  },
  {
    id: '2',
    name: 'Men Casual Cotton Shirt',
    price: 449,
    originalPrice: 899,
    discount: 50,
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [],
    category: 'Men',
    subcategory: 'Shirts',
    rating: 4.1,
    reviews: 856,
    description: 'Classic casual cotton shirt with a modern fit that works for both office and weekend wear. Made from regular cotton with easy-care finish that resists wrinkles. The versatile design pairs well with jeans or chinos. Machine washable for convenience.',
    features: [],
    inStock: true,
    seller: { name: 'Style Store', rating: 4.2, location: 'Delhi' },
    delivery: { days: 5, charge: 0, cashOnDelivery: true }
  },
  {
    id: '3',
    name: 'Kids Cartoon Print T-Shirt',
    price: 299,
    originalPrice: 599,
    discount: 50,
    image: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [],
    category: 'Kids',
    subcategory: 'Boys Clothing',
    rating: 4.4,
    reviews: 432,
    description: 'Fun cartoon print t-shirt that kids will love to wear. Made from a comfortable cotton-polyester blend for durability and easy washing. The colorful graphics are printed with high-quality inks that won\'t fade easily. Great for active play and everyday wear.',
    features: [],
    inStock: true,
    seller: { name: 'Kids Corner', rating: 4.5, location: 'Bangalore' },
    delivery: { days: 6, charge: 0, cashOnDelivery: true }
  },
  {
    id: '4',
    name: 'Women Handbag',
    price: 799,
    originalPrice: 1599,
    discount: 50,
    image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [],
    category: 'Bags & Footwear',
    subcategory: 'Handbags',
    rating: 4.0,
    reviews: 234,
    description: 'Stylish handbag with a sleek design that complements any outfit. Features multiple compartments for organized storage and a comfortable shoulder strap. The synthetic leather exterior is easy to clean and maintain. Perfect size for daily essentials.',
    features: [],
    inStock: true,
    seller: { name: 'Bag World', rating: 4.1, location: 'Chennai' },
    delivery: { days: 7, charge: 0, cashOnDelivery: true }
  },
  {
    id: '5',
    name: 'Women Western Denim Jacket',
    price: 999,
    originalPrice: 1999,
    discount: 50,
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [],
    category: 'Women Western',
    subcategory: 'Jackets',
    rating: 4.3,
    reviews: 567,
    description: 'Trendy denim jacket with a vintage-inspired wash that adds character to any outfit. Made from durable cotton denim with classic styling details. The structured fit flatters all body types while the quality construction ensures it will last for years. A timeless wardrobe essential.',
    features: [],
    inStock: true,
    seller: { name: 'StyleStop', rating: 4.4, location: 'Pune' },
    delivery: { days: 4, charge: 0, cashOnDelivery: true }
  },
  {
    id: '6',
    name: 'Stainless Steel Water Bottle',
    price: 249,
    originalPrice: 499,
    discount: 50,
    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [],
    category: 'Home & Kitchen',
    subcategory: 'Kitchen Appliances',
    rating: 4.6,
    reviews: 800,
    description: 'Premium stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours. The durable, BPA-free construction is built to last and won\'t retain odors or flavors. Leak-proof design with wide mouth for easy filling and cleaning. An eco-friendly alternative to disposable bottles.',
    features: [],
    inStock: true,
    seller: { name: 'EcoHome', rating: 4.7, location: 'Hyderabad' },
    delivery: { days: 3, charge: 0, cashOnDelivery: true }
  },
  {
    id: '7',
    name: 'Herbal Face Wash',
    price: 199,
    originalPrice: 299,
    discount: 33,
    image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [],
    category: 'Beauty & Health',
    subcategory: 'Skincare',
    rating: 4.5,
    reviews: 945,
    description: 'Gentle herbal face wash enriched with natural aloe vera, neem, and turmeric for healthy, glowing skin. The organic formula is free from harsh chemicals and suitable for all skin types. Packaged in recyclable glass bottle. Cruelty-free and vegan-friendly.',
    features: [],
    inStock: true,
    seller: { name: 'GreenGlow', rating: 4.6, location: 'Ahmedabad' },
    delivery: { days: 2, charge: 0, cashOnDelivery: true }
  },
  {
    id: '8',
    name: 'Gold-Plated Necklace Set',
    price: 1499,
    originalPrice: 2999,
    discount: 50,
    image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [],
    category: 'Jewellery & Accessories',
    subcategory: 'Necklaces',
    rating: 4.1,
    reviews: 300,
    description: 'Elegant gold-plated necklace set with intricate design work that adds glamour to any occasion. The detailed craftsmanship showcases traditional artistry with a modern appeal. Complete set includes matching earrings. Comes in beautiful gift packaging.',
    features: [],
    inStock: true,
    seller: { name: 'ShineTime', rating: 4.2, location: 'Jaipur' },
    delivery: { days: 6, charge: 0, cashOnDelivery: true }
  },
  {
    id: '9',
    name: 'Boys Cotton Shorts',
    price: 199,
    originalPrice: 399,
    discount: 50,
    image: 'https://images.pexels.com/photos/1620761/pexels-photo-1620761.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [],
    category: 'Kids',
    subcategory: 'Boys Clothing',
    rating: 4.3,
    reviews: 410,
    description: 'Comfortable cotton shorts perfect for active boys. Made from GOTS certified organic cotton with natural dyes for safe, breathable wear. The relaxed fit allows for easy movement during play. Ethically made with sustainable practices and eco-friendly packaging.',
    features: [],
    inStock: true,
    seller: { name: 'TinyTrendz', rating: 4.3, location: 'Surat' },
    delivery: { days: 4, charge: 0, cashOnDelivery: true }
  },
  {
    id: '10',
    name: 'Men Formal Trousers',
    price: 699,
    originalPrice: 1399,
    discount: 50,
    image: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [],
    category: 'Men',
    subcategory: 'Formal Wear',
    rating: 4.0,
    reviews: 260,
    description: 'Professional formal trousers with a sharp, tailored fit ideal for office wear. The poly-cotton blend fabric is wrinkle-resistant and easy to care for. Features classic styling with a comfortable waistband and clean lines that pair well with dress shirts.',
    features: [],
    inStock: true,
    seller: { name: 'CorporateFit', rating: 4.0, location: 'Noida' },
    delivery: { days: 5, charge: 0, cashOnDelivery: true }
  }
];

// Sustainability scoring keywords you can look for in descriptions:
// High sustainability: "organic", "natural", "eco-friendly", "recyclable", "cruelty-free", "vegan", "GOTS certified", "sustainable", "ethically made"
// Medium sustainability: "cotton", "durable", "quality construction", "timeless", "BPA-free"
// Low sustainability: "synthetic", "poly-cotton blend", "chemical", "easy-care", "wrinkle-resistant"
export const featuredProducts = products.slice(0, 8);
export const bestSellers = products.slice(4, 10);
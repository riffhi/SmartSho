import { Product } from '../types';

export const ecoProducts: Product[] = [
  {
    id: 'eco-1',
    name: 'Eco Bamboo Kitchen Towels 20 sheets Reusable upto 2000 times 100% Natural and Ecofriendly Alternative to Tissue Papers',
    price: 299,
    originalPrice: 599,
    discount: 50,
    image: '/public/kitchen.png',
    images: ['/public/kitchen.png'],
    category: 'Home & Kitchen',
    subcategory: 'Kitchen Appliances',
    rating: 4.5,
    reviews: 1247,
    description: '100% Natural and Eco-friendly bamboo kitchen towels. Reusable up to 2000 times, making them a sustainable alternative to traditional tissue papers.',
    features: ['100% Bamboo fiber', 'Reusable 2000+ times', 'Super absorbent', 'Biodegradable', '67% Less Carbon Emission'],
    inStock: true,
    seller: {
      name: 'EcoLife Store',
      rating: 4.3,
      location: 'Mumbai'
    },
    delivery: {
      days: 7,
      charge: 0,
      cashOnDelivery: true
    },
    isEcoFriendly: true,
    carbonReduction: 67
  },
  {
    id: 'eco-2',
    name: 'Jute Eco-friendly Printed Unisex Canvas Shopping Bag Women\'s Tote Bag | Spacious Stylish Sturdy Handbag',
    price: 199,
    originalPrice: 399,
    discount: 50,
    image: './public/eco-2.png', // Replace with your image
    images: ['./public/eco-2.png'],
    category: 'Bags & Footwear',
    subcategory: 'Handbags',
    rating: 4.2,
    reviews: 856,
    description: 'Stylish and eco-friendly jute shopping bag. Perfect alternative to plastic bags with spacious design.',
    features: ['100% Jute material', 'Reusable design', 'Spacious interior', 'Durable handles', '60% Less Carbon Emission'],
    inStock: true,
    seller: {
      name: 'Green Fashion',
      rating: 4.2,
      location: 'Delhi'
    },
    delivery: {
      days: 5,
      charge: 0,
      cashOnDelivery: true
    },
    isEcoFriendly: true,
    carbonReduction: 60
  },
  {
    id: 'eco-3',
    name: 'Gujarat Natural Straw | Coconut Leaf | Biodegradable Eco-Friendly & Sustainable Drinking Straws (Pack of 100)',
    price: 149,
    originalPrice: 299,
    discount: 50,
    image: './public/eco-3.png', // Replace with your image
    images: ['./public/eco-3.png'],
    category: 'Home & Kitchen',
    subcategory: 'Kitchen Appliances',
    rating: 4.4,
    reviews: 432,
    description: 'Natural coconut leaf drinking straws. 100% biodegradable and sustainable alternative to plastic straws.',
    features: ['Coconut leaf material', '100% Biodegradable', 'Pack of 100', 'Chemical-free', '75% Less Carbon Emission'],
    inStock: true,
    seller: {
      name: 'Natural Products Co',
      rating: 4.5,
      location: 'Gujarat'
    },
    delivery: {
      days: 6,
      charge: 0,
      cashOnDelivery: true
    },
    isEcoFriendly: true,
    carbonReduction: 75
  },
  {
    id: 'eco-4',
    name: 'Sow and Grow Plantable Pencils (Pack Of 10 Single Pencils) Made With 100% Recycled Paper/Eco Friendly/Return Gift/Corporate Gifting/Green',
    price: 199,
    originalPrice: 399,
    discount: 50,
    image: './public/eco-4.png', // Replace with your image
    images: ['./public/eco-4.png'],
    category: 'Kids',
    subcategory: 'Kids Accessories',
    rating: 4.6,
    reviews: 234,
    description: 'Plantable pencils made from 100% recycled paper. After use, plant them to grow herbs and flowers.',
    features: ['100% Recycled paper', 'Plantable seeds', 'Pack of 10', 'Non-toxic', '80% Less Carbon Emission'],
    inStock: true,
    seller: {
      name: 'Green Stationery',
      rating: 4.1,
      location: 'Bangalore'
    },
    delivery: {
      days: 7,
      charge: 0,
      cashOnDelivery: true
    },
    isEcoFriendly: true,
    carbonReduction: 80
  },
  {
    id: 'eco-5',
    name: 'Wooden Eyewear Holder | Made With Sheesham Wood | Eyewear Showcase | 6-inch Height | Decoration | Gift Material',
    price: 399,
    originalPrice: 799,
    discount: 50,
    image: './public/eco-5.png', // Replace with your image
    images: ['/public/eco-5.png'],
    category: 'Home & Kitchen',
    subcategory: 'Home Decor',
    rating: 4.3,
    reviews: 156,
    description: 'Handcrafted wooden eyewear holder made from sustainable Sheesham wood. Perfect for organizing and displaying glasses.',
    features: ['Sheesham wood', 'Handcrafted', '6-inch height', 'Natural finish', '50% Less Carbon Emission'],
    inStock: true,
    seller: {
      name: 'Wood Craft India',
      rating: 4.4,
      location: 'Rajasthan'
    },
    delivery: {
      days: 8,
      charge: 0,
      cashOnDelivery: true
    },
    isEcoFriendly: true,
    carbonReduction: 50
  },
  {
    id: 'eco-6',
    name: 'Terracotta Clay Water Bottle | Capacity of 1 Litre | Purely Biodegradable | Plastic Alternative',
    price: 299,
    originalPrice: 599,
    discount: 50,
    image: '/public/eco-6.png', // Replace with your image
    images: ['/public/eco-6.png'],
    category: 'Home & Kitchen',
    subcategory: 'Kitchen Appliances',
    rating: 4.5,
    reviews: 678,
    description: 'Traditional terracotta clay water bottle. 100% natural and biodegradable alternative to plastic bottles.',
    features: ['Pure terracotta clay', '1 Litre capacity', 'Biodegradable', 'Natural cooling', '65% Less Carbon Emission'],
    inStock: true,
    seller: {
      name: 'Clay Craft',
      rating: 4.3,
      location: 'Tamil Nadu'
    },
    delivery: {
      days: 7,
      charge: 0,
      cashOnDelivery: true
    },
    isEcoFriendly: true,
    carbonReduction: 65
  },
  {
    id: 'eco-7',
    name: 'Bamboo Hot Dish Mats / Table Coasters | 30cm x 30cm | Bamboo Product | Strong and Durable',
    price: 249,
    originalPrice: 499,
    discount: 50,
    image: '/public/eco-7.png', // Replace with your image
    images: ['/public/eco-7.png'],
    category: 'Home & Kitchen',
    subcategory: 'Kitchen Appliances',
    rating: 4.4,
    reviews: 345,
    description: 'Durable bamboo hot dish mats and table coasters. Perfect for protecting surfaces while being eco-friendly.',
    features: ['100% Bamboo', '30cm x 30cm size', 'Heat resistant', 'Durable design', '70% Less Carbon Emission'],
    inStock: true,
    seller: {
      name: 'Bamboo Essentials',
      rating: 4.2,
      location: 'Kerala'
    },
    delivery: {
      days: 6,
      charge: 0,
      cashOnDelivery: true
    },
    isEcoFriendly: true,
    carbonReduction: 70
  },
  {
    id: 'eco-8',
    name: 'Hand Made Jute Hanging Chair | Durable Jute Product | Stylish | Comfortable | Elegant Design',
    price: 1299,
    originalPrice: 2599,
    discount: 50,
    image: '/public/eco-8.png', // Replace with your image
    images: ['/public/eco-8.png'],
    category: 'Home & Kitchen',
    subcategory: 'Furniture',
    rating: 4.6,
    reviews: 89,
    description: 'Handmade jute hanging chair with elegant design. Comfortable and stylish addition to any home.',
    features: ['100% Jute material', 'Handmade', 'Comfortable design', 'Durable construction', '50% Less Carbon Emission'],
    inStock: true,
    seller: {
      name: 'Artisan Furniture',
      rating: 4.5,
      location: 'West Bengal'
    },
    delivery: {
      days: 10,
      charge: 0,
      cashOnDelivery: true
    },
    isEcoFriendly: true,
    carbonReduction: 50
  },
  {
    id: 'eco-9',
    name: 'HomeStorie Eco-friendly Foldable Bamboo Laundry Basket Hamper with Lid Large - 57 Liter (Light Brown)',
    price: 899,
    originalPrice: 1799,
    discount: 50,
    image: '/public/eco-9.png', // Replace with your image
    images: ['/public/eco-9.png'],
    category: 'Home & Kitchen',
    subcategory: 'Storage',
    rating: 4.3,
    reviews: 234,
    description: 'Large bamboo laundry basket with lid. Foldable design for easy storage when not in use.',
    features: ['Bamboo construction', '57 Liter capacity', 'Foldable design', 'With lid', '65% Less Carbon Emission'],
    inStock: true,
    seller: {
      name: 'HomeStorie',
      rating: 4.4,
      location: 'Mumbai'
    },
    delivery: {
      days: 7,
      charge: 0,
      cashOnDelivery: true
    },
    isEcoFriendly: true,
    carbonReduction: 65
  }
];
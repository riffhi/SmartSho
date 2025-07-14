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

export const products: Product[] = [
  {
    id: '1',
    name: 'Women Floral Print Kurta Set',
    price: 599,
    originalPrice: 1299,
    discount: 54,
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'Women Ethnic',
    subcategory: 'Kurtas & Suits',
    rating: 4.2,
    reviews: 1247,
    description: 'Beautiful floral print kurta set perfect for casual and festive occasions.',
    features: ['Cotton fabric', 'Machine washable', 'Comfortable fit', 'Vibrant colors'],
    inStock: true,
    seller: {
      name: 'Fashion Hub',
      rating: 4.3,
      location: 'Mumbai'
    },
    delivery: {
      days: 7,
      charge: 0,
      cashOnDelivery: true
    }
  },
  {
    id: '2',
    name: 'Men Casual Cotton Shirt',
    price: 449,
    originalPrice: 899,
    discount: 50,
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'Men',
    subcategory: 'Shirts',
    rating: 4.1,
    reviews: 856,
    description: 'Comfortable cotton shirt for everyday wear.',
    features: ['100% Cotton', 'Regular fit', 'Easy care', 'Breathable fabric'],
    inStock: true,
    seller: {
      name: 'Style Store',
      rating: 4.2,
      location: 'Delhi'
    },
    delivery: {
      days: 5,
      charge: 0,
      cashOnDelivery: true
    }
  },
  {
    id: '3',
    name: 'Kids Cartoon Print T-Shirt',
    price: 299,
    originalPrice: 599,
    discount: 50,
    image: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'Kids',
    subcategory: 'Boys Clothing',
    rating: 4.4,
    reviews: 432,
    description: 'Fun cartoon print t-shirt for kids.',
    features: ['Soft cotton', 'Colorfast print', 'Comfortable fit', 'Machine washable'],
    inStock: true,
    seller: {
      name: 'Kids Corner',
      rating: 4.5,
      location: 'Bangalore'
    },
    delivery: {
      days: 6,
      charge: 0,
      cashOnDelivery: true
    }
  },
  {
    id: '4',
    name: 'Women Handbag',
    price: 799,
    originalPrice: 1599,
    discount: 50,
    image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'Bags & Footwear',
    subcategory: 'Handbags',
    rating: 4.0,
    reviews: 234,
    description: 'Stylish handbag for everyday use.',
    features: ['Premium material', 'Multiple compartments', 'Adjustable strap', 'Durable'],
    inStock: true,
    seller: {
      name: 'Bag World',
      rating: 4.1,
      location: 'Chennai'
    },
    delivery: {
      days: 7,
      charge: 0,
      cashOnDelivery: true
    }
  }
];

export const featuredProducts = products.slice(0, 8);
export const bestSellers = products.slice(2, 10);
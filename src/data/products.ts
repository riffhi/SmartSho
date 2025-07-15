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
    images: [],
    category: 'Women Ethnic',
    subcategory: 'Kurtas & Suits',
    rating: 4.2,
    reviews: 1247,
    description: 'Organic cotton kurta set with natural block printing using eco-friendly dyes. Handwoven fabric sourced from certified organic cotton farms in India. Minimal plastic packaging, biodegradable bags used. Traditional production methods with low water consumption and zero harmful chemicals.',
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
    description: 'Regular cotton shirt manufactured in fast-fashion facility using conventional farming methods. Synthetic dyes and chemical processing involved. Mass production with high water usage and chemical runoff. Plastic packaging and multiple transport stages from overseas manufacturing.',
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
    description: 'Polyester-cotton blend t-shirt with synthetic prints using petroleum-based inks. Machine-made in large manufacturing facility with standard industry practices. Plastic poly-bags for individual packaging. Moderate durability expected for growing children.',
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
    description: 'Synthetic leather handbag made from PVC and plastic materials. Chemical processing for texture and color. Non-biodegradable materials with limited lifespan. Factory production with standard packaging in plastic wraps and cardboard boxes.',
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
    description: 'Denim jacket made from conventional cotton with intensive water usage and chemical processing. Sandblasting and acid washing treatments. Heavy carbon footprint from multiple manufacturing stages. Durable construction designed for long-term use which improves sustainability over time.',
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
    description: 'High-grade stainless steel reusable water bottle designed to replace single-use plastic bottles. Recyclable materials, BPA-free, dishwasher safe. Minimal packaging using recyclable cardboard. Lifetime durability reduces waste generation and plastic pollution significantly.',
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
    description: 'Natural herbal face wash with organic aloe vera, neem, and turmeric. Sourced from certified organic farms. Biodegradable formula free from parabens, sulfates, and synthetic fragrances. Recyclable glass bottle with minimal plastic components. Cruelty-free and vegan certified.',
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
    description: 'Gold-plated jewelry set using mined metals and chemical electroplating processes. Mining operations have significant environmental impact including habitat destruction and water pollution. Non-renewable resource extraction with high carbon footprint. Ornate packaging with foam inserts.',
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
    description: 'GOTS certified organic cotton shorts for children. Sustainable farming practices with reduced water usage and no pesticides. Natural dyes used for coloring. Ethically produced in fair-trade certified facility. Compostable packaging materials and recyclable labels.',
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
    description: 'Poly-cotton blend formal trousers using synthetic fibers derived from petroleum. Chemical treatments for wrinkle resistance and stain protection. Factory production with standard dyeing processes. Designed for professional wear with moderate durability and easy care requirements.',
    features: [],
    inStock: true,
    seller: { name: 'CorporateFit', rating: 4.0, location: 'Noida' },
    delivery: { days: 5, charge: 0, cashOnDelivery: true }
  }
];

export const featuredProducts = products.slice(0, 8);
export const bestSellers = products.slice(4, 10);
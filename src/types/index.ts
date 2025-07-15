export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images: string[];
  category: string;
  subcategory: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  inStock: boolean;
  sustainabilityScore: number;
  seller: {
    name: string;
    rating: number;
    location: string;
  };
  delivery: {
    days: number;
    charge: number;
    cashOnDelivery: boolean;
  };
  isEcoFriendly?: boolean;
  carbonReduction?: number;
  
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  orders: Order[];
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  pincode: string;
  locality: string;
  address: string;
  city: string;
  state: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: Date;
  deliveryDate?: Date;
  address: Address;
  paymentMethod: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  subcategories: string[];
}
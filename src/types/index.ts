// Shared types that mirror the backend models

export interface Product {
  _id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  category: string;
  subcategory: string;
  description: string;
  isBestseller: boolean;
  isNew: boolean;
  tags: string[];
  skinTypes?: string[];
  concerns?: string[];
  suitableFor?: string[];
  priceCategory?: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface RecommendationBudgetRange {
  label: string;
  min: number;
  max?: number;
}

export interface RecommendationFilters {
  skinType: string;
  concerns: string[];
  category: string;
  budget: RecommendationBudgetRange | null;
}

export interface Category {
  _id: string;
  name: string;
  icon: string;
  slug: string;
  image: string;
  discount: string;
  sortOrder: number;
}

export interface Brand {
  _id: string;
  name: string;
  logo: string;
  slug: string;
  sortOrder: number;
}

export interface Review {
  _id: string;
  product: string;
  user: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  helpful: number;
  verified: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string;
  addresses: Address[];
  wishlist: string[];
}

export interface Address {
  _id?: string;
  label: string;
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface OrderItem {
  product: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  orderId: string;
  items: OrderItem[];
  shippingAddress: Omit<Address, '_id' | 'label' | 'isDefault'>;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

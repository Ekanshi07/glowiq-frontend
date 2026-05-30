import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { ApiResponse, Product, Category, Brand, Review, Order } from '../types';

// ─── Products ────────────────────────────────────────────────────────────────

export interface ProductFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  isBestseller?: boolean;
  isNewProduct?: boolean;
  sortBy?: string;
  page?: number;
  limit?: number;
  q?: string;
  id?:string
}

const toQueryString = (params: Record<string, unknown>) =>
  Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== '' && v !== null)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&');

export const useProducts = (filters: ProductFilters = {}) =>
  useQuery({
    queryKey: ['products', filters],
    queryFn: () =>
      api.get<ApiResponse<Product[]>>(`/products?${toQueryString(filters as Record<string, unknown>)}`),
    placeholderData: (prev) => prev,
  });

export const useProduct = (id: string) =>
  useQuery({
    queryKey: ['product', id],
    queryFn: () => api.get<ApiResponse<Product>>(`/products/${id}`),
    enabled: !!id,
  });

export const useRelatedProducts = (id: string) =>
  useQuery({
    queryKey: ['related', id],
    queryFn: () => api.get<ApiResponse<Product[]>>(`/products/${id}/related`),
    enabled: !!id,
  });

export const useFeaturedProducts = () =>
  useQuery({
    queryKey: ['featured'],
    queryFn: () =>
      api.get<ApiResponse<{ bestsellers: Product[]; newArrivals: Product[]; trending: Product[] }>>('/products/featured'),
    staleTime: 5 * 60 * 1000, // 5 min
  });

export const useSearchProducts = (q: string) =>
  useQuery({
    queryKey: ['search', q],
    queryFn: () => api.get<ApiResponse<Product[]>>(`/products/search?q=${encodeURIComponent(q)}`),
    enabled: q.length >= 2,
  });

// ─── Categories & Brands ──────────────────────────────────────────────────────

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: () => api.get<ApiResponse<Category[]>>('/categories'),
    staleTime: 10 * 60 * 1000,
  });

export const useBrands = () =>
  useQuery({
    queryKey: ['brands'],
    queryFn: () => api.get<ApiResponse<Brand[]>>('/brands'),
    staleTime: 10 * 60 * 1000,
  });

// ─── Reviews ──────────────────────────────────────────────────────────────────

export const useProductReviews = (productId: string, page = 1) =>
  useQuery({
    queryKey: ['reviews', productId, page],
    queryFn: () =>
      api.get<ApiResponse<Review[]>>(`/products/${productId}/reviews?page=${page}`),
    enabled: !!productId,
  });

export const useCreateReview = (productId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { rating: number; title: string; comment: string }) =>
      api.post(`/products/${productId}/reviews`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
    },
  });
};

// ─── Orders ───────────────────────────────────────────────────────────────────

export const useMyOrders = () =>
  useQuery({
    queryKey: ['myOrders'],
    queryFn: () => api.get<ApiResponse<Order[]>>('/orders/my'),
  });

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      items: { productId: string; quantity: number }[];
      shippingAddress: object;
      paymentMethod: string;
    }) => api.post<ApiResponse<Order>>('/orders', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myOrders'] });
    },
  });
};

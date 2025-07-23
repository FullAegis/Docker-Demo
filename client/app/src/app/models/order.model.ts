import { Product } from './product.model'; // Assuming Product might be nested or referenced

export interface OrderItem {
  productId: string; // Or number
  productName?: string; // Denormalized for display
  quantity: number;
  price: number; // Price at the time of order for this item
  imageUrl?: string; // Denormalized for display
}

export interface Order {
  id: string; // Or number, or even GUID string depending on API
  userId: string; // Or number
  orderDate: Date;
  status: 'pending' | 'processed' | 'shipped' | 'delivered' | 'canceled'; // Example statuses
  items: OrderItem[];
  totalAmount: number;
  shippingAddress?: any; // Define further if structure is known
  billingAddress?: any; // Define further if structure is known
  // Add other relevant order fields if known
}

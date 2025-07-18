import { Product } from './product.model'; // Or just ProductId if full product object isn't needed in cart item

export interface CartItem {
  productId: string; // Or number, consistent with Product model
  name: string; // Denormalized for easy display
  price: number; // Price at the time of adding to cart
  quantity: number;
  imageUrl?: string; // Denormalized
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  tax: number; // Assuming a fixed tax rate or calculation logic elsewhere
  grandTotal: number;
}

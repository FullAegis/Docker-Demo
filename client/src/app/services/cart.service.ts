import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cart, CartItem } from '../models/cart.model';
import { Product } from '../models/product.model'; // To add a product to cart

const TAX_RATE = 0.21; // Example tax rate (21%)
const CART_STORAGE_KEY = 'candyShopCart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject: BehaviorSubject<Cart>;
  public cart$: Observable<Cart>;

  constructor() {
    const initialCart = this.loadCartFromLocalStorage() || this.getEmptyCart();
    this.cartSubject = new BehaviorSubject<Cart>(initialCart);
    this.cart$ = this.cartSubject.asObservable();

    // Persist cart on changes
    this.cart$.subscribe(cart => {
      this.saveCartToLocalStorage(cart);
    });
  }

  private getEmptyCart(): Cart {
    return {
      items: [],
      totalItems: 0,
      subtotal: 0,
      tax: 0,
      grandTotal: 0
    };
  }

  private loadCartFromLocalStorage(): Cart | null {
    if (typeof localStorage !== 'undefined') {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        try {
          return JSON.parse(storedCart);
        } catch (e) {
          console.error('Error parsing cart from localStorage', e);
          localStorage.removeItem(CART_STORAGE_KEY); // Clear corrupted cart
          return null;
        }
      }
    }
    return null;
  }

  private saveCartToLocalStorage(cart: Cart): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }

  private calculateCart(items: CartItem[]): Cart {
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    const tax = subtotal * TAX_RATE;
    const grandTotal = subtotal + tax;
    return { items, totalItems, subtotal, tax, grandTotal };
  }

  addItem(product: Product, quantity: number = 1): void {
    const currentCart = this.cartSubject.getValue();
    const existingItemIndex = currentCart.items.findIndex(item => item.productId === product.id);

    let newItems: CartItem[];
    if (existingItemIndex > -1) {
      // Update quantity
      newItems = currentCart.items.map((item, index) =>
        index === existingItemIndex ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      // Add new item
      const newItem: CartItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        imageUrl: product.imageUrl
      };
      newItems = [...currentCart.items, newItem];
    }
    this.cartSubject.next(this.calculateCart(newItems));
  }

  updateItemQuantity(productId: string, newQuantity: number): void {
    if (newQuantity <= 0) {
      this.removeItem(productId);
      return;
    }
    const currentCart = this.cartSubject.getValue();
    const newItems = currentCart.items.map(item =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    this.cartSubject.next(this.calculateCart(newItems));
  }

  removeItem(productId: string): void {
    const currentCart = this.cartSubject.getValue();
    const newItems = currentCart.items.filter(item => item.productId !== productId);
    this.cartSubject.next(this.calculateCart(newItems));
  }

  clearCart(): void {
    this.cartSubject.next(this.getEmptyCart());
  }

  // Optional: Selectors for specific parts of the cart
  getCartItems(): Observable<CartItem[]> {
    return this.cart$.pipe(map(cart => cart.items));
  }

  getCartTotals(): Observable<{ subtotal: number, tax: number, grandTotal: number, totalItems: number }> {
    return this.cart$.pipe(map(cart => ({
      subtotal: cart.subtotal,
      tax: cart.tax,
      grandTotal: cart.grandTotal,
      totalItems: cart.totalItems
    })));
  }
}

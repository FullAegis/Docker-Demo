import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Product } from '../models/product.model';
import { CartItem, Cart } from '../models/cart.model';

// Mock localStorage
let store: { [key: string]: string } = {};
const mockLocalStorage = {
  getItem: (key: string): string | null => {
    return key in store ? store[key] : null;
  },
  setItem: (key: string, value: string) => {
    store[key] = value + '';
  },
  removeItem: (key: string) => {
    delete store[key];
  },
  clear: () => {
    store = {};
  }
};

describe('CartService', () => {
  let service: CartService;
  const product1: Product = { id: '1', name: 'Candy A', price: 10, categoryId: 'cat1', description: 'Desc A', imageUrl: 'imgA.jpg' };
  const product2: Product = { id: '2', name: 'Candy B', price: 5, categoryId: 'cat2', description: 'Desc B', imageUrl: 'imgB.jpg' };
  const TAX_RATE = 0.21; // Ensure this matches the service

  beforeEach(() => {
    TestBed.configureTestingModule({});

    // Reset store and spy on localStorage
    store = {}; // Clear mock localStorage for each test
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    // spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear); // Not used by service directly

    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have an empty cart initially if localStorage is empty', (done) => {
    service.cart$.subscribe(cart => {
      expect(cart.items.length).toBe(0);
      expect(cart.totalItems).toBe(0);
      expect(cart.subtotal).toBe(0);
      expect(cart.grandTotal).toBe(0);
      done();
    });
  });

  it('should add a new item to the cart', (done) => {
    service.addItem(product1);
    service.cart$.subscribe(cart => {
      if (cart.items.length > 0) { // Wait for addItem to process
        expect(cart.items.length).toBe(1);
        expect(cart.items[0].productId).toBe(product1.id);
        expect(cart.items[0].quantity).toBe(1);
        expect(cart.totalItems).toBe(1);
        expect(cart.subtotal).toBe(product1.price);
        const expectedTax = product1.price * TAX_RATE;
        expect(cart.tax).toBeCloseTo(expectedTax);
        expect(cart.grandTotal).toBeCloseTo(product1.price + expectedTax);
        done();
      }
    });
  });

  it('should increase quantity if existing item is added again', (done) => {
    service.addItem(product1); // First add
    service.addItem(product1); // Second add
    service.cart$.subscribe(cart => {
       // This subscription might fire multiple times. Check for the final state.
      if (cart.items.length === 1 && cart.items[0].quantity === 2) {
        expect(cart.items[0].productId).toBe(product1.id);
        expect(cart.totalItems).toBe(2);
        expect(cart.subtotal).toBe(product1.price * 2);
        const expectedTax = (product1.price * 2) * TAX_RATE;
        expect(cart.tax).toBeCloseTo(expectedTax);
        expect(cart.grandTotal).toBeCloseTo((product1.price * 2) + expectedTax);
        done();
      }
    });
  });

  it('should add multiple different items to the cart', (done) => {
    service.addItem(product1);
    service.addItem(product2);
    service.cart$.subscribe(cart => {
      if (cart.items.length === 2) {
        expect(cart.totalItems).toBe(2);
        const expectedSubtotal = product1.price + product2.price;
        expect(cart.subtotal).toBe(expectedSubtotal);
        const expectedTax = expectedSubtotal * TAX_RATE;
        expect(cart.tax).toBeCloseTo(expectedTax);
        expect(cart.grandTotal).toBeCloseTo(expectedSubtotal + expectedTax);
        done();
      }
    });
  });

  it('should update item quantity correctly', (done) => {
    service.addItem(product1);
    service.updateItemQuantity(product1.id, 3);
    service.cart$.subscribe(cart => {
      if (cart.items.length === 1 && cart.items[0].quantity === 3) {
        expect(cart.totalItems).toBe(3);
        expect(cart.subtotal).toBe(product1.price * 3);
        done();
      }
    });
  });

  it('should remove item if quantity updated to 0 or less', (done) => {
    service.addItem(product1);
    service.updateItemQuantity(product1.id, 0);
    service.cart$.subscribe(cart => {
      // This will fire when item is added, then when removed.
      // We are interested in the state where items array is empty.
      if (cart.items.length === 0 && cart.totalItems === 0) {
         expect(cart.subtotal).toBe(0);
         done();
      } else if (cart.items.length === 1 && cart.totalItems === 1 && cart.items[0].productId === product1.id) {
        // This is the intermediate state after adding product1, before quantity update to 0 is processed.
        // No specific expectation here, just acknowledging this state.
      } else if (cart.items.length > 0) {
        // Fail if it settles on a state with items but not the initial one
        // expect(true).toBe(false); // Force fail
      }
    });
  });

  it('should remove an item from the cart', (done) => {
    service.addItem(product1);
    service.addItem(product2);
    service.removeItem(product1.id);
    service.cart$.subscribe(cart => {
      if (cart.items.length === 1 && cart.items[0].productId === product2.id) {
        expect(cart.totalItems).toBe(1);
        expect(cart.subtotal).toBe(product2.price);
        done();
      }
    });
  });

  it('should clear the cart', (done) => {
    service.addItem(product1);
    service.addItem(product2);
    service.clearCart();
    service.cart$.subscribe(cart => {
      if (cart.items.length === 0 && cart.totalItems === 0) {
        expect(cart.subtotal).toBe(0);
        done();
      }
    });
  });

  it('should load cart from localStorage if available', (done) => {
    // Simulate a cart in localStorage
    const storedCartItems: CartItem[] = [{ productId: product2.id, name: product2.name, price: product2.price, quantity: 2, imageUrl: product2.imageUrl }];
    const taxForStored = (product2.price * 2) * TAX_RATE;
    const subtotalForStored = product2.price * 2;
    const storedCartState: Cart = {
        items: storedCartItems,
        totalItems: 2,
        subtotal: subtotalForStored,
        tax: taxForStored,
        grandTotal: subtotalForStored + taxForStored
    };
    mockLocalStorage.setItem('candyShopCart', JSON.stringify(storedCartState));

    // Create new service instance to trigger constructor loading
    const newService = new CartService();
    newService.cart$.subscribe(cart => {
      if (cart.items.length === 1 && cart.items[0].productId === product2.id) {
        expect(cart.totalItems).toBe(2);
        expect(cart.items[0].quantity).toBe(2);
        expect(cart.subtotal).toBe(subtotalForStored);
        expect(cart.tax).toBeCloseTo(taxForStored);
        expect(cart.grandTotal).toBeCloseTo(subtotalForStored + taxForStored);
        done();
      }
    });
  });

});

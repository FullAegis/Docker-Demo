export interface Product {
  id: string; // Or number, depending on API
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  categoryId: string; // Or number
  categoryName?: string; // For convenience, if API provides it
  brandId?: string; // Or number
  brandName?: string; // For convenience, if API provides it
  // Add other relevant product fields if known
}

export interface Category {
  id: string; // Or number
  name: string;
  // Add other relevant category fields if known
}

export interface Brand {
  id: string; // Or number
  name: string;
  // Add other relevant brand fields if known
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product, Category, Brand } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseApiProductPath = environment.apiBaseUrl + environment.apiPath;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    return throwError(() => new Error('Something bad happened with product data; please try again later.'));
  }

  // Fetch all products or filter by categoryId
  getProducts(categoryId?: string): Observable<Product[]> {
    let params = new HttpParams();
    if (categoryId) {
      params = params.set('categoryId', categoryId);
    }
    // Assuming endpoint is /api/Candies from Candy.API/Controllers/Products/CandiesController.cs
    return this.http.get<Product[]>(`${this.baseApiProductPath}/Candies`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  // Fetch a single product by its ID
  getProductById(id: string): Observable<Product> {
    // Assuming endpoint is /api/Candies/{id}
    return this.http.get<Product>(`${this.baseApiProductPath}/Candies/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Fetch all product categories
  getCategories(): Observable<Category[]> {
    // Assuming endpoint is /api/Categories from Candy.API/Controllers/Products/CategoriesController.cs
    return this.http.get<Category[]>(`${this.baseApiProductPath}/Categories`).pipe(
      catchError(this.handleError)
    );
  }

  // Fetch all product brands
  getBrands(): Observable<Brand[]> {
    // Assuming endpoint is /api/Brands from Candy.API/Controllers/Products/BrandsController.cs
    return this.http.get<Brand[]>(`${this.baseApiProductPath}/Brands`).pipe(
      catchError(this.handleError)
    );
  }
}

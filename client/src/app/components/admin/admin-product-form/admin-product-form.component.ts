import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminProductService } from '../../../services/admin/admin-product.service';
import { ProductService } from '../../../services/product.service'; // To get categories and brands
import { Product, Category, Brand } from '../../../models/product.model';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css']
})
export class AdminProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode: boolean = false;
  productId: string | null = null;
  isLoading: boolean = false;
  error: string | null = null;
  successMessage: string | null = null;

  categories$: Observable<Category[]> = of([]);
  brands$: Observable<Brand[]> = of([]);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private adminProductService: AdminProductService,
    private productService: ProductService // For categories/brands
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0.01)]],
      imageUrl: [''],
      categoryId: ['', Validators.required],
      brandId: [''] // Brand can be optional
    });
  }

  ngOnInit(): void {
    this.loadCategoriesAndBrands();
    this.productId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.productId;

    if (this.isEditMode && this.productId) {
      this.isLoading = true;
      this.productService.getProductById(this.productId).subscribe({
        next: (product) => {
          if (product) {
            this.productForm.patchValue(product);
          } else {
            this.error = `Product with ID ${this.productId} not found.`;
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.error = `Failed to load product: ${err.message}`;
          this.isLoading = false;
        }
      });
    }
  }

  loadCategoriesAndBrands(): void {
    this.categories$ = this.productService.getCategories().pipe(
      catchError(err => {
        this.error = 'Failed to load categories. Please try again. ' + err.message;
        return of([]);
      })
    );
    this.brands$ = this.productService.getBrands().pipe(
      catchError(err => {
        this.error = (this.error || '') + 'Failed to load brands. Please try again. ' + err.message;
        return of([]);
      })
    );
  }

  get formControls() { return this.productForm.controls; }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.error = "Please correct the form errors.";
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.successMessage = null;
    const productData = this.productForm.value;

    let operation: Observable<Product | null | void>;

    if (this.isEditMode && this.productId) {
      operation = this.adminProductService.updateProduct(this.productId, productData);
    } else {
      // For create, ensure no 'id' field is sent if backend auto-generates
      const { id, ...createData } = productData;
      operation = this.adminProductService.createProduct(createData as Omit<Product, 'id'>);
    }

    operation.subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = `Product ${this.isEditMode ? 'updated' : 'created'} successfully!`;
        // Wait a bit for user to see message, then navigate
        setTimeout(() => {
            this.router.navigate(['/admin/products']);
        }, 1500);
      },
      error: (err) => {
        this.isLoading = false;
        this.error = `Failed to ${this.isEditMode ? 'update' : 'create'} product: ${err.message}`;
      }
    });
  }
}

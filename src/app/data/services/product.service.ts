import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  createProduct(title: string, price: number): Observable<Object> {
    return this.http.post(`https://localhost:7131/api/products/`, {title, price});
  }

  getProduct (id: number): Observable<Product> {
    return this.http.get<Product>(`https://localhost:7131/api/products/${id}`);
  }

  getAllProducts (): Observable<Product[]> {
    return this.http.get<Product[]>("https://localhost:7131/api/products");
  }

  deleteProduct (id: number): Observable<Product> {
    return this.http.delete<Product>(`https://localhost:7131/api/products/${id}`);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`https://localhost:7131/api/products/${product.id}`, product);
  }

  filterProducts(title?: string, minPrice?: number, maxPrice?: number): Observable<Product[]> {
    let params = new HttpParams()
    if(title) params = params.set('title', title);
    if(minPrice) params = params.set('minPrice', minPrice);
    if(maxPrice) params = params.set('maxPrice', maxPrice);
    return this.http.get<Product[]>(`https://localhost:7131/api/products/search`, {params})
  }
}

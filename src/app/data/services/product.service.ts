import { HttpClient } from '@angular/common/http';
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
}

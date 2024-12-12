import { Component } from '@angular/core';
import { Product } from '../../../../data/interfaces/product.interface';
import { ProductService } from '../../../../data/services/product.service';

@Component({
  selector: 'app-product-index-page',
  standalone: true,
  imports: [],
  templateUrl: './product-index-page.component.html',
  styleUrl: './product-index-page.component.css'
})
export class ProductIndexPageComponent {
  products : Product[] = [];

  constructor(private productService: ProductService) {
    this.productService.getAllProducts().subscribe({next:(data:any) => this.products=data});
  }
}

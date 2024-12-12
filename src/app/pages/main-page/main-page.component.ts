import { Component } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { Product } from '../../data/interfaces/product.interface';
import { ProductService } from '../../data/services/product.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  products : Product[] = [];

  constructor(private productService: ProductService) {
    this.productService.getAllProducts().subscribe({next:(data:any) => this.products=data});
  }
}

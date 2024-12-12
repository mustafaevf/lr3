import { Component, Input } from '@angular/core';
import { Product } from '../../data/interfaces/product.interface';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product?: Product;
}

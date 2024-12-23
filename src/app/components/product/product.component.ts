import { Component, Input } from '@angular/core';
import { Product } from '../../data/interfaces/product.interface';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input() product?: Product;
}

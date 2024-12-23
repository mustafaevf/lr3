import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ProductComponent } from '../../../../components/product/product.component';
import { Product } from '../../../../data/interfaces/product.interface';
import { ProductService } from '../../../../data/services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-index-page',
  standalone: true,
  imports: [MatTableModule, MatSortModule, MatIconModule],
  templateUrl: './product-index-page.component.html',
  styleUrl: './product-index-page.component.css'
})
export class ProductIndexPageComponent {
  products : Product[] = [];
  displayedColumns: string[] = ['id', 'title', 'price', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);
  
  @ViewChild(MatSort) sort!: MatSort;
  
  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({next: (data: any) => {
      console.log(data)
    }});
  }

  constructor(private productService: ProductService) {
    this.productService.getAllProducts().subscribe({next:(data:any) => {this.products=data, this.dataSource.data = data}});
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}

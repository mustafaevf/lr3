import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { Product } from '../../data/interfaces/product.interface';
import { ProductService } from '../../data/services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    ProductComponent,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent implements AfterViewInit {
  products: Product[] = [];
  viewType: number = 1;
  displayedColumns: string[] = ['id', 'title', 'price', 'addToCart'];
  minPrice?: number;
  maxPrice?: number;
  title?: string;
  dataSource = new MatTableDataSource<Product>([]);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService) {}

  update() {
    this.productService
      .filterProducts(this.title, this.minPrice, this.maxPrice)
      .subscribe({
        next: (data: Product[]) => {
          this.products = data;
          this.dataSource.data = data;
          console.log(data);
        },
      });
  }

  ngOnInit() {
    // this.productService.filterProducts(undefined, undefined, undefined).subscribe({
    //   next: (data: Product[]) => {
    //     this.products = data;
    //     this.dataSource.data = data;
    //     console.log(data);
    //   },
    // });
    this.update();
  }

  switchView(type: number) {
    this.viewType = type;
    if (type === 1) {
      this.dataSource.sort = this.sort;
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}

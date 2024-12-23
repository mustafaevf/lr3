import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../data/services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../../data/interfaces/product.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-edit-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './product-edit-page.component.html',
  styleUrl: './product-edit-page.component.css'
})
export class ProductEditPageComponent {
  editProductForm: FormGroup;
  productId: string | null;

  onSubmit() {
    if(this.editProductForm.invalid) {
      console.log(this.editProductForm);
      return;
    }
    const updatedProduct: Product = {
      id: Number(this.productId),
      title: this.editProductForm.controls['title'].value,
      price: this.editProductForm.controls['price'].value,
    };
    this.productService.updateProduct(updatedProduct).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['admin/products']);
      },
      error: (err) => {
        console.error('Ошибка создания: ', err);
      },
    });
  }

  constructor(private route: ActivatedRoute, private productService: ProductService, private fb: FormBuilder, private router: Router) {
    this.editProductForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
    });
  
    this.productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(Number(this.productId)).subscribe({
      next: (product) => {
        this.editProductForm.setValue({
          title: product.title,
          price: product.price,
        });
      },
      error: (err) => console.error('Ошибка загрузки продукта: ', err),
    });
    
  }
}

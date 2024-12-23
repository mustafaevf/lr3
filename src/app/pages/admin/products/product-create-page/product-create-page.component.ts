import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../data/services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-create-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './product-create-page.component.html',
  styleUrl: './product-create-page.component.css'
})
export class ProductCreatePageComponent {
  createProductForm: FormGroup;

  onSubmit() {
    if(this.createProductForm.invalid) {
      console.log(this.createProductForm);
      return;
    }
    this.productService.createProduct(this.createProductForm.controls['title'].value, this.createProductForm.controls['price'].value).subscribe({
      next: (response) => {
        console.log(response);
        // const token = response.token;
        // if (token) {
        //   this.authService.setToken(token);
        // }
        // console.log('Успешный вход:', response);
      },
      error: (err) => {
        console.error('Ошибка создания: ', err);
      },
    });
  }

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.createProductForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      price: ['', [Validators.required]]
    });
  }
}

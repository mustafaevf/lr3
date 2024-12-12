import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../../data/services/product.service';

@Component({
  selector: 'app-product-create-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-create-page.component.html',
  styleUrl: './product-create-page.component.css'
})
export class ProductCreatePageComponent {
  form: any = {
    title: '',
    price: ''
  };

  onSubmit() {
    // console.log(this.form);
    this.productService.createProduct(this.form.title, this.form.price).subscribe({
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

  constructor(private productService: ProductService) {}
}

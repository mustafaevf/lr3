import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../data/interfaces/product.interface';
import { ProductService } from '../../data/services/product.service';
import { ProductComponent } from '../../components/product/product.component';
import { CartitemService } from '../../data/services/cartitem.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../data/services/auth.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [ProductComponent, FormsModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent {
  quantity: number = 1;
  product: Product = {} as Product;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartItemsService: CartitemService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(Number(productId)).subscribe({
      next: (response) => {
        this.product = response;
        console.log(response);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  addItemToCartItems() {
    this.cartItemsService
      .addItemToCart(this.product.id, this.quantity)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigateByUrl(`/cart/${this.authService.user.id}`);
        },
      });
  }
}

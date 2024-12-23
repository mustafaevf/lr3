import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartitemService } from '../../data/services/cartitem.service';
import { CartItem } from '../../data/interfaces/cartItem.interface';
import { CartitemsComponent } from '../../components/cartitems/cartitems.component';
import { response } from 'express';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CartitemsComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  cartItems: CartItem[] = [];
  totalPrice = 0;
  constructor(private route: ActivatedRoute, private cartItemsService: CartitemService) {}
  
  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    this.cartItemsService.getCartItemsByUser(Number(userId)).subscribe({
      next: (response) => {
        this.cartItems = response;
        console.log(response);
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.cartItemsService.getUserCartTotalPrice(Number(userId)).subscribe({next: (response) => {this.totalPrice = response.totalPrice, console.log(response.totalPrice)}});
  }
}
 
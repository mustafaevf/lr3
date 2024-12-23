import { Component, Input } from '@angular/core';
import { CartItem } from '../../data/interfaces/cartItem.interface';
import { CartitemService } from '../../data/services/cartitem.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { Product } from '../../data/interfaces/product.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-cartitems',
  standalone: true,
  imports: [NgClass],
  templateUrl: './cartitems.component.html',
  styleUrl: './cartitems.component.css',
})
export class CartitemsComponent {
  @Input() cartItems?: CartItem;

  constructor(
    private cartItemsService: CartitemService,
    private router: Router
  ) {}

  parseDate() {
    let t: string = this.cartItems?.createdAt.split('.')[0] || ""
    return t.split('-')[2].split('T')[0] + "." + t.split('-')[1] + "." + t.split('-')[0] + " " + t.split('T')[1]
    // return Date.parse(this.cartItems?.createdAt || "");
  }

  deleteCartItems(cartItemId: number) {
    this.cartItemsService.deleteCartItems(cartItemId).subscribe({
      next: (response) => {
        location.reload();
        console.log(response);
      },
    });
  }
  updateStausCartItem() {
    let pr: Product = {
      id: 0,
      title: '',
      price: 0,
    };
    let currentCart: CartItem = {
      id: this.cartItems?.id || 0,
      userId: this.cartItems?.userId || 0,
      status: this.cartItems?.status || 0,
      count: this.cartItems?.count || 0,
      createdAt: this.cartItems?.createdAt || '',
      product: this.cartItems?.product || pr,
    };
    currentCart.status = 2;
    this.cartItemsService.changeStatusForCart(currentCart).subscribe({
      next: (response) => {
        console.log(response)
        location.reload();
      },
    });
  }
  // updateStatusCartItems(cartItemId: numbeer) {
  //   this.cartItemsService.deleteCartItems(cartItemId).subscribe({
  //     next: (response) => {
  //       location.reload();
  //       console.log(response);
  //     },
  //   });
  // }
}

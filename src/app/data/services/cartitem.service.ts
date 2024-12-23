import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../interfaces/cartItem.interface';

@Injectable({
  providedIn: 'root'
})
export class CartitemService {

  getCartItems (): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`https://localhost:7131/api/cartitems/`);
  }

  getCartItemsByUser (userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`https://localhost:7131/api/cartitems/${userId}`);
  }

  addItemToCart (productId: number, count: number) {
    return this.http.post<CartItem>(`https://localhost:7131/api/cartitems`, {productId, count});
  }
  
  getUserCartTotalPrice(userId: number): Observable<any> {
    return this.http.get<CartItem[]>(`https://localhost:7131/api/cartitems/total-price/${userId}`);
  }

  changeStatusForCart(cartItem: CartItem) {
    return this.http.put<CartItem>(`https://localhost:7131/api/cartitems/${cartItem.id}`, cartItem);
  }

  deleteCartItems(cartItemId: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7131/api/cartitems/${cartItemId}`);
  }

  constructor(private http: HttpClient) { }
}

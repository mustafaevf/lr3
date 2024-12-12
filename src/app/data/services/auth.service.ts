import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  verify(): Observable<any> {
    return this.http.get('https://localhost:7131/api/auth/verify');
  }

  logout() {
    localStorage.removeItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  
  login(login: any, password: any): Observable<any> {
    return this.http.post('https://localhost:7131/api/auth/login', {login, password});
  }

  register(data: any): Observable<any> {
    return this.http.post('https://localhost:7131/api/auth/register', data);
  }

  constructor(private http: HttpClient) { }
}

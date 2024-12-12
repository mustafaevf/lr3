import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  canActivate(): Observable<boolean> {
    return this.authService.verify().pipe(
      map(user => {
        if (user?.role === 'admin') {
          return true;
        }
        this.router.navigate(['/']);
        return false;
      }),
      catchError(() => {
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }
  
  constructor(private authService: AuthService, private router: Router) { }
}

import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const requiredRole = next.data['role'];

    return this.authService.verify().pipe(
      map((user) => {
        if (!user) {
          this.router.navigate(['/login']);
          return false;
        }

        if (requiredRole && user.role !== requiredRole) {
          this.router.navigate(['/']);
          return false;
        }

        return true;
      })
    );
  }
}

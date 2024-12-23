import { Component } from '@angular/core';
import { AuthService } from '../../data/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isAuth = false;
  user = {
    id: 0,
    login: '',
    role: '',
  };

  logout() {
    this.authService.logout();
    // this.authService.isAuth = false;
    this.isAuth = this.authService.isAuth;
    this.router.navigateByUrl('/');
  }

  constructor(private authService: AuthService, private router: Router) {
    this.authService.verify().subscribe({
      next: (response) => {
        this.authService.isAuth = true;
        this.authService.user = response;
        this.authService.user.id = Number(response.id);
        this.isAuth = this.authService.isAuth;
        this.user = this.authService.user;
        return this.authService.user;
      },
      error: (err) => {
        this.authService.isAuth = false;
        this.authService.user = { id: 0, login: '', role: '' };
        this.isAuth = this.authService.isAuth;
        this.user = this.authService.user;
        console.error('Ошибка verify:', err);
      },
    });
  }
  

  ngOnInit(): void {
  }
}

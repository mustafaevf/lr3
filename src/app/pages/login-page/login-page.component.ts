import { Component } from '@angular/core';
import { AuthService } from '../../data/services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, HeaderComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  form: any = {
    login: '',
    password: ''
  };

  onSubmit() {
    this.authService.login(this.form.login, this.form.password).subscribe({
      next: (response) => {
        const token = response.token;
        if (token) {
          this.authService.setToken(token);
          this.router.navigate(['/']);
        }
        console.log('Успешный вход:', response);
      },
      error: (err) => {
        console.error('Ошибка авторизации:', err);
      },
    });
  }

  constructor(private router: Router, private authService: AuthService) {}
}

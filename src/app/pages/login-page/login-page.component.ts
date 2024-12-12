import { Component } from '@angular/core';
import { AuthService } from '../../data/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  form: any = {
    login: '',
    password: ''
  };

  onSubmit() {
    // console.log(this.form);
    this.authService.login(this.form.login, this.form.password).subscribe({
      next: (response) => {
        const token = response.token;
        if (token) {
          this.authService.setToken(token);
        }
        console.log('Успешный вход:', response);
      },
      error: (err) => {
        console.error('Ошибка авторизации:', err);
      },
    });
  }

  constructor(private authService: AuthService) {}
}

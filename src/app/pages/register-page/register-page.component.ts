import { Component } from '@angular/core';
import { AuthService } from '../../data/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  form: any = {
    first_name: '',
    last_name: '',
    login: '',
    email: '', 
    password: ''
  };

  onSubmit() {
    this.authService.register(this.form).subscribe({
      next: (response) => {
        console.log(response);
        // const token = response.token;
        // if (token) {
        //   this.authService.setToken(token);
        // }
        // console.log('Успешный вход:', response);
      },
      error: (err) => {
        console.error('Ошибка регистрации:', err);
      },
    });
  }

  constructor(private authService: AuthService) {}
}

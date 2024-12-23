import { Component } from '@angular/core';
import { AuthService } from '../../data/services/auth.service';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  registerForm: FormGroup;

  onSubmit() {
    if(this.registerForm.invalid) {
      console.log(this.registerForm);
      return;
    }
    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log(response);
        const token = response.token;
        console.log('Успешный вход:', response);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Ошибка регистрации:', err);
      },
    });
  }

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      login: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}

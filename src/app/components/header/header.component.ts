import { Component } from '@angular/core';
import { AuthService } from '../../data/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  isAuth = false;
  user = {
    login: '',
    role: '',
  };

  constructor(private authService: AuthService) {};

  ngOnInit():void {
    this.authService.verify().subscribe({
      next: (response) => {
        console.log(response) 
        this.isAuth = true;
        this.user = response;
        return this.user;
      },
      error: (err) => {
        this.isAuth = false;
        this.user = {login: '', role: ''};
        console.error('Ошибка verify:', err);
      },
    });
  };
}

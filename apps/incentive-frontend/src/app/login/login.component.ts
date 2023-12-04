import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@tinf21/incentive-http-client';
import { HttpClient } from 'libs/incentive-frontend/http-client/src/lib/http-client.service';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'libs/incentive-frontend/http-client/src/lib/auth.service';
import { Router, RouterModule } from '@angular/router';

type LoginDto = {
  access_token: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatFormFieldModule, 
    FormsModule, 
    MatInputModule, 
    MatButtonModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.auth.getAccessToken()) {
      this.router.navigate(['/']);
    }
  }

  loginData: { name?: string, password?: string } = {};

  async login() {
    console.log('Login', this.loginData);

    const response = await firstValueFrom(this.http.post<LoginDto>('/auth/login', this.loginData))
    this.auth.setAccessToken(response.access_token);

    this.loginData = {}

    this.router.navigate(['home']);
  }
}

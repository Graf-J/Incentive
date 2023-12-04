import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from 'libs/incentive-frontend/http-client/src/lib/http-client.service';
import { AuthService } from 'libs/incentive-frontend/http-client/src/lib/auth.service';
import { firstValueFrom } from 'rxjs';
import { HttpClientModule } from '@tinf21/incentive-http-client';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatFormFieldModule, 
    FormsModule, 
    MatInputModule, 
    MatButtonModule,
    HttpClientModule,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }

  registerData: { name?: string, password?: string } = {};

  async register() {
    const response = await firstValueFrom<any>(this.http.post('/auth/register', this.registerData))

    this.router.navigate(['/login']);

    this.registerData = {}
  }
}

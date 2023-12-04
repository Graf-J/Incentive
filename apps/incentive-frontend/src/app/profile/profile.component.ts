import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'libs/incentive-frontend/http-client/src/lib/auth.service';
import { HttpClient } from 'libs/incentive-frontend/http-client/src/lib/http-client.service';
import { firstValueFrom } from 'rxjs';
import { HttpClientModule } from '@tinf21/incentive-http-client';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  users?: any | null = null;

  constructor(private auth: AuthService, private router: Router, private http: HttpClient) {}

  async ngOnInit() {
    if (!this.auth.getAccessToken()) {
      this.router.navigate(['login']);
    }

    this.users = await firstValueFrom(this.http.get('/user'))
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'libs/incentive-frontend/http-client/src/lib/auth.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@tinf21/incentive-http-client';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (!this.auth.getAccessToken()) {
      this.router.navigate(['login']);
    }
  }

  logout() {
    this.auth.removeAccessToken();
    this.router.navigate(['login']);
  }
}

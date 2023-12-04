import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'libs/incentive-frontend/http-client/src/lib/auth.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from 'libs/incentive-frontend/http-client/src/lib/http-client.service';
import { firstValueFrom } from 'rxjs';
import { HttpClientModule } from '@tinf21/incentive-http-client';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  transactions?: any | null = null;

  constructor(private auth: AuthService, private router: Router, private http: HttpClient) {}

  async ngOnInit() {
    if (!this.auth.getAccessToken()) {
      this.router.navigate(['login']);
    }

    this.transactions = await firstValueFrom(this.http.get('/transaction'))
  }
}

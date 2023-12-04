import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TransactionComponent } from './transaction/transaction.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';


export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'transaction', component: TransactionComponent },
];

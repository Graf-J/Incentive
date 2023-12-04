import { NgModule } from "@angular/core";
import { HttpClientModule as BaseModule } from '@angular/common/http';
import { HttpClient } from './http-client.service';
import { AuthService } from "./auth.service";

@NgModule({
    imports: [BaseModule],
    providers: [HttpClient, AuthService],
})
export class HttpClientModule {}
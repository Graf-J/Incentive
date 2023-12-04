import { HttpClient as BaseHttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class HttpClient {
    private baseUrl = 'http://localhost:3000';

    constructor(private baseClient: BaseHttpClient, private auth: AuthService) {}

    public setBaseUrl(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private getUrl(url: string) {
        return this.baseUrl + url;
    }

    private getAuthHeader(): any {
        const accessToken = this.auth.getAccessToken();
        if (accessToken) {
            return {
                Authorization: `Bearer ${accessToken}`
            };
        }
        return { };
    }

    get(url: string, options: Parameters<BaseHttpClient['get']>[1] = {}) {
        return this.baseClient.get(this.getUrl(url), {
            ...options,
            headers: { ...this.getAuthHeader(), ...(options.headers || {}) }
        });
    }

    post<Data extends Object>(url: string, body: unknown, options: Parameters<BaseHttpClient['post']>[2] = {}) {
        return this.baseClient.post<Data>(this.getUrl(url), body, {
            responseType: 'json',
            headers: {
                'Content-Type': 'application/json',
                ...this.getAuthHeader(),
                ...options.headers,
            },
            ...options,
        });
    }
}
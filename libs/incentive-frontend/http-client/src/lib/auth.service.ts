export class AuthService {
    setAccessToken(token: string) {
        localStorage.setItem('access_token', token);
    }

    getAccessToken() {
        return localStorage.getItem('access_token');
    }

    removeAccessToken() {
        localStorage.removeItem('access_token');
    }
}
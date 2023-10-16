import { Controller, Post } from '@nestjs/common';

@Controller('auth/login')
export class LoginController {
    @Post()
    login() {
        return 'login';
    }
}

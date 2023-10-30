import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Controller('auth/login')
export class LoginController {
    constructor(private readonly authServie: AuthService) { }

    @Post()
    @HttpCode(200)
    async login(@Body() requestBody: { name: string; password: string }) {
        return await this.authServie.getUsrAuthObject(
            requestBody.name,
            requestBody.password
        )
    }
}

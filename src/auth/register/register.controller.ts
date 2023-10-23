import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth/register')
export class RegisterController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }
}

import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth/register')
export class RegisterController {
    constructor(private readonly userService: UserService) { }

    @Post()
    register(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }
}

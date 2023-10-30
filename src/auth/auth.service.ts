import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async getUsrAuthObject(name: string, pass: string) {
        const user = await this.userService.findOneByName(name);

        if (user?.password !== pass) {
          throw new UnauthorizedException();
        }

        // This line filters password from the result (remove password from result)
        // const { password, ...result } = user.toJSON();

        // return result;

        const payload = { sub: user._id, username: user.name }
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}

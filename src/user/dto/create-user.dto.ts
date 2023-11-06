import { Role } from "../roles.enum";

export class CreateUserDto {
    name: string;
    password: string;
    roles: Role[];
}

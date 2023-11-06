import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles.decorator";
import { Role } from "./roles.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext) {
        // Reflector reads Metadata from Roles-Decorator
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ])
        // If developer does not put any roles in the @Roles Decorator the route can be accessed by anyone
        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const userRoles = request.userRoles;
        console.log(userRoles)
        console.log(requiredRoles)
        return requiredRoles.some((role) => userRoles?.includes(role));
    }
}
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Role } from "./roles.enum";

@Injectable()
export class OwnRouteOrAdminGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const userId = request.userId;
        const userRoles = request.userRoles;
        
        return request.params.id === userId || userRoles.includes(Role.administrator)
    }
}
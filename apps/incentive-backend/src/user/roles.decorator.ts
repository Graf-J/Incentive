import { SetMetadata } from '@nestjs/common';
import { Role } from './roles.enum';

export const ROLES_KEY = 'roles';

export function Roles(roles: Role[]) {
  return SetMetadata('roles', roles);
}

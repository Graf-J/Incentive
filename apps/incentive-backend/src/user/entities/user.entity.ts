import { Role } from '../roles.enum';

export class User {
  name: string;
  password: string;
  recivedeCredits: number;
  creditsToSend: number;
  roles: Role[];
}

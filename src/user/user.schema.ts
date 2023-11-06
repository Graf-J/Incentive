import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from './roles.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;
  
  @Prop()
  password: string;

  @Prop()
  receivedCredits: number;

  @Prop()
  creditsToSend: number;

  @Prop({ type: [String], enum: Role, default: [Role.user] })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
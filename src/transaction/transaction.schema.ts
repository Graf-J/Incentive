import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { User } from 'src/user/user.schema';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema()
export class Transaction {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    sender: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    receiver: User;

    @Prop()
    credits: number;

    @Prop()
    createdAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction)
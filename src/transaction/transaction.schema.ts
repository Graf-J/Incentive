import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../user/user.schema';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema()
export class Transaction {
    // Put Index for each Prop I want to search for (speed for big amounts of data)
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true })
    sender: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    receiver: User;

    @Prop()
    credits: number;

    @Prop()
    createdAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction)
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './transaction.schema';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>,
    private readonly userService: UserService
  ) { }

  async create(createTransactionDto: CreateTransactionDto) {
    const sender = await this.userService.findOne(createTransactionDto.sender);
    if (!sender) {
      throw new ConflictException("Sender doesn't exist");
    }

    const receiver = await this.userService.findOne(createTransactionDto.receiver);
    if (!receiver) {
      throw new ConflictException("Receiver doesn't exist");
    }

    if (sender.creditsToSend < createTransactionDto.credits) {
      throw new ConflictException('Sender has not enough credits to send');
    }

    const transaction = new this.transactionModel({
      sender,
      receiver,
      credits: createTransactionDto.credits,
      createdAt: new Date(),
    });
    sender.creditsToSend -= createTransactionDto.credits;
    receiver.receivedCredits += createTransactionDto.credits;

    await Promise.all([sender.save(), receiver.save(), transaction.save()]);
  }

  async findAll() {
    return await this.transactionModel.find();
  }

  async findOne(id: string) {
    return await this.transactionModel.findById(id)
      // .populate('sender')
      // .populate('receiver')
  }
}

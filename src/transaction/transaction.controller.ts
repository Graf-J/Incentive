import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    return await this.transactionService.create(createTransactionDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() r) {
    console.log(r.userId);
    return await this.transactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }
}
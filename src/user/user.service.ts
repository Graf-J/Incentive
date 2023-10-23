import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto) {
    // Reihenfolge wichtig (...Operator überschreibt wenn er dannach kommt)
    const user = new this.userModel({
      ...createUserDto,
      receivedCredits: 0,
      creditsToSend: 10
    } as User);
    await user.save();
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // const user = await this.findOne(id);
    // Object.assign(user, {
    //   name: updateUserDto.name,
    //   password: updateUserDto.password,
    // });
    // await user.save();

    this.userModel.updateOne(
      { _id: id },
      {
        $set: {
          name: updateUserDto.name,
          password: updateUserDto.password
        }
      }
    )
  }

  async remove(id: string) {
    await this.userModel.deleteOne({ _id: id })
  }
}

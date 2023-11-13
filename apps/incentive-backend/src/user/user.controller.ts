import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './roles.enum';
import { Roles } from './roles.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from './roles.guard';
import { OwnRouteOrAdminGuard } from './ownRouteOrAdmin.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles([Role.administrator])
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @UseGuards(OwnRouteOrAdminGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @UseGuards(OwnRouteOrAdminGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Roles([Role.administrator])
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}

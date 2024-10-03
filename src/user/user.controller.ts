import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() userData: Partial<User>): Promise<User> {
      return this.userService.create(userData);
    }
  
    @Get()
    findAll(): Promise<User[]> {
      return this.userService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: number): Promise<User> {
      return this.userService.findOne(id);
    }
  
    @Put(':id')
    update(@Param('id') id: number, @Body() userData: Partial<User>): Promise<User> {
      return this.userService.update(id, userData);
    }
  
    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
      return this.userService.remove(id);
    }
}

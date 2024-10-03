import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Create a new user
  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  // Find all users
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Find one user by id
  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  // Update user by id
  async update(id: number, userData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, userData);
    return this.userRepository.findOneBy({ id });
  }

  // Remove user by id
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}

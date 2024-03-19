import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import { CustomLoggerService } from 'src/custom-logger/custom-logger.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject('CUSTOM_LOGGER') private customLogger: CustomLoggerService,
  ) {}

  async createUser(userData: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(userData);
    this.customLogger.log('newUser');
    return this.usersRepository.save(newUser);
  }

  async findAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async updateUsers(
    name: string,
    updateUserDto: UpdateUserDto,
  ): Promise<CreateUserDto> {
    console.log(updateUserDto);
    const user = await this.usersRepository.findOneBy({ name });
    if (!user) throw new Error('User not found');

    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }
}

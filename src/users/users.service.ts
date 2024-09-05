import { Injectable } from '@nestjs/common';
import { User, Users } from './user';

@Injectable()
export class UsersService {
  private readonly users: Users = [
    {
      id: 1,
      username: 'john',
      email: 'john@mail.com',
      password: 'changeme',
    },
    {
      id: 2,
      username: 'maria',
      email: 'maria@mail.com',
      password: 'guess',
    },
  ];

  async findOneByUsernameOrEmail(value: string): Promise<User | undefined> {
    return this.users.find(
      (user: User) => user.username === value || user.email === value,
    );
  }
}

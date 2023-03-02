import { User } from 'src/interfaces/users';

export abstract class UsersRepository {
  abstract getUser(email: string): Promise<User>;
  abstract createUser(user: User): Promise<User>;
  abstract deleteUser(id: string): Promise<any>;
  abstract updateUser(user: User): Promise<User>;
}

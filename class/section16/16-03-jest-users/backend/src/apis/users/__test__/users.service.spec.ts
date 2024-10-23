import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../user.service';

import { ConflictException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

// 임시 db 만들기
class MockUsersRepository {
  mydb = [
    { email: 'a@a.com', password: '0000', name: '짱구', age: 8 },
    { email: 'q@q.com', password: '1234', name: '철수', age: 12 },
  ];

  findOne({ where }) {
    const users = this.mydb.filter((el) => el.email === where.email);
    if (users.length) return users[0];
    return null;
  }

  save({ email, password, name, age }) {
    this.mydb.push({ email, password, name, age });
    return { email, password, name, age };
  }
}

describe('UsersService', () => {
  let userService: UsersService;
  beforeEach(async () => {
    const userModule: TestingModule = await Test.createTestingModule({
      // imports: [
      //   TypeOrmModule.forFeature([
      //     User, //
      //   ]),
      // ],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUsersRepository,
        },
      ],
    }).compile();
    userService = userModule.get<UsersService>(UsersService);
  });

  // describe('findOneByEmail', () => {
  //   const result = userService.findOneByEmail({ email: 'a@a.com' });
  //   expect(result).toStrictEqual({
  //     email: 'a@a.com',
  //   });
  // });

  describe('create', () => {
    it('email secure', async () => {
      const myData = {
        email: 'a@a.com',
        password: '1234',
        name: 'kim',
        age: 13,
      };
      try {
        await userService.create({
          ...myData,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });

    it('회원 검증', async () => {
      const myData = {
        email: 'b@b.com',
        password: '1234',
        name: 'kim',
        age: 13,
      };
      const result = await userService.create({ ...myData });
      const { password, ...rest } = result;
      expect(rest).toStrictEqual({
        email: 'b@b.com',
        name: 'kim',
        age: 13,
      });
    });
  });
});

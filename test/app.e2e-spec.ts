import { INestApplication } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as jwt from 'jsonwebtoken';
import * as request from 'supertest';
import { AuthController } from '../src/auth/auth.controller';
import { PrismaService } from '../src/database/prisma.service';
import { PrismaUsersRepository } from '../src/repositories/users/prisma.users.repository';
import { UsersRepository } from '../src/repositories/users/users.repository';

const SECRET = 'c5bf2d9a24e9d5277e0dc8268ff91f506bc5bc71';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: SECRET,
          signOptions: { expiresIn: '900s' },
        }),
      ],
      controllers: [AuthController],
      providers: [
        PrismaService,
        {
          provide: UsersRepository,
          useClass: PrismaUsersRepository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth')
      .send({ email: 'gerente@gmail.com', password: '123456' });

    const decodedToken = jwt.decode(res.body.token) as {
      user: string;
      company: string;
      iat: number;
      exp: number;
    };
    expect(decodedToken).toBeDefined();
    expect(decodedToken.user).toEqual('ce7965f2-1edf-4d60-8fde-790208c36e50');
    expect(decodedToken.company).toEqual('0');
  });
});

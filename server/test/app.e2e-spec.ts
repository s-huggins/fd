import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from 'src/app.controller';
import * as request from 'supertest';

describe('App spins up', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      controllers: [AppController]
    }).compile();

    app = testModule.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async () => {
    await request(app.getHttpServer()).get('/').expect(200).expect('up');
  });
});

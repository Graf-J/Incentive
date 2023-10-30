import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  })

  beforeEach(async () => {
    // TODO: Prepare database

    const result = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ name: 'Marcus', password: 'test4321'})
      .expect(200)

    accessToken = result.body.access_token
  })

  it('has a valid access token', () => {
    expect(accessToken.substring(0, 2)).toEqual('ey');
  })

  it('GET /transaction (GET) returns 401 if no accessToken is used', async () => {
    await request(app.getHttpServer()).get('/transaction').expect(401);
  })

  it('GET /transaction returns 200 with expected transactions', async () => {
    console.log(accessToken);

    const transactionResult = await request(app.getHttpServer())
      .get('/transaction')
      .set({
        Authorization: `Bearer ${accessToken}`
      })
      .expect(200);

    // expect(transactionResult.body.length).toEqual(1);
  })
});

import request from 'supertest';
import { Connection } from 'typeorm';
import app from '../../src/app';
import { Users } from '../../src/db/entities';
import { newUser } from '../data/new';
import mockConnection from '../mockDB/mockConnection';

let firstUser: Users;
let connection: Connection;

beforeAll(async () => {
  connection = await mockConnection.create();
});

it('POST /users/signup', async () => {
  const res = await request(app).post('/users/signup').send(newUser);
  expect(res.statusCode).toBe(201);
  expect(res.body.name).toBe(newUser.name);
  expect(res.body.gender).toBe('남자');
});

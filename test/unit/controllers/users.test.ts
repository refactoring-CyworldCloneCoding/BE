import UsersController from '../../../src/api/controllers/users';
import { Users } from '../../../src/db/entities';
import httpMock from 'node-mocks-http';
import { newUser } from '../../data/new';

let req, res, next;
beforeEach(() => {
  req = httpMock.createRequest();
  res = httpMock.createResponse();
  next = jest.fn();
});

describe('Users Controller Signup', () => {
  beforeEach(() => {
    req.body = newUser;
  });

  it('should have a saveUser function', () => {
    expect(typeof UsersController.signup).toBe('function');
  });

  // it('should return 201 response code', async () => {
  //   await UsersController.signup(req, res, next);
  //   expect(res.statusCode).toBe(201);
  //   expect(res._isEndCalled()).toBeTruthy();
  // });

  // it('should handle errors password discrepancy', async () => {
  //   req.body.password = '132123123';
  //   await UsersController.signup(req, res, next);
  //   expect(res.statusCode).toBe(400);
  // });
});

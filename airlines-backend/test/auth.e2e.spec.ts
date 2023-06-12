import { request } from './lib';
import { StatusCodes } from 'http-status-codes';
import { authRoutes, usersRoutes } from './endpoints';
import { validate } from 'uuid';

const createUserDto = {
  email: 'randomEmail@test.com',
  password: 'test-password',
  firstName: 'John',
  lastName: 'Dou',
  dateOfBirth: new Date().toISOString(),
  gender: 'male',
  countryCode: '19',
  phoneNumber: 1234567891,
  citizenship: 'USA',
};

describe('Airport (e2e)', () => {
  const unauthorizedRequest = request;
  const commonHeaders = { Accept: 'application/json' };

  describe('POST', () => {
    it('should correctly signUp user', async () => {
      const response = await unauthorizedRequest
        .post(authRoutes.signUp)
        .set(commonHeaders)
        .send(createUserDto);

      const { id } = response.body;
      expect(response.status).toBe(StatusCodes.CREATED);

      expect(validate(id)).toBe(true);
      expect(response.body).not.toHaveProperty('password');

      const cleanupResponse = await unauthorizedRequest
        .delete(usersRoutes.delete(id))
        .set(commonHeaders);
      expect(cleanupResponse.statusCode).toBe(StatusCodes.NO_CONTENT);
    });

    it('should signUp user, then signIn and get JWT tokens', async () => {
      const signUpResponse = await unauthorizedRequest
        .post(authRoutes.signUp)
        .set(commonHeaders)
        .send(createUserDto);

      const { id } = signUpResponse.body;
      expect(signUpResponse.status).toBe(StatusCodes.CREATED);

      const { email, password } = createUserDto;

      const signInResponse = await unauthorizedRequest
        .post(authRoutes.signIn)
        .set(commonHeaders)
        .send({ email, password });

      const { accessToken, refreshToken } = signInResponse.body;

      expect(typeof accessToken).toBe('string');
      expect(typeof refreshToken).toBe('string');

      const cleanupResponse = await unauthorizedRequest
        .delete(usersRoutes.delete(id))
        .set(commonHeaders);
      expect(cleanupResponse.statusCode).toBe(StatusCodes.NO_CONTENT);
    });

    it('should answer forbidden if user does not exist', async () => {
      const signInResponse = await unauthorizedRequest
        .post(authRoutes.signIn)
        .set(commonHeaders)
        .send({ email: 'email@email.com', password: 'qwerty' });

      expect(signInResponse.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    });

    it('should get refresh token properly', async () => {
      const createUserResponse = await unauthorizedRequest
        .post(authRoutes.signUp)
        .set(commonHeaders)
        .send(createUserDto);

      const { id } = createUserResponse.body;

      const { email, password } = createUserDto;

      const signInResponse = await unauthorizedRequest
        .post(authRoutes.signIn)
        .set(commonHeaders)
        .send({ email, password });

      const { refreshToken: fRefreshToken } = signInResponse.body;

      const refreshResponse = await unauthorizedRequest
        .post(authRoutes.refresh)
        .set(commonHeaders)
        .send({ refreshToken: fRefreshToken });

      expect(typeof refreshResponse.body.accessToken).toBe('string');
      expect(typeof refreshResponse.body.refreshToken).toBe('string');

      const cleanupResponse = await unauthorizedRequest
        .delete(usersRoutes.delete(id))
        .set(commonHeaders);
      expect(cleanupResponse.statusCode).toBe(StatusCodes.NO_CONTENT);
    });
  });
});

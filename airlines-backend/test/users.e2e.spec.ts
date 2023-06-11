import { validate } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { request } from './lib';
import { usersRoutes } from './endpoints';

const createUserDto = {
  email: 'Test@test.com',
  password: 'test-password',
  firstName: 'John',
  lastName: 'Dou',
  dateOfBirth: new Date().toISOString(),
  gender: 'male',
  countryCode: '19',
  phoneNumber: 1234567891,
  citizenship: 'USA',
};

// Probability of collisions for UUID is almost zero
const randomUUID = '0a35dd62-e09f-444b-a628-f4e7c6954f57';

describe('Users (e2e)', () => {
  const unauthorizedRequest = request;
  const commonHeaders = { Accept: 'application/json' };

  describe('GET', () => {
    it('should correctly get all users', async () => {
      const response = await unauthorizedRequest
        .get(usersRoutes.getAll)
        .set(commonHeaders);
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toBeInstanceOf(Array);
    });

    it('should correctly get user by id', async () => {
      const creationResponse = await unauthorizedRequest
        .post(usersRoutes.create)
        .set(commonHeaders)
        .send(createUserDto);

      const { id } = creationResponse.body;

      expect(creationResponse.statusCode).toBe(StatusCodes.CREATED);

      const searchResponse = await unauthorizedRequest
        .get(usersRoutes.getById(id))
        .set(commonHeaders);

      expect(searchResponse.statusCode).toBe(StatusCodes.OK);
      expect(searchResponse.body).toBeInstanceOf(Object);

      const cleanupResponse = await unauthorizedRequest
        .delete(usersRoutes.delete(id))
        .set(commonHeaders);

      expect(cleanupResponse.statusCode).toBe(StatusCodes.NO_CONTENT);
    });

    it('should respond with BAD_REQUEST status code in case of invalid id', async () => {
      const response = await unauthorizedRequest
        .get(usersRoutes.getById('some-invalid-id'))
        .set(commonHeaders);

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it("should respond with NOT_FOUND status code in case if user doesn't exist", async () => {
      const response = await unauthorizedRequest
        .get(usersRoutes.getById(randomUUID))
        .set(commonHeaders);

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('POST', () => {
    it('should correctly create user', async () => {
      const response = await unauthorizedRequest
        .post(usersRoutes.create)
        .set(commonHeaders)
        .send(createUserDto);

      const {
        id,
        email,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        countryCode,
        phoneNumber,
        citizenship,
      } = response.body;

      expect(response.status).toBe(StatusCodes.CREATED);

      expect(email).toBe(createUserDto.email);
      expect(response.body).not.toHaveProperty('password');

      expect(validate(id)).toBe(true);

      expect(firstName).toBe(createUserDto.firstName);
      expect(lastName).toBe(createUserDto.lastName);
      expect(dateOfBirth).toBe(createUserDto.dateOfBirth);
      expect(gender).toBe(createUserDto.gender);
      expect(countryCode).toBe(createUserDto.countryCode);
      expect(phoneNumber).toBe(createUserDto.phoneNumber);
      expect(citizenship).toBe(createUserDto.citizenship);

      const cleanupResponse = await unauthorizedRequest
        .delete(usersRoutes.delete(id))
        .set(commonHeaders);

      expect(cleanupResponse.statusCode).toBe(StatusCodes.NO_CONTENT);
    });

    it('should correctly create user', async () => {
      const test = Object.assign({}, createUserDto);
      test.gender = 'female';

      const response = await unauthorizedRequest
        .post(usersRoutes.create)
        .set(commonHeaders)
        .send(test);

      const { gender, id } = response.body;
      expect(response.status).toBe(StatusCodes.CREATED);

      expect(gender).toBe(test.gender);

      const cleanupResponse = await unauthorizedRequest
        .delete(usersRoutes.delete(id))
        .set(commonHeaders);

      expect(cleanupResponse.statusCode).toBe(StatusCodes.NO_CONTENT);
    });

    it('should respond with BAD_REQUEST in case of invalid required data', async () => {
      const test1 = Object.assign({}, createUserDto);
      test1.firstName = '11';

      const test2 = Object.assign({}, createUserDto);
      test2.dateOfBirth = 'wrong value';

      const test3 = Object.assign({}, createUserDto);
      test3.gender = 'MaleMale';

      const test4 = Object.assign({}, createUserDto);
      test4.gender = 'Females';

      const responses = await Promise.all([
        unauthorizedRequest
          .post(usersRoutes.create)
          .set(commonHeaders)
          .send({}),

        unauthorizedRequest
          .post(usersRoutes.create)
          .set(commonHeaders)
          .send(test1),
        unauthorizedRequest
          .post(usersRoutes.create)
          .set(commonHeaders)
          .send(test2),
        unauthorizedRequest
          .post(usersRoutes.create)
          .set(commonHeaders)
          .send(test3),
        unauthorizedRequest
          .post(usersRoutes.create)
          .set(commonHeaders)
          .send(test4),
      ]);
      expect(
        responses.every(
          ({ statusCode }) => statusCode === StatusCodes.BAD_REQUEST,
        ),
      ).toBe(true);
    });
  });

  describe('DELETE', () => {
    it('should correctly delete user', async () => {
      const response = await unauthorizedRequest
        .post(usersRoutes.create)
        .set(commonHeaders)
        .send(createUserDto);

      const { id } = response.body;
      expect(response.status).toBe(StatusCodes.CREATED);

      const cleanupResponse = await unauthorizedRequest
        .delete(usersRoutes.delete(id))
        .set(commonHeaders);

      expect(cleanupResponse.statusCode).toBe(StatusCodes.NO_CONTENT);

      const searchResponse = await unauthorizedRequest
        .get(usersRoutes.getById(id))
        .set(commonHeaders);

      expect(searchResponse.statusCode).toBe(StatusCodes.NOT_FOUND);
    });

    it('should respond with BAD_REQUEST status code in case of invalid id', async () => {
      const response = await unauthorizedRequest
        .delete(usersRoutes.delete('some-invalid-id'))
        .set(commonHeaders);

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it("should respond with NOT_FOUND status code in case if user doesn't exist", async () => {
      const response = await unauthorizedRequest
        .delete(usersRoutes.delete(randomUUID))
        .set(commonHeaders);

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });
});

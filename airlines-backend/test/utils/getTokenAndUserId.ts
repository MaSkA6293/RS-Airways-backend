import { authRoutes } from '../endpoints';

const createUserDto = {
  email: 'Test@test222.com',
  password: 'test-password',
  firstName: 'John',
  lastName: 'Dou',
  dateOfBirth: new Date().toISOString(),
  gender: 'male',
  countryCode: '19',
  phoneNumber: 1234567891,
  citizenship: 'USA',
};

const getTokenAndUserId = async (request) => {
  // create user
  const {
    body: { id: userId },
  } = await request
    .post(authRoutes.signUp)
    .set('Accept', 'application/json')
    .send(createUserDto);

  // get token
  const {
    body: { accessToken },
  } = await request
    .post(authRoutes.signIn)
    .set('Accept', 'application/json')
    .send(createUserDto);

  if (userId === undefined || accessToken === undefined) {
    throw new Error('Authorization is not implemented');
  }

  const token = `Bearer ${accessToken}`;

  return { token, userId };
};

export default getTokenAndUserId;

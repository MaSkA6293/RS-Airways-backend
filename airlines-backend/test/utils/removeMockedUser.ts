import { usersRoutes } from '../endpoints';

const removeMockedUser = async (request, userId, commonHeaders) => {
  // delete user
  await request.delete(usersRoutes.delete(userId)).set(commonHeaders);
};

export default removeMockedUser;

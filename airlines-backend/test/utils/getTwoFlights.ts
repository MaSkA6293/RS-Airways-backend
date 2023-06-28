import { getRandomIntInclusive } from '../../src/utils';
import { flightsRoutes } from '../../test/endpoints';

export const getTwoFlights = async (request) => {
  const params = {
    perPage: 50,
    page: 1,
  };
  const {
    body: { data: flights },
  } = await request
    .post(flightsRoutes.getAll)
    .set('Accept', 'application/json')
    .send(params);

  const { id: first } = flights[getRandomIntInclusive(0, flights.length - 1)];
  const { id: second } = flights[getRandomIntInclusive(0, flights.length - 1)];

  return [first, second];
};

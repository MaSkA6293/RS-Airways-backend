import { getRandomIntInclusive } from '../../src/utils';
import { flightsRoutes } from '../../test/endpoints';

export const getTwoFlights = async (request) => {
  const { body: flights } = await request
    .get(flightsRoutes.getAll)
    .set('Accept', 'application/json')
    .send();

  const { id: first } = flights[getRandomIntInclusive(0, flights.length - 1)];
  const { id: second } = flights[getRandomIntInclusive(0, flights.length - 1)];

  return [first, second];
};

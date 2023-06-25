import { request } from '../lib';
import { airportsRoutes } from '../endpoints';
import { AirportEntity } from 'src/airport/entities/airport.entity';

const createAirportDtoFirst = {
  country: 'TEST_COUNTRY',
  city: 'TEST_CITY',
  name: 'TEST_NAME',
  gps: '59.648979,17.92934',
  gmt: '+1.0',
  key: 'TEST',
};

const createAirportDtoSecond = {
  country: 'TEST_COUNTRY',
  city: 'TEST_CITY',
  name: 'TEST_NAME',
  gps: '52.364044189453125,13.50841999053955',
  gmt: '+1.0',
  key: 'TEST',
};

export const createMockAirports = async () => {
  const unauthorizedRequest = request;
  const commonHeaders = { Accept: 'application/json' };

  const { body: first } = await unauthorizedRequest
    .post(airportsRoutes.create)
    .set(commonHeaders)
    .send(createAirportDtoFirst);

  const { body: second } = await unauthorizedRequest
    .post(airportsRoutes.create)
    .set(commonHeaders)
    .send(createAirportDtoSecond);

  return [first, second];
};

export const removeMockAirports = async (airports: AirportEntity[]) => {
  const unauthorizedRequest = request;
  const commonHeaders = { Accept: 'application/json' };

  const promises = airports.map(({ id }) => {
    return unauthorizedRequest
      .delete(airportsRoutes.delete(id))
      .set(commonHeaders)
      .send(id);
  });

  await Promise.all(promises);
};

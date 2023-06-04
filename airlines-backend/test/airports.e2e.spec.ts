import { request } from './lib';
import { StatusCodes } from 'http-status-codes';
import { airportsRoutes, flightsRoutes } from './endpoints';
import { validate } from 'uuid';

const createAirportDto = {
  country: 'TEST_COUNTRY',
  city: 'TEST_CITY',
  name: 'TEST_NAME',
  gps: '1.2,2.1',
  gmt: '+1.0',
  key: 'TEST',
};

// Probability of collisions for UUID is almost zero
const randomUUID = '0a35dd62-e09f-444b-a628-f4e7c6954f57';

describe('Airport (e2e)', () => {
  const unauthorizedRequest = request;
  const commonHeaders = { Accept: 'application/json' };

  describe('GET', () => {
    it('should correctly get all airports', async () => {
      const response = await unauthorizedRequest
        .get(airportsRoutes.getAll)
        .set(commonHeaders);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('POST', () => {
    it('should correctly create airport', async () => {
      const response = await unauthorizedRequest
        .post(airportsRoutes.create)
        .set(commonHeaders)
        .send(createAirportDto);

      const { country, city, name, gps, gmt, key, id } = response.body;
      expect(response.status).toBe(StatusCodes.CREATED);
      expect(country).toBe(createAirportDto.country);
      expect(city).toBe(createAirportDto.city);
      expect(name).toBe(createAirportDto.name);
      expect(gps).toBe(createAirportDto.gps);
      expect(gmt).toBe(createAirportDto.gmt);
      expect(key).toBe(createAirportDto.key);
      expect(validate(id)).toBe(true);
      const cleanupResponse = await unauthorizedRequest
        .delete(airportsRoutes.delete(id))
        .set(commonHeaders);
      expect(cleanupResponse.statusCode).toBe(StatusCodes.NO_CONTENT);
    });
    it('should respond with BAD_REQUEST in case of invalid required data', async () => {
      const responses = await Promise.all([
        unauthorizedRequest
          .post(airportsRoutes.create)
          .set(commonHeaders)
          .send({}),
        unauthorizedRequest
          .post(airportsRoutes.create)
          .set(commonHeaders)
          .send({ city: 12, name: 'T', gps: 12, gmt: 12, key: 12 }),
        unauthorizedRequest
          .post(airportsRoutes.create)
          .set(commonHeaders)
          .send({
            city: 12,
          }),
        unauthorizedRequest
          .post(airportsRoutes.create)
          .set(commonHeaders)
          .send({
            gps: '12',
            gmt: '12',
          }),
        unauthorizedRequest
          .post(airportsRoutes.create)
          .set(commonHeaders)
          .send({
            name: null,
            city: 'New York',
          }),
      ]);
      expect(
        responses.every(
          ({ statusCode }) => statusCode === StatusCodes.BAD_REQUEST,
        ),
      ).toBe(true);
    });
  });

  describe('DELETE', () => {
    it('should correctly delete airport', async () => {
      const response = await unauthorizedRequest
        .post(airportsRoutes.create)
        .set(commonHeaders)
        .send(createAirportDto);
      const { id } = response.body;
      expect(response.status).toBe(StatusCodes.CREATED);
      const cleanupResponse = await unauthorizedRequest
        .delete(airportsRoutes.delete(id))
        .set(commonHeaders);
      expect(cleanupResponse.statusCode).toBe(StatusCodes.NO_CONTENT);
      const searchResponse = await unauthorizedRequest
        .get(airportsRoutes.getById(id))
        .set(commonHeaders);
      expect(searchResponse.statusCode).toBe(StatusCodes.NOT_FOUND);
    });
    it('should respond with BAD_REQUEST status code in case of invalid id', async () => {
      const response = await unauthorizedRequest
        .delete(airportsRoutes.delete('some-invalid-id'))
        .set(commonHeaders);
      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });
    it("should respond with NOT_FOUND status code in case if airport doesn't exist", async () => {
      const response = await unauthorizedRequest
        .delete(airportsRoutes.delete(randomUUID))
        .set(commonHeaders);
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
    it('should set remove flight after airport was deleted', async () => {
      const airportFirst = await unauthorizedRequest
        .post(airportsRoutes.create)
        .set(commonHeaders)
        .send(createAirportDto);

      const airportSecond = await unauthorizedRequest
        .post(airportsRoutes.create)
        .set(commonHeaders)
        .send(createAirportDto);

      const { id: idFirst } = airportFirst.body;
      const { id: idSecond } = airportSecond.body;

      expect(airportFirst.status).toBe(StatusCodes.CREATED);
      expect(airportSecond.status).toBe(StatusCodes.CREATED);

      const createFlightDto = {
        fromId: idFirst,
        toId: idSecond,
        takeOffDate: new Date(),
        seatsAvailable: 100,
        seatsTotal: 200,
      };

      const creationFlightResponse = await unauthorizedRequest
        .post(flightsRoutes.create)
        .set(commonHeaders)
        .send(createFlightDto);

      const { id: flightId } = creationFlightResponse.body;

      expect(creationFlightResponse.statusCode).toBe(StatusCodes.CREATED);

      const deleteResponse = await unauthorizedRequest
        .delete(airportsRoutes.delete(idFirst))
        .set(commonHeaders);

      expect(deleteResponse.statusCode).toBe(StatusCodes.NO_CONTENT);

      const searchFlightResponse = await unauthorizedRequest
        .get(flightsRoutes.getById(flightId))
        .set(commonHeaders);

      expect(searchFlightResponse.statusCode).toBe(StatusCodes.NOT_FOUND);
    });
  });
});

import { request } from './lib';
import { StatusCodes } from 'http-status-codes';
import { airportsRoutes, flightsRoutes } from './endpoints';
import { validate } from 'uuid';

const createFlightDto = {
  fromId: '0a35dd62-e09f-444b-a628-f4e7c6954f58',
  toId: '0a35dd62-e09f-444b-a628-f4e7c6954f59',
  takeOffDate: new Date(),
  seatsAvailable: 100,
  seatsTotal: 400,
};

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

describe('Flight (e2e)', () => {
  const unauthorizedRequest = request;
  const commonHeaders = { Accept: 'application/json' };

  describe('GET', () => {
    it('should correctly get all flights', async () => {
      const response = await unauthorizedRequest
        .get(flightsRoutes.getAll)
        .set(commonHeaders);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toBeInstanceOf(Array);
    });

    it('should correctly get flight by id', async () => {
      const airportOne = await unauthorizedRequest
        .post(airportsRoutes.create)
        .set(commonHeaders)
        .send(createAirportDto);

      const airportTwo = await unauthorizedRequest
        .post(airportsRoutes.create)
        .set(commonHeaders)
        .send(createAirportDto);

      expect(airportOne.status).toBe(StatusCodes.CREATED);
      expect(airportTwo.status).toBe(StatusCodes.CREATED);

      const flight = Object.assign(createFlightDto);
      flight.fromId = airportOne.body.id;
      flight.toId = airportTwo.body.id;

      const creationResponse = await unauthorizedRequest
        .post(flightsRoutes.create)
        .set(commonHeaders)
        .send(flight);

      const { id } = creationResponse.body;

      expect(creationResponse.statusCode).toBe(StatusCodes.CREATED);

      const searchResponse = await unauthorizedRequest
        .get(flightsRoutes.getById(id))
        .set(commonHeaders);

      expect(searchResponse.statusCode).toBe(StatusCodes.OK);
      expect(searchResponse.body).toBeInstanceOf(Object);

      const cleanupResponse = await unauthorizedRequest
        .delete(flightsRoutes.delete(id))
        .set(commonHeaders);

      expect(cleanupResponse.statusCode).toBe(StatusCodes.NO_CONTENT);
    });
  });

  describe('POST', () => {
    it('should correctly create flight', async () => {
      const airportOne = await unauthorizedRequest
        .post(airportsRoutes.create)
        .set(commonHeaders)
        .send(createAirportDto);

      const airportTwo = await unauthorizedRequest
        .post(airportsRoutes.create)
        .set(commonHeaders)
        .send(createAirportDto);

      expect(airportOne.status).toBe(StatusCodes.CREATED);
      expect(airportTwo.status).toBe(StatusCodes.CREATED);

      const flight = Object.assign(createFlightDto);
      flight.fromId = airportOne.body.id;
      flight.toId = airportTwo.body.id;

      const creationResponse = await unauthorizedRequest
        .post(flightsRoutes.create)
        .set(commonHeaders)
        .send(flight);

      expect(creationResponse.statusCode).toBe(StatusCodes.CREATED);

      const { from, to, takeOffDate, seatsAvailable, seatsTotal, id } =
        creationResponse.body;
      expect(creationResponse.status).toBe(StatusCodes.CREATED);

      expect(takeOffDate).toBe(flight.takeOffDate.toISOString());
      expect(seatsAvailable).toBe(flight.seatsAvailable);
      expect(seatsTotal).toBe(flight.seatsTotal);
      expect(from.id).toBe(airportOne.body.id);
      expect(to.id).toBe(airportTwo.body.id);
      expect(validate(id)).toBe(true);

      const cleanupResponseAirportOne = await unauthorizedRequest
        .delete(airportsRoutes.delete(airportOne.body.id))
        .set(commonHeaders);
      expect(cleanupResponseAirportOne.statusCode).toBe(StatusCodes.NO_CONTENT);

      const cleanupResponse = await unauthorizedRequest
        .delete(flightsRoutes.delete(id))
        .set(commonHeaders);

      expect(cleanupResponse.statusCode).toBe(StatusCodes.NOT_FOUND);

      const cleanupResponseAirportTwo = await unauthorizedRequest
        .delete(airportsRoutes.delete(airportTwo.body.id))
        .set(commonHeaders);
      expect(cleanupResponseAirportTwo.statusCode).toBe(StatusCodes.NO_CONTENT);
    });

    it('should respond with BAD_REQUEST in case of invalid required data', async () => {
      const airportOne = await unauthorizedRequest
        .post(airportsRoutes.create)
        .set(commonHeaders)
        .send(createAirportDto);

      const airportTwo = await unauthorizedRequest
        .post(airportsRoutes.create)
        .set(commonHeaders)
        .send(createAirportDto);

      expect(airportOne.status).toBe(StatusCodes.CREATED);
      expect(airportTwo.status).toBe(StatusCodes.CREATED);

      // fromId: '0a35dd62-e09f-444b-a628-f4e7c6954f58',
      // toId: '0a35dd62-e09f-444b-a628-f4e7c6954f59',
      // takeOffDate: new Date(),
      // seatsAvailable: 100,
      // seatsTotal: 400,

      const responses = await Promise.all([
        unauthorizedRequest
          .post(flightsRoutes.create)
          .set(commonHeaders)
          .send({}),
        unauthorizedRequest.post(flightsRoutes.create).set(commonHeaders).send({
          fromId: airportOne.body.id,
          to: airportTwo.body.id,
          seatsAvailable: '100',
          seatsTotal: 400,
        }),
        unauthorizedRequest.post(flightsRoutes.create).set(commonHeaders).send({
          fromId: airportOne.body.id,
          to: airportTwo.body.id,
          seatsAvailable: 100,
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
    it('should correctly delete flight', async () => {
      const airportFirst = await unauthorizedRequest
        .post(airportsRoutes.create)
        .set(commonHeaders)
        .send(createAirportDto);

      const airportSecond = await unauthorizedRequest
        .post(airportsRoutes.create)
        .set(commonHeaders)
        .send(createAirportDto);

      expect(airportFirst.status).toBe(StatusCodes.CREATED);
      expect(airportSecond.status).toBe(StatusCodes.CREATED);

      const flight = Object.assign(createFlightDto);
      flight.fromId = airportFirst.body.id;
      flight.toId = airportSecond.body.id;

      const creationResponse = await unauthorizedRequest
        .post(flightsRoutes.create)
        .set(commonHeaders)
        .send(flight);

      const { id } = creationResponse.body;

      expect(creationResponse.statusCode).toBe(StatusCodes.CREATED);

      const cleanupResponse = await unauthorizedRequest
        .delete(flightsRoutes.delete(id))
        .set(commonHeaders);
      expect(cleanupResponse.statusCode).toBe(StatusCodes.NO_CONTENT);

      const searchResponse = await unauthorizedRequest
        .get(flightsRoutes.getById(id))
        .set(commonHeaders);
      expect(searchResponse.statusCode).toBe(StatusCodes.NOT_FOUND);

      const checkFirstAirport = await unauthorizedRequest
        .get(airportsRoutes.getById(airportFirst.body.id))
        .set(commonHeaders);

      const checkSecondAirport = await unauthorizedRequest
        .get(airportsRoutes.getById(airportSecond.body.id))
        .set(commonHeaders);

      expect(checkFirstAirport.statusCode).toBe(StatusCodes.OK);
      expect(checkSecondAirport.statusCode).toBe(StatusCodes.OK);
    });

    it('should respond with BAD_REQUEST status code in case of invalid id', async () => {
      const response = await unauthorizedRequest
        .delete(flightsRoutes.delete('some-invalid-id'))
        .set(commonHeaders);
      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it("should respond with NOT_FOUND status code in case if flight doesn't exist", async () => {
      const response = await unauthorizedRequest
        .delete(flightsRoutes.delete(randomUUID))
        .set(commonHeaders);
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });
});

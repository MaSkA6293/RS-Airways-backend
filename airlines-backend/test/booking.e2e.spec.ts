import { StatusCodes } from 'http-status-codes';
import { bookingRoutes } from './endpoints';
import { request } from './lib';
import getTokenAndUserId from './utils/getTokenAndUserId';
import removeMockedUser from './utils/removeMockedUser';
import { createMockAirports, removeMockAirports } from './utils/mockAirports';
import { createMockFlights } from './utils/createMockFlights';
import { AirportEntity } from 'src/airport/entities/airport.entity';
import { getMockOrder } from './utils/getMockOrder';
import { validate } from 'uuid';
import { Trip } from 'src/booking/models/trip.model';

describe('Booking (e2e)', () => {
  const unauthorizedRequest = request;
  const commonHeaders = { Accept: 'application/json' };

  let mockUserId: string | undefined;
  let mockAirports: undefined | AirportEntity[];

  beforeAll(async () => {
    const { token, userId } = await getTokenAndUserId(unauthorizedRequest);
    commonHeaders['Authorization'] = token;
    mockUserId = userId;

    mockAirports = await createMockAirports();

    await createMockFlights(mockAirports, unauthorizedRequest);
  });

  afterAll(async () => {
    // delete mock user
    if (mockUserId) {
      await removeMockedUser(unauthorizedRequest, mockUserId, commonHeaders);
    }
    //  delete mock airports
    if (mockAirports) {
      await removeMockAirports(mockAirports);
    }

    if (commonHeaders['Authorization']) {
      delete commonHeaders['Authorization'];
    }
  });

  describe('GET', () => {
    it("should correctly get user's orders", async () => {
      const response = await unauthorizedRequest
        .get(bookingRoutes.get)
        .set(commonHeaders)
        .send();

      const { body: orders } = response;
      expect(response.status).toBe(StatusCodes.OK);
      expect(Array.isArray(orders)).toBe(true);
      expect(orders.length).toBe(0);
    });
  });

  it('should correctly create an order', async () => {
    const mockOrder = await getMockOrder(unauthorizedRequest);

    const response = await unauthorizedRequest
      .post(bookingRoutes.create)
      .set(commonHeaders)
      .send(mockOrder);

    expect(response.status).toBe(StatusCodes.CREATED);

    const { id, order, user } = response.body;

    expect(validate(id)).toBe(true);
    expect(typeof order).toBe('string');
    expect(user.id).toBe(mockUserId);

    const trips = (await JSON.parse(order)) as Trip[];

    const { passengers } = trips[0];

    expect(passengers).toHaveProperty('adult');
    expect(passengers['adult'].length).toBe(2);
    const firstAdultPassenger = passengers['adult'][0];

    expect(firstAdultPassenger).toHaveProperty('id');
    expect(firstAdultPassenger).toHaveProperty('firstName');
    expect(firstAdultPassenger).toHaveProperty('lastName');
    expect(firstAdultPassenger).toHaveProperty('gender');
    expect(firstAdultPassenger).toHaveProperty('dateOfBirth');
    expect(firstAdultPassenger).toHaveProperty('specialAssistance');
    expect(firstAdultPassenger).toHaveProperty('baggage');

    const secondAdultPassenger = passengers['adult'][1];

    expect(secondAdultPassenger).toHaveProperty('id');
    expect(secondAdultPassenger).toHaveProperty('firstName');
    expect(secondAdultPassenger).toHaveProperty('lastName');
    expect(secondAdultPassenger).toHaveProperty('gender');
    expect(secondAdultPassenger).toHaveProperty('dateOfBirth');
    expect(secondAdultPassenger).toHaveProperty('specialAssistance');
    expect(secondAdultPassenger).toHaveProperty('baggage');
  });

  it('should check total price', async () => {
    const mockOrder = await getMockOrder(unauthorizedRequest);

    const response = await unauthorizedRequest
      .post(bookingRoutes.create)
      .set(commonHeaders)
      .send(mockOrder);

    expect(response.status).toBe(StatusCodes.CREATED);

    const { id, order, user } = response.body;

    expect(validate(id)).toBe(true);
    expect(typeof order).toBe('string');
    expect(user.id).toBe(mockUserId);

    const trips = (await JSON.parse(order)) as Trip[];

    const { flights, price } = trips[0];

    expect(price).toHaveProperty('adult');

    const [firstAdultFare, secondAdultFare] = price['adult'];

    expect(firstAdultFare).toHaveProperty('fare');
    expect(firstAdultFare).not.toHaveProperty('taxServicesCharge');
    expect(secondAdultFare).toHaveProperty('fare');
    expect(secondAdultFare).toHaveProperty('taxServicesCharge');

    const [firstFlight, secondFlight] = flights;
    const { price: firstFlightPrice } = firstFlight;
    const { price: secondFlightPrice } = secondFlight;

    const firstAdultTicketPriceTo = firstFlightPrice['flight']['adult']['eur'];
    const firstAdultTicketPriceFrom =
      secondFlightPrice['flight']['adult']['eur'];
    const firstAdultBaggagePriceTo1 =
      firstFlightPrice['baggage']['light']['eur'];
    const firstAdultBaggagePriceTo2 =
      firstFlightPrice['baggage']['medium']['eur'];

    const firstAdultBaggagePriceFrom1 =
      secondFlightPrice['baggage']['light']['eur'];
    const firstAdultBaggagePriceFrom2 =
      secondFlightPrice['baggage']['medium']['eur'];

    const firstPassengerFare =
      firstAdultTicketPriceTo +
      firstAdultBaggagePriceTo1 +
      firstAdultBaggagePriceTo2 +
      firstAdultTicketPriceFrom +
      firstAdultBaggagePriceFrom1 +
      firstAdultBaggagePriceFrom2;

    expect(firstAdultFare['fare']['eur']).toBe(firstPassengerFare);
  });
});
